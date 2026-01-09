import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { ArrowLeft, Download, Trash2, Save } from 'lucide-react';
import { mockDocuments, mockCorrespondents, mockDocumentTypes, mockTags } from '../../lib/mockData';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Badge } from '../ui/badge';
import { format } from 'date-fns';
import { toast } from 'sonner';

export function DocumentDetailView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const document = mockDocuments.find((doc) => doc.id === Number(id));

  const [title, setTitle] = useState(document?.title || '');
  const [correspondent, setCorrespondent] = useState(document?.correspondent || '');
  const [documentType, setDocumentType] = useState(document?.documentType || '');
  const [selectedTags, setSelectedTags] = useState(document?.tags || []);
  const [isDirty, setIsDirty] = useState(false);

  if (!document) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Document not found</h2>
          <Button onClick={() => navigate('/documents')}>Back to Documents</Button>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    toast.success('Document updated successfully!');
    setIsDirty(false);
  };

  const handleDelete = () => {
    toast.success('Document deleted successfully!');
    navigate('/documents');
  };

  const handleChange = () => {
    if (!isDirty) setIsDirty(true);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Breadcrumb Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <Button
          variant="ghost"
          onClick={() => navigate('/documents')}
          className="text-blue-600 hover:text-blue-700"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Documents
        </Button>
      </div>

      {/* Split Container */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-5 overflow-hidden">
        {/* PDF Viewer Panel (60% on large screens) */}
        <div className="lg:col-span-3 bg-gray-900 flex items-center justify-center overflow-hidden">
          <div className="text-center text-white p-8">
            <div className="mb-4">
              <img
                src={document.thumbnailUrl}
                alt={document.title}
                className="max-w-full max-h-[600px] mx-auto rounded-lg shadow-2xl"
              />
            </div>
            <p className="text-sm text-gray-400">PDF Preview</p>
            <p className="text-xs text-gray-500 mt-2">
              In a real implementation, this would display the PDF using a viewer
            </p>
          </div>
        </div>

        {/* Metadata Panel (40% on large screens) */}
        <div className="lg:col-span-2 bg-white border-l border-gray-200 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Header */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Document Details</h2>
              {isDirty && (
                <p className="text-sm text-orange-600 flex items-center gap-1">
                  <span className="inline-block w-2 h-2 rounded-full bg-orange-600"></span>
                  Unsaved changes
                </p>
              )}
            </div>

            <div className="border-t border-gray-200 pt-6 space-y-4">
              {/* Title Field */}
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium">
                  Title <span className="text-red-600">*</span>
                </Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    handleChange();
                  }}
                  className={!title ? 'border-red-500' : ''}
                />
                {!title && (
                  <p className="text-xs text-red-600">Title is required</p>
                )}
              </div>

              {/* Correspondent Field */}
              <div className="space-y-2">
                <Label htmlFor="correspondent" className="text-sm font-medium">
                  Correspondent
                </Label>
                <Select
                  value={correspondent || 'none'}
                  onValueChange={(value) => {
                    setCorrespondent(value === 'none' ? '' : value);
                    handleChange();
                  }}
                >
                  <SelectTrigger id="correspondent">
                    <SelectValue placeholder="None selected" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    {mockCorrespondents.map((c) => (
                      <SelectItem key={c.id} value={c.name}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Document Type Field */}
              <div className="space-y-2">
                <Label htmlFor="documentType" className="text-sm font-medium">
                  Document Type
                </Label>
                <Select
                  value={documentType || 'none'}
                  onValueChange={(value) => {
                    setDocumentType(value === 'none' ? '' : value);
                    handleChange();
                  }}
                >
                  <SelectTrigger id="documentType">
                    <SelectValue placeholder="None selected" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    {mockDocumentTypes.map((t) => (
                      <SelectItem key={t.id} value={t.name}>
                        {t.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Tags Section */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Tags</Label>
                <div className="flex flex-wrap gap-2">
                  {selectedTags.map((tag) => (
                    <Badge
                      key={tag.id}
                      style={{ backgroundColor: tag.color }}
                      className="text-white"
                    >
                      {tag.name}
                      <button
                        className="ml-2 hover:bg-white/20 rounded-full p-0.5"
                        onClick={() => {
                          setSelectedTags(selectedTags.filter((t) => t.id !== tag.id));
                          handleChange();
                        }}
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      // In real app, would open tag selector
                      toast.info('Tag selector would open here');
                    }}
                  >
                    + Add Tag
                  </Button>
                </div>
              </div>

              {/* Metadata (Read-only) */}
              <div className="space-y-3 pt-4 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-900">Metadata</h3>
                <div className="text-sm text-gray-600 space-y-2">
                  <div>
                    <span className="font-medium">Created:</span>{' '}
                    {format(new Date(document.created), 'MMM dd, yyyy HH:mm')}
                  </div>
                  <div>
                    <span className="font-medium">Added:</span>{' '}
                    {format(new Date(document.added), 'MMM dd, yyyy HH:mm')}
                  </div>
                  <div>
                    <span className="font-medium">File Size:</span> {document.fileSize}
                  </div>
                  <div>
                    <span className="font-medium">Pages:</span> {document.pageCount} pages
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4">
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    onClick={handleSave}
                    disabled={!isDirty || !title}
                    className="w-full"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={handleDelete}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Document
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}