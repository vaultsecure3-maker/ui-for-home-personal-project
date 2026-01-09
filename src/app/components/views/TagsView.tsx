import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Plus, Pencil, Trash2, FileText, Tags as TagsIcon, ChevronLeft, ChevronRight, AlertTriangle } from 'lucide-react';
import { mockTags, Tag } from '../../lib/mockData';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Label } from '../ui/label';
import { toast } from 'sonner';

type SortOrder = 'name-asc' | 'name-desc' | 'most-used' | 'least-used';

export function TagsView() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('name-asc');
  const [editingTag, setEditingTag] = useState<Tag | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [tagName, setTagName] = useState('');
  const [tagColor, setTagColor] = useState('#3b82f6');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  
  // Confirmation dialogs
  const [showUpdateConfirm, setShowUpdateConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [tagToDelete, setTagToDelete] = useState<Tag | null>(null);

  const presetColors = [
    '#3b82f6', '#10b981', '#f59e0b', '#ef4444',
    '#8b5cf6', '#06b6d4', '#ec4899', '#14b8a6',
  ];

  const sortedTags = [...mockTags]
    .filter((tag) =>
      tag.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortOrder) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'most-used':
          return b.documentCount - a.documentCount;
        case 'least-used':
          return a.documentCount - b.documentCount;
        default:
          return 0;
      }
    });

  const totalPages = Math.ceil(sortedTags.length / pageSize);
  const paginatedTags = sortedTags.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleCreateTag = () => {
    setEditingTag(null);
    setTagName('');
    setTagColor('#3b82f6');
    setIsDialogOpen(true);
  };

  const handleEditTag = (tag: Tag) => {
    setEditingTag(tag);
    setTagName(tag.name);
    setTagColor(tag.color);
    setIsDialogOpen(true);
  };

  const handleSaveTag = () => {
    if (editingTag) {
      // Show update confirmation
      setShowUpdateConfirm(true);
    } else {
      // Create without confirmation
      toast.success(`Tag "${tagName}" created`);
      setIsDialogOpen(false);
    }
  };

  const confirmUpdate = () => {
    toast.success(`Tag "${tagName}" updated`);
    setIsDialogOpen(false);
    setShowUpdateConfirm(false);
  };

  const handleDeleteTag = (tag: Tag) => {
    setTagToDelete(tag);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (tagToDelete) {
      toast.success(`Tag "${tagToDelete.name}" deleted`);
      setTagToDelete(null);
    }
    setShowDeleteConfirm(false);
  };

  const handleViewDocuments = (tag: Tag) => {
    navigate(`/documents?tag=${tag.id}`);
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6 flex-shrink-0">
        <h1 className="text-2xl font-semibold text-gray-900">Tags</h1>
        <p className="text-sm text-gray-600 mt-1">Organize your documents with custom tags</p>
      </div>

      {/* Search and Controls Bar */}
      <div className="border-b border-gray-200 p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 flex items-center gap-2 max-w-md">
            <Search className="h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-0 focus-visible:ring-0 shadow-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="p-1 hover:bg-gray-100 rounded"
                aria-label="Clear search"
              >
                <X className="h-4 w-4 text-gray-400" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Select value={sortOrder} onValueChange={(value) => setSortOrder(value as SortOrder)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                <SelectItem value="most-used">Most Used</SelectItem>
                <SelectItem value="least-used">Least Used</SelectItem>
              </SelectContent>
            </Select>

            <Button onClick={handleCreateTag} className="gap-2">
              <Plus className="h-4 w-4" />
              New Tag
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="border-b border-gray-200 bg-gray-50 px-4 py-3">
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <TagsIcon className="h-4 w-4 text-gray-500" />
            <span className="text-gray-600">
              <span className="font-medium text-gray-900">{sortedTags.length}</span> tags
            </span>
          </div>
          {searchQuery && (
            <Badge variant="secondary" className="gap-1">
              Filtered results
            </Badge>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto p-6">
        <div className="border rounded-lg overflow-hidden bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12"></TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="w-48">Documents</TableHead>
                <TableHead className="w-32 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedTags.map((tag) => (
                <TableRow
                  key={tag.id}
                  className="cursor-pointer hover:bg-gray-50 group"
                  onClick={() => handleViewDocuments(tag)}
                >
                  <TableCell>
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: tag.color }}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{tag.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FileText className="h-4 w-4 text-gray-400" />
                      <span>{tag.documentCount} documents</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div
                      className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditTag(tag)}
                        aria-label={`Edit ${tag.name}`}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleDeleteTag(tag)}
                        aria-label={`Delete ${tag.name}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {sortedTags.length === 0 && (
          <div className="text-center py-12">
            <TagsIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              No tags found
            </h3>
            <p className="text-gray-500 mb-4">
              {searchQuery
                ? 'Try adjusting your search query'
                : 'Get started by creating your first tag'}
            </p>
            {!searchQuery && (
              <Button onClick={handleCreateTag} className="gap-2">
                <Plus className="h-4 w-4" />
                Create Tag
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Pagination Bar */}
      {sortedTags.length > 0 && (
        <div className="bg-white border-t border-gray-200 px-6 py-3 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Showing {(currentPage - 1) * pageSize + 1}-
            {Math.min(currentPage * pageSize, sortedTags.length)} of{' '}
            {sortedTags.length} tags
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

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <TagsIcon className="h-5 w-5" />
              {editingTag ? 'Edit Tag' : 'New Tag'}
            </DialogTitle>
            <DialogDescription>
              {editingTag
                ? 'Update tag information'
                : 'Add a new tag to organize your documents'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="tag-name">Name *</Label>
              <Input
                id="tag-name"
                value={tagName}
                onChange={(e) => setTagName(e.target.value)}
                placeholder="e.g., Invoice"
              />
            </div>

            <div className="space-y-2">
              <Label>Color</Label>
              <div className="flex gap-2">
                {presetColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setTagColor(color)}
                    className={`w-8 h-8 rounded-full transition-transform ${
                      tagColor === color ? 'scale-110 ring-2 ring-offset-2 ring-gray-400' : ''
                    }`}
                    style={{ backgroundColor: color }}
                    aria-label={`Select color ${color}`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Label htmlFor="custom-color" className="text-sm">Custom:</Label>
                <input
                  id="custom-color"
                  type="color"
                  value={tagColor}
                  onChange={(e) => setTagColor(e.target.value)}
                  className="w-12 h-8 rounded cursor-pointer"
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSaveTag}
              disabled={!tagName.trim()}
            >
              {editingTag ? 'Update' : 'Create'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Update Confirmation Dialog */}
      <AlertDialog open={showUpdateConfirm} onOpenChange={setShowUpdateConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Update</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to update the tag "{tagName}"?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmUpdate}>Update</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the tag "{tagToDelete?.name}"?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}