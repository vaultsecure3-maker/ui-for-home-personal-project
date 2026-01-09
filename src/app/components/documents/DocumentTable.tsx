import { format } from 'date-fns';
import { FileText, Download, Trash2 } from 'lucide-react';
import { Document } from '../../lib/mockData';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { DocumentPreview } from './DocumentPreview';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

interface DocumentTableProps {
  documents: Document[];
  onDocumentClick: (id: number) => void;
}

export function DocumentTable({ documents, onDocumentClick }: DocumentTableProps) {
  return (
    <div className="border rounded-lg overflow-hidden bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox aria-label="Select all" />
            </TableHead>
            <TableHead className="w-12"></TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="w-32">Created Date</TableHead>
            <TableHead className="w-40">Correspondent</TableHead>
            <TableHead className="w-48">Tags</TableHead>
            <TableHead className="w-32">Type</TableHead>
            <TableHead className="w-32 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documents.map((doc) => (
            <TableRow
              key={doc.id}
              className="cursor-pointer hover:bg-gray-50 group"
              onClick={() => onDocumentClick(doc.id)}
            >
              <TableCell onClick={(e) => e.stopPropagation()}>
                <Checkbox aria-label={`Select ${doc.title}`} />
              </TableCell>
              <TableCell>
                <FileText className="h-5 w-5 text-gray-400" />
              </TableCell>
              <TableCell className="font-medium">{doc.title}</TableCell>
              <TableCell>{format(new Date(doc.created), 'MMM dd, yyyy')}</TableCell>
              <TableCell>{doc.correspondent || '—'}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {doc.tags.slice(0, 2).map((tag) => (
                    <Badge
                      key={tag.id}
                      style={{ backgroundColor: tag.color }}
                      className="text-white text-xs"
                    >
                      {tag.name}
                    </Badge>
                  ))}
                  {doc.tags.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{doc.tags.length - 2}
                    </Badge>
                  )}
                </div>
              </TableCell>
              <TableCell>{doc.documentType || '—'}</TableCell>
              <TableCell className="text-right">
                <div
                  className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => e.stopPropagation()}
                >
                  <DocumentPreview document={doc} />
                  <Button variant="ghost" size="icon" aria-label="Download">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    aria-label="Delete"
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
  );
}