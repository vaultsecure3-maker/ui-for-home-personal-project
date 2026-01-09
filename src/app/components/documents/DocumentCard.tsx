import { Calendar, User, FileText } from 'lucide-react';
import { Document } from '../../lib/mockData';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import { Skeleton } from '../ui/skeleton';
import { format } from 'date-fns';
import { DocumentPreview } from './DocumentPreview';

interface DocumentCardProps {
  document: Document;
  onClick: () => void;
  loading?: boolean;
}

export function DocumentCard({ document, onClick, loading }: DocumentCardProps) {
  if (loading) {
    return (
      <Card className="cursor-pointer hover:shadow-lg transition-shadow">
        <Skeleton className="h-40 w-full rounded-t-lg" />
        <CardContent className="p-4">
          <Skeleton className="h-6 w-full mb-2" />
          <Skeleton className="h-4 w-2/3 mb-4" />
          <div className="flex gap-2">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-20" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:-translate-y-1 group"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {/* Thumbnail */}
      <div className="relative h-40 bg-gray-100 overflow-hidden rounded-t-lg">
        <img
          src={document.thumbnailUrl}
          alt={document.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          loading="lazy"
        />
        <div className="absolute top-2 right-2 flex gap-1">
          <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">
            <FileText className="h-3 w-3 mr-1" />
            {document.pageCount} pages
          </Badge>
        </div>
        {/* Preview Button - Shows on hover */}
        <div className="absolute top-2 left-2">
          <DocumentPreview document={document} />
        </div>
      </div>

      {/* Content */}
      <CardContent className="p-4">
        {/* Title */}
        <h3 className="font-semibold text-sm mb-2 line-clamp-2 min-h-[2.5rem]" title={document.title}>
          {document.title}
        </h3>

        {/* Metadata */}
        <div className="flex flex-col gap-1 mb-3 text-xs text-gray-600">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{format(new Date(document.created), 'MMM dd, yyyy')}</span>
          </div>
          {document.correspondent && (
            <div className="flex items-center gap-1">
              <User className="h-3 w-3" />
              <span className="truncate">{document.correspondent}</span>
            </div>
          )}
        </div>

        {/* Tags */}
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
          {document.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{document.tags.length - 3} more
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}