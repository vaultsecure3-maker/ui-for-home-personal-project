import { useState } from 'react';
import { Search, X, ChevronsUpDown, Check } from 'lucide-react';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../ui/command';
import { cn } from '../ui/utils';

export interface FilterItem {
  id: number;
  name: string;
  color?: string;
  count?: number;
}

interface FilterControlProps {
  label: string;
  placeholder: string;
  searchPlaceholder: string;
  items: FilterItem[];
  selectedIds: number[];
  onSelectionChange: (ids: number[]) => void;
  emptyMessage?: string;
}

export function FilterControl({
  label,
  placeholder,
  searchPlaceholder,
  items,
  selectedIds,
  onSelectionChange,
  emptyMessage = 'No items found.',
}: FilterControlProps) {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const toggleItem = (id: number) => {
    onSelectionChange(
      selectedIds.includes(id)
        ? selectedIds.filter(i => i !== id)
        : [...selectedIds, id]
    );
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const selectedCount = selectedIds.length;

  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">{label}</label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="justify-between h-10 bg-white hover:bg-gray-50 border-gray-300 hover:border-gray-400"
          >
            <span className="truncate text-gray-700">
              {selectedCount > 0 ? `${selectedCount} selected` : placeholder}
            </span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[280px] p-0" align="start">
          <div className="flex flex-col">
            {/* Search Input */}
            <div className="border-b border-gray-200 p-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder={searchPlaceholder}
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  autoFocus
                />
              </div>
            </div>

            {/* Items List */}
            <div className="max-h-[280px] overflow-y-auto">
              {filteredItems.length === 0 ? (
                <div className="p-6 text-center text-sm text-gray-500">
                  {emptyMessage}
                </div>
              ) : (
                <div className="space-y-0">
                  {filteredItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => toggleItem(item.id)}
                      className="w-full px-3 py-2.5 text-left text-sm hover:bg-gray-100 active:bg-gray-200 transition-colors flex items-center gap-2 border-b border-gray-100 last:border-b-0"
                    >
                      <Check
                        className={cn(
                          'h-4 w-4 shrink-0 transition-opacity',
                          selectedIds.includes(item.id) ? 'opacity-100 text-blue-600' : 'opacity-0 text-gray-400'
                        )}
                      />
                      {item.color && (
                        <div
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: item.color }}
                        />
                      )}
                      <span className="flex-1 text-gray-700 font-medium">{item.name}</span>
                      {item.count !== undefined && (
                        <span className="text-xs text-gray-500 font-medium">{item.count}</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
