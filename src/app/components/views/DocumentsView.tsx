import { useState, useMemo, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search, X, LayoutGrid, List, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { mockDocuments, mockTags, mockCorrespondents, mockDocumentTypes } from '../../lib/mockData';
import { DocumentCard } from '../documents/DocumentCard';
import { DocumentTable } from '../documents/DocumentTable';
import { EmptyState } from '../shared/EmptyState';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';
import { Badge } from '../ui/badge';
import { FilterControl } from '../filters/FilterControl';
import { FileText } from 'lucide-react';

type ViewMode = 'card' | 'table';
type SortOrder = 'date-newest' | 'date-oldest' | 'title-asc' | 'title-desc';

export function DocumentsView() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<ViewMode>('card');
  const [sortOrder, setSortOrder] = useState<SortOrder>('date-newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [keywordSearch, setKeywordSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [selectedCorrespondents, setSelectedCorrespondents] = useState<number[]>([]);
  const [selectedDocumentTypes, setSelectedDocumentTypes] = useState<number[]>([]);


  // Calculate active filter count
  const activeFilterCount = selectedTags.length + selectedCorrespondents.length + selectedDocumentTypes.length + (keywordSearch ? 1 : 0);

  // Filter and sort documents
  const filteredDocuments = useMemo(() => {
    let docs = [...mockDocuments];

    // Quick search filter (searches everything)
    if (searchQuery) {
      docs = docs.filter(doc =>
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.correspondent?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.documentType?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.tags.some(tag => tag.name.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Keyword search (searches title and content)
    if (keywordSearch) {
      docs = docs.filter(doc =>
        doc.title.toLowerCase().includes(keywordSearch.toLowerCase()) ||
        doc.content?.toLowerCase().includes(keywordSearch.toLowerCase())
      );
    }

    // Tag filter
    if (selectedTags.length > 0) {
      docs = docs.filter(doc =>
        doc.tags.some(tag => selectedTags.includes(tag.id))
      );
    }

    // Correspondent filter
    if (selectedCorrespondents.length > 0) {
      docs = docs.filter(doc => {
        if (!doc.correspondent) return false;
        const corrObj = mockCorrespondents.find(c => c.name === doc.correspondent);
        return corrObj && selectedCorrespondents.includes(corrObj.id);
      });
    }

    // Document type filter
    if (selectedDocumentTypes.length > 0) {
      docs = docs.filter(doc => {
        if (!doc.documentType) return false;
        const typeObj = mockDocumentTypes.find(t => t.name === doc.documentType);
        return typeObj && selectedDocumentTypes.includes(typeObj.id);
      });
    }

    // Sort
    docs.sort((a, b) => {
      switch (sortOrder) {
        case 'date-newest':
          return new Date(b.created).getTime() - new Date(a.created).getTime();
        case 'date-oldest':
          return new Date(a.created).getTime() - new Date(b.created).getTime();
        case 'title-asc':
          return a.title.localeCompare(b.title);
        case 'title-desc':
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

    return docs;
  }, [searchQuery, keywordSearch, sortOrder, selectedTags, selectedCorrespondents, selectedDocumentTypes]);

  // Pagination
  const totalPages = Math.ceil(filteredDocuments.length / pageSize);
  const paginatedDocuments = filteredDocuments.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleClearAllFilters = () => {
    setSelectedTags([]);
    setSelectedCorrespondents([]);
    setSelectedDocumentTypes([]);
    setKeywordSearch('');
    setCurrentPage(1);
  };

  const handleDocumentClick = (id: number) => {
    navigate(`/documents/${id}`);
  };

  // Read URL params on mount to apply initial filters
  useEffect(() => {
    const tagParam = searchParams.get('tag');
    if (tagParam) {
      const tagId = parseInt(tagParam, 10);
      if (!isNaN(tagId) && !selectedTags.includes(tagId)) {
        setSelectedTags([tagId]);
        setShowFilters(true);
      }
    }
    
    const correspondentParam = searchParams.get('correspondent');
    if (correspondentParam) {
      const corrId = parseInt(correspondentParam, 10);
      if (!isNaN(corrId) && !selectedCorrespondents.includes(corrId)) {
        setSelectedCorrespondents([corrId]);
        setShowFilters(true);
      }
    }

    const typeParam = searchParams.get('type');
    if (typeParam) {
      const typeId = parseInt(typeParam, 10);
      if (!isNaN(typeId) && !selectedDocumentTypes.includes(typeId)) {
        setSelectedDocumentTypes([typeId]);
        setShowFilters(true);
      }
    }
  }, []); // Only run on mount

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6 flex-shrink-0">
        <h1 className="text-2xl font-semibold text-gray-900">Documents</h1>
        <p className="text-sm text-gray-600 mt-1">Browse, search, and manage your document archive</p>
      </div>

      {/* Quick Search Bar */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center gap-2">
          <Search className="h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Quick search across all fields..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Controls Bar with Filter Toggle */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Button
              variant={showFilters ? "default" : "outline"}
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="gap-2"
            >
              <Filter className="h-4 w-4" />
              Filters
              {activeFilterCount > 0 && (
                <Badge variant="secondary" className="ml-1 px-1.5 py-0 text-xs">
                  {activeFilterCount}
                </Badge>
              )}
            </Button>

            {activeFilterCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearAllFilters}
              >
                Clear all
              </Button>
            )}
          </div>

          <div className="flex items-center gap-4">
            <ToggleGroup
              type="single"
              value={viewMode}
              onValueChange={(value) => value && setViewMode(value as ViewMode)}
            >
              <ToggleGroupItem value="card" aria-label="Card view">
                <LayoutGrid className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="table" aria-label="Table view">
                <List className="h-4 w-4" />
              </ToggleGroupItem>
            </ToggleGroup>

            <Select value={sortOrder} onValueChange={(value) => setSortOrder(value as SortOrder)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date-newest">Date (Newest)</SelectItem>
                <SelectItem value="date-oldest">Date (Oldest)</SelectItem>
                <SelectItem value="title-asc">Title (A-Z)</SelectItem>
                <SelectItem value="title-desc">Title (Z-A)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Collapsible Filter Bar */}
      {showFilters && (
        <div className="bg-white border-b border-gray-200 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Keyword Search */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Contains Word</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search in content..."
                  value={keywordSearch}
                  onChange={(e) => {
                    setKeywordSearch(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="pl-9 h-10 bg-white border-gray-300 focus:border-blue-500"
                />
                {keywordSearch && (
                  <button
                    onClick={() => setKeywordSearch('')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 rounded"
                    aria-label="Clear keyword search"
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
              </div>
            </div>

            {/* Tags Filter */}
            <FilterControl
              label="Tags"
              placeholder="Select tags..."
              searchPlaceholder="Search tags..."
              items={mockTags.map(t => ({
                id: t.id,
                name: t.name,
                color: t.color,
                count: t.documentCount,
              }))}
              selectedIds={selectedTags}
              onSelectionChange={(ids) => {
                setSelectedTags(ids);
                setCurrentPage(1);
              }}
            />

            {/* Correspondents Filter */}
            <FilterControl
              label="Correspondents"
              placeholder="Select correspondents..."
              searchPlaceholder="Search correspondents..."
              items={mockCorrespondents.map(c => ({
                id: c.id,
                name: c.name,
                color: c.color,
                count: c.documentCount,
              }))}
              selectedIds={selectedCorrespondents}
              onSelectionChange={(ids) => {
                setSelectedCorrespondents(ids);
                setCurrentPage(1);
              }}
            />

            {/* Document Types Filter */}
            <FilterControl
              label="Document Types"
              placeholder="Select types..."
              searchPlaceholder="Search document types..."
              items={mockDocumentTypes.map(t => ({
                id: t.id,
                name: t.name,
                color: t.color,
                count: t.documentCount,
              }))}
              selectedIds={selectedDocumentTypes}
              onSelectionChange={(ids) => {
                setSelectedDocumentTypes(ids);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>
      )}

      {/* Stats Bar */}
      <div className="border-b border-gray-200 bg-gray-50 px-4 py-3">
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-gray-500" />
            <span className="text-gray-600">
              <span className="font-medium text-gray-900">{filteredDocuments.length}</span> documents
              {searchQuery || activeFilterCount > 0 ? ` (filtered from ${mockDocuments.length})` : ''}
            </span>
          </div>
          {(searchQuery || activeFilterCount > 0) && (
            <Badge variant="secondary" className="gap-1">
              {searchQuery && 'Quick search active'}
              {searchQuery && activeFilterCount > 0 && ' • '}
              {activeFilterCount > 0 && `${activeFilterCount} filter${activeFilterCount > 1 ? 's' : ''}`}
            </Badge>
          )}
        </div>
      </div>

      {/* Active Filter Chips */}
      {activeFilterCount > 0 && (
        <div className="bg-gray-50 border-b border-gray-200 p-3 flex items-center gap-2 flex-wrap">
          {keywordSearch && (
            <Badge variant="secondary" className="gap-1">
              Contains: "{keywordSearch}"
              <button
                onClick={() => setKeywordSearch('')}
                className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
                aria-label="Remove keyword filter"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {selectedTags.map((tagId) => {
            const tag = mockTags.find(t => t.id === tagId);
            return tag ? (
              <Badge key={`tag-${tagId}`} variant="secondary" className="gap-1">
                Tag: {tag.name}
                <button
                  onClick={() => setSelectedTags(selectedTags.filter(id => id !== tagId))}
                  className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
                  aria-label={`Remove ${tag.name} filter`}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ) : null;
          })}
          {selectedCorrespondents.map((corrId) => {
            const corr = mockCorrespondents.find(c => c.id === corrId);
            return corr ? (
              <Badge key={`corr-${corrId}`} variant="secondary" className="gap-1">
                Correspondent: {corr.name}
                <button
                  onClick={() => setSelectedCorrespondents(selectedCorrespondents.filter(id => id !== corrId))}
                  className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
                  aria-label={`Remove ${corr.name} filter`}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ) : null;
          })}
          {selectedDocumentTypes.map((typeId) => {
            const type = mockDocumentTypes.find(t => t.id === typeId);
            return type ? (
              <Badge key={`type-${typeId}`} variant="secondary" className="gap-1">
                Type: {type.name}
                <button
                  onClick={() => setSelectedDocumentTypes(selectedDocumentTypes.filter(id => id !== typeId))}
                  className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
                  aria-label={`Remove ${type.name} filter`}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ) : null;
          })}
        </div>
      )}

      {/* Content Area */}
      <div className="flex-1 overflow-auto bg-gray-50">
        {filteredDocuments.length === 0 ? (
          <EmptyState
            title="No documents found"
            description={
              searchQuery || activeFilterCount > 0
                ? "Try adjusting your search or filters"
                : "Upload your first document to get started"
            }
          />
        ) : viewMode === 'card' ? (
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {paginatedDocuments.map((doc) => (
              <DocumentCard
                key={doc.id}
                document={doc}
                onClick={() => handleDocumentClick(doc.id)}
              />
            ))}
          </div>
        ) : (
          <div className="p-6">
            <DocumentTable
              documents={paginatedDocuments}
              onDocumentClick={handleDocumentClick}
            />
          </div>
        )}
      </div>

      {/* Pagination Bar */}
      {filteredDocuments.length > 0 && (
        <div className="bg-white border-t border-gray-200 px-6 py-3 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Showing {(currentPage - 1) * pageSize + 1}-
            {Math.min(currentPage * pageSize, filteredDocuments.length)} of{' '}
            {filteredDocuments.length} documents
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Per page:</span>
            <Select
              value={String(pageSize)}
              onValueChange={(value) => {
                setPageSize(Number(value));
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
    </div>
  );
}
