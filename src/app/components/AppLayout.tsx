import { ReactNode, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FileText, Upload, Tags, Settings, Cloud, LogOut, ChevronLeft, ChevronRight, Building2, FileType } from 'lucide-react';
import { cn } from '../components/ui/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { toast } from 'sonner';

interface NavItem {
  path: string;
  icon: React.ElementType;
  label: string;
}

const topNavItems: NavItem[] = [
  { path: '/documents', icon: FileText, label: 'Documents' },
  { path: '/upload', icon: Upload, label: 'Upload' },
  { path: '/tags', icon: Tags, label: 'Tags' },
  { path: '/correspondents', icon: Building2, label: 'Correspondents' },
  { path: '/document-types', icon: FileType, label: 'Document Types' },
];

export function AppLayout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  const isActive = (path: string) => {
    if (path === '/documents') {
      return location.pathname === '/documents' || location.pathname.startsWith('/documents/');
    }
    return location.pathname === path;
  };

  const handleLogout = () => {
    toast.success('Logged out successfully');
    // In a real app, this would clear auth tokens and redirect to login
  };

  return (
    <TooltipProvider delayDuration={300}>
      <div className="flex flex-col h-full">
        {/* Top Header */}
        <div className="h-16 bg-white border-b border-gray-200 flex items-center px-6 flex-shrink-0">
          {/* Left: Sync Status */}
          <div className="flex-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                  <Cloud className="h-4 w-4 text-green-600" />
                  <span className="text-xs">Synced 2m ago</span>
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Last sync: 2 minutes ago</p>
                <p className="text-xs text-gray-400">All documents up to date</p>
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Center: Title */}
          <h1 className="text-xl font-semibold text-gray-900">Paperless-NGX</h1>

          {/* Right: Logout */}
          <div className="flex-1 flex justify-end">
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Logout"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Sign out of your account</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* Main Content with Sidebar */}
        <div className="flex flex-1 overflow-hidden">
          {/* Fixed Navigation Rail - Sliding */}
          <div 
            className={cn(
              "bg-white border-r border-gray-200 flex flex-col justify-between py-4 flex-shrink-0 transition-all duration-300 ease-in-out relative",
              sidebarExpanded ? "w-64" : "w-20"
            )}
          >
            {/* Toggle Button */}
            <button
              onClick={() => setSidebarExpanded(!sidebarExpanded)}
              className="absolute -right-3 top-6 bg-white border border-gray-200 rounded-full p-1 hover:bg-gray-100 transition-colors z-10 shadow-sm"
              aria-label={sidebarExpanded ? "Collapse sidebar" : "Expand sidebar"}
            >
              {sidebarExpanded ? (
                <ChevronLeft className="h-4 w-4 text-gray-600" />
              ) : (
                <ChevronRight className="h-4 w-4 text-gray-600" />
              )}
            </button>

            {/* Top Section */}
            <div className="flex flex-col gap-2">
              {topNavItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                
                return (
                  <Tooltip key={item.path}>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => navigate(item.path)}
                        className={cn(
                          'flex items-center h-14 w-full transition-all duration-200 px-4',
                          'hover:bg-gray-100',
                          active ? 'bg-blue-600 text-white hover:bg-blue-700' : 'text-gray-700',
                          sidebarExpanded ? 'justify-start gap-3' : 'flex-col justify-center'
                        )}
                        aria-label={item.label}
                        aria-current={active ? 'page' : undefined}
                      >
                        <Icon className={cn("h-6 w-6", !sidebarExpanded && "mb-1")} />
                        <span className={cn(
                          "text-xs transition-opacity duration-200",
                          sidebarExpanded ? "opacity-100 text-sm font-medium" : "opacity-100"
                        )}>
                          {item.label}
                        </span>
                      </button>
                    </TooltipTrigger>
                    {!sidebarExpanded && (
                      <TooltipContent side="right">
                        <p>{item.label}</p>
                      </TooltipContent>
                    )}
                  </Tooltip>
                );
              })}
            </div>

            {/* Bottom Section */}
            <div className="flex flex-col gap-2">
              {/* Settings */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => navigate('/settings')}
                    className={cn(
                      'flex items-center h-14 w-full transition-all px-4',
                      'hover:bg-gray-100',
                      isActive('/settings') ? 'bg-blue-600 text-white hover:bg-blue-700' : 'text-gray-700',
                      sidebarExpanded ? 'justify-start gap-3' : 'flex-col justify-center'
                    )}
                    aria-label="Settings"
                    aria-current={isActive('/settings') ? 'page' : undefined}
                  >
                    <Settings className={cn("h-6 w-6", !sidebarExpanded && "mb-1")} />
                    <span className={cn(
                      "text-xs transition-opacity duration-200",
                      sidebarExpanded ? "opacity-100 text-sm font-medium" : "opacity-100"
                    )}>
                      Settings
                    </span>
                  </button>
                </TooltipTrigger>
                {!sidebarExpanded && (
                  <TooltipContent side="right">
                    <p>Settings</p>
                  </TooltipContent>
                )}
              </Tooltip>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {children}
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}