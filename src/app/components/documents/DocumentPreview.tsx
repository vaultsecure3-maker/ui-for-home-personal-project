import { useState, useEffect } from 'react';
import { Eye, Loader2, X } from 'lucide-react';
import { Document } from '../../lib/mockData';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { cn } from '../ui/utils';
import * as HoverCard from '@radix-ui/react-hover-card';

interface DocumentPreviewProps {
  document: Document;
}

export function DocumentPreview({ document }: DocumentPreviewProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [documentLoaded, setDocumentLoaded] = useState(false);

  // Simulate document loading when preview opens
  useEffect(() => {
    if (isOpen && !documentLoaded) {
      setIsLoading(true);
      // Simulate document loading time (1.5-2.5 seconds)
      const loadTime = 1500 + Math.random() * 1000;
      const timer = setTimeout(() => {
        setIsLoading(false);
        setDocumentLoaded(true);
      }, loadTime);

      return () => clearTimeout(timer);
    }
  }, [isOpen, documentLoaded]);

  // Reset on close
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      // Reset loading state when closing
      setTimeout(() => {
        setDocumentLoaded(false);
      }, 200);
    }
  };

  return (
    <HoverCard.Root openDelay={300} closeDelay={100} onOpenChange={handleOpenChange}>
      <HoverCard.Trigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Preview document"
          onClick={(e) => e.stopPropagation()}
        >
          <Eye className="h-4 w-4" />
        </Button>
      </HoverCard.Trigger>

      <HoverCard.Portal>
        <HoverCard.Content
          side="left"
          align="start"
          sideOffset={10}
          className={cn(
            "bg-white rounded-lg shadow-2xl border border-gray-200 z-50",
            "w-[400px] h-[600px] flex flex-col",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
          )}
          onInteractOutside={(e) => e.preventDefault()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50 flex-shrink-0">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <Eye className="h-4 w-4 text-gray-600 flex-shrink-0" />
              <h3 className="font-medium text-sm truncate" title={document.title}>
                {document.title}
              </h3>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 flex-shrink-0 ml-2"
              onClick={() => setIsOpen(false)}
              aria-label="Close preview"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Document Info */}
          <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 flex-shrink-0">
            <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
              <span>{document.pageCount} pages</span>
              <Badge variant="outline" className="text-xs">
                {document.documentType || 'PDF'}
              </Badge>
            </div>
            <div className="flex flex-wrap gap-1">
              {document.tags.slice(0, 3).map((tag) => (
                <Badge
                  key={tag.id}
                  style={{ backgroundColor: tag.color }}
                  className="text-white text-xs"
                >
                  {tag.name}
                </Badge>
              ))}
            </div>
          </div>

          {/* Document Preview Area */}
          <div className="flex-1 relative overflow-hidden bg-gray-100">
            {isLoading ? (
              // Loading State
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100">
                <Loader2 className="h-12 w-12 text-blue-600 animate-spin mb-4" />
                <p className="text-sm text-gray-600 font-medium">Loading document...</p>
                <p className="text-xs text-gray-500 mt-1">Please wait</p>
                
                {/* Loading skeleton */}
                <div className="mt-8 space-y-3 w-full px-8">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="space-y-2">
                      <div className="h-3 bg-gray-300 rounded animate-pulse w-full" />
                      <div className="h-3 bg-gray-300 rounded animate-pulse w-5/6" />
                      <div className="h-3 bg-gray-300 rounded animate-pulse w-4/6" />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              // Loaded Document - Scrollable
              <div className="absolute inset-0 overflow-y-auto overflow-x-hidden">
                <div className="p-6 space-y-4">
                  {/* Preview using the thumbnail/mock content */}
                  <div className="bg-white rounded shadow-sm overflow-hidden">
                    <img
                      src={document.thumbnailUrl}
                      alt={`Preview of ${document.title}`}
                      className="w-full h-auto"
                    />
                  </div>

                  {/* Additional preview pages (mock) */}
                  {document.pageCount > 1 && (
                    <>
                      {[...Array(Math.min(3, document.pageCount - 1))].map((_, i) => (
                        <div
                          key={i}
                          className="bg-white rounded shadow-sm p-8 min-h-[400px] flex items-center justify-center text-gray-400"
                        >
                          <div className="text-center">
                            <p className="text-sm">Page {i + 2}</p>
                            <p className="text-xs mt-1">Preview content</p>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-3 border-t border-gray-200 bg-gray-50 flex-shrink-0">
            <div className="flex items-center justify-between text-xs text-gray-600">
              <span>
                {document.correspondent || 'Unknown correspondent'}
              </span>
              <span>
                {new Date(document.created).toLocaleDateString()}
              </span>
            </div>
          </div>
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
}
