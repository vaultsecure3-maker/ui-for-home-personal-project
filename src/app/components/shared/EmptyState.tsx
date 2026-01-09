import { FileX } from 'lucide-react';
import { ReactNode } from 'react';

interface EmptyStateProps {
  icon?: React.ElementType;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({
  icon: Icon = FileX,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center px-4">
      <Icon className="h-24 w-24 text-gray-300 mb-4" />
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      {description && (
        <p className="text-gray-600 mb-6 max-w-md">{description}</p>
      )}
      {action && <div>{action}</div>}
    </div>
  );
}
