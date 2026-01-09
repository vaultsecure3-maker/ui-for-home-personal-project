import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Slider } from '../ui/slider';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { toast } from 'sonner';
import { 
  Server, 
  Key, 
  Palette, 
  Zap, 
  Database, 
  Keyboard, 
  Info,
  Globe,
  RefreshCw,
  Trash2,
  CheckCircle2,
  XCircle,
  Loader2,
  Languages,
  Mic,
  AlertTriangle
} from 'lucide-react';

// Settings type
interface AppSettings {
  apiUrl: string;
  theme: 'light' | 'dark' | 'custom';
  customPrimaryColor: string;
  customAccentColor: string;
  autoRefresh: boolean;
  refreshInterval: number;
  voiceCommands: boolean;
  language: 'en' | 'sr';
}

// Load settings from localStorage
const loadSettings = (): Partial<AppSettings> => {
  try {
    const saved = localStorage.getItem('paperless-settings');
    return saved ? JSON.parse(saved) : {};
  } catch (error) {
    console.error('Failed to load settings:', error);
    return {};
  }
};

// Save settings to localStorage
const saveSettings = (settings: Partial<AppSettings>) => {
  try {
    localStorage.setItem('paperless-settings', JSON.stringify(settings));
  } catch (error) {
    console.error('Failed to save settings:', error);
    throw error;
  }
};

export function SettingsView() {
  // Load initial settings from localStorage
  const savedSettings = loadSettings();

  const [apiUrl, setApiUrl] = useState(savedSettings.apiUrl || 'https://paperless.example.com');
  const [apiToken, setApiToken] = useState('');
  const [showToken, setShowToken] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'testing'>('connected');
  
  const [autoRefresh, setAutoRefresh] = useState(savedSettings.autoRefresh ?? true);
  const [refreshInterval, setRefreshInterval] = useState([savedSettings.refreshInterval || 60]);
  const [voiceCommands, setVoiceCommands] = useState(savedSettings.voiceCommands ?? false);

  // Theme is always light - dark mode removed for better UX
  const theme = 'light';
  
  const [language, setLanguage] = useState<'en' | 'sr'>(savedSettings.language || 'en');

  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);
  
  // Confirmation dialog states
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showClearCacheConfirm, setShowClearCacheConfirm] = useState(false);

  // Apply theme when it changes
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark'); // Always use light theme
  }, []);

  const handleTestConnection = () => {
    setConnectionStatus('testing');
    setTimeout(() => {
      setConnectionStatus('connected');
      toast.success(language === 'en' ? 'Connection successful!' : 'Konekcija uspešna!');
    }, 1500);
  };

  const handleSaveSettings = () => {
    try {
      const settings: Partial<AppSettings> = {
        apiUrl,
        autoRefresh,
        refreshInterval: refreshInterval[0],
        voiceCommands,
        language
      };
      
      saveSettings(settings);
      toast.success(language === 'en' ? 'Settings saved successfully' : 'Podešavanja uspešno sačuvana');
    } catch (error) {
      toast.error(language === 'en' ? 'Failed to save settings' : 'Greška pri čuvanju podešavanja');
    }
  };

  const handleResetSettings = () => {
    setApiUrl('https://paperless.example.com');
    setAutoRefresh(true);
    setRefreshInterval([60]);
    setVoiceCommands(false);
    setLanguage('en');
    
    localStorage.removeItem('paperless-settings');
    toast.info(language === 'en' ? 'Settings reset to defaults' : 'Podešavanja vraćena na podrazumevane vrednosti');
    setShowResetConfirm(false);
  };

  const handleClearCache = () => {
    toast.success(language === 'en' ? 'Cache cleared successfully (125 MB freed)' : 'Keš uspešno obrisan (125 MB oslobođeno)');
    setShowClearCacheConfirm(false);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6 flex-shrink-0">
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-600 mt-1">Manage your application preferences and configuration</p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-5xl mx-auto space-y-6">
          
          {/* Server URL Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Globe className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <CardTitle>Server URL</CardTitle>
                  <CardDescription>Configure your Paperless-NGX server address</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="api-url">Server Address</Label>
                <Input
                  id="api-url"
                  type="url"
                  value={apiUrl}
                  onChange={(e) => setApiUrl(e.target.value)}
                  placeholder="https://paperless.example.com"
                  className="font-mono text-sm"
                />
                <p className="text-xs text-gray-500">Include http:// or https://</p>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center gap-3">
                  {connectionStatus === 'connected' && (
                    <>
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium text-gray-900">Connected</p>
                        <p className="text-sm text-gray-600">Last checked: 2 minutes ago</p>
                      </div>
                    </>
                  )}
                  {connectionStatus === 'testing' && (
                    <>
                      <Loader2 className="h-5 w-5 text-yellow-600 animate-spin" />
                      <div>
                        <p className="font-medium text-gray-900">Testing connection...</p>
                        <p className="text-sm text-gray-600">Please wait</p>
                      </div>
                    </>
                  )}
                  {connectionStatus === 'disconnected' && (
                    <>
                      <XCircle className="h-5 w-5 text-red-600" />
                      <div>
                        <p className="font-medium text-gray-900">Not Connected</p>
                        <p className="text-sm text-gray-600">Check your settings</p>
                      </div>
                    </>
                  )}
                </div>
                <Button 
                  onClick={handleTestConnection} 
                  disabled={connectionStatus === 'testing'}
                  variant="outline"
                >
                  {connectionStatus === 'testing' ? 'Testing...' : 'Test Connection'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* API Token Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <Key className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <CardTitle>API Authentication</CardTitle>
                  <CardDescription>Secure access token for server communication</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <Label htmlFor="api-token">API Token</Label>
              <div className="relative">
                <Input
                  id="api-token"
                  type={showToken ? 'text' : 'password'}
                  value={apiToken}
                  onChange={(e) => setApiToken(e.target.value)}
                  placeholder="Enter your API token"
                  className="font-mono text-sm pr-20"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-7"
                  onClick={() => setShowToken(!showToken)}
                >
                  {showToken ? 'Hide' : 'Show'}
                </Button>
              </div>
              <p className="text-xs text-gray-500">Found in your Paperless settings → API</p>
            </CardContent>
          </Card>

          {/* Language Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-cyan-100 rounded-lg">
                  <Languages className="h-5 w-5 text-cyan-600" />
                </div>
                <div>
                  <CardTitle>Language</CardTitle>
                  <CardDescription>Select your preferred language</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3">
                <Button 
                  variant={language === 'en' ? 'default' : 'outline'} 
                  className="flex-1 justify-start gap-2" 
                  onClick={() => setLanguage('en')}
                >
                  <Languages className="h-4 w-4" />
                  English (US)
                </Button>
                <Button 
                  variant={language === 'sr' ? 'default' : 'outline'} 
                  className="flex-1 justify-start gap-2" 
                  onClick={() => setLanguage('sr')}
                >
                  <Languages className="h-4 w-4" />
                  Srpski (Serbian)
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Auto-Refresh Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <RefreshCw className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <CardTitle>Auto-Refresh Documents</CardTitle>
                  <CardDescription>Automatically check for new documents from the server</CardDescription>
                </div>
                <Switch checked={autoRefresh} onCheckedChange={setAutoRefresh} />
              </div>
            </CardHeader>
            {autoRefresh && (
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Refresh Interval</Label>
                    <Badge variant="outline">{refreshInterval[0]} seconds</Badge>
                  </div>
                  <Slider
                    value={refreshInterval}
                    onValueChange={setRefreshInterval}
                    min={10}
                    max={300}
                    step={10}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>10s (Fast)</span>
                    <span>5min (Battery Friendly)</span>
                  </div>
                </div>

                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2 text-sm">
                    <Info className="h-4 w-4 text-green-600" />
                    <div className="space-y-1 text-green-900">
                      <p className="font-medium">Last check: 2 minutes ago</p>
                      <p className="text-green-700">Next check: in 58 seconds</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>

          {/* Voice Commands Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <Mic className="h-5 w-5 text-amber-600" />
                </div>
                <div className="flex-1">
                  <CardTitle>Voice Commands</CardTitle>
                  <CardDescription>Enable voice control for hands-free operation (English only)</CardDescription>
                </div>
                <Switch checked={voiceCommands} onCheckedChange={setVoiceCommands} />
              </div>
            </CardHeader>
            {voiceCommands && (
              <CardContent>
                <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                  <p className="font-medium text-sm mb-2 text-amber-900">Supported Commands:</p>
                  <ul className="text-sm text-amber-800 space-y-1.5">
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-600" />
                      "Upload" - Open upload view
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-600" />
                      "Search [query]" - Perform search
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-600" />
                      "Refresh" - Reload documents
                    </li>
                  </ul>
                </div>
              </CardContent>
            )}
          </Card>

          {/* Clear Cache Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Trash2 className="h-5 w-5 text-orange-600" />
                </div>
                <div className="flex-1">
                  <CardTitle>Thumbnail Cache</CardTitle>
                  <CardDescription>Clear cached thumbnails to free up storage space</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div>
                  <p className="font-medium text-gray-900">Currently using 125 MB</p>
                  <p className="text-sm text-gray-600">Last cleared: 3 days ago</p>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => setShowClearCacheConfirm(true)}
                  className="gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Clear Cache
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Keyboard Shortcuts Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-100 rounded-lg">
                  <Keyboard className="h-5 w-5 text-slate-600" />
                </div>
                <div className="flex-1">
                  <CardTitle>Keyboard Shortcuts</CardTitle>
                  <CardDescription>Learn all available keyboard shortcuts</CardDescription>
                </div>
                <Button 
                  variant="outline"
                  onClick={() => setShowKeyboardShortcuts(true)}
                >
                  View Shortcuts
                </Button>
              </div>
            </CardHeader>
          </Card>

          {/* About Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Info className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <CardTitle>About</CardTitle>
                  <CardDescription>Application and API version information</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">App version:</span>
                  <Badge variant="outline">v1.0.0</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Paperless-NGX API:</span>
                  <Badge variant="outline">v2.3.0</Badge>
                </div>
                <div className="pt-2">
                  <a href="#" className="text-blue-600 hover:underline inline-flex items-center gap-1 text-sm">
                    View on GitHub →
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pb-6">
            <Button 
              variant="outline" 
              onClick={() => setShowResetConfirm(true)}
              className="gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Reset to Defaults
            </Button>
            <Button onClick={handleSaveSettings} className="gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Save All Settings
            </Button>
          </div>
        </div>
      </div>

      {/* Reset Settings Confirmation Dialog */}
      <AlertDialog open={showResetConfirm} onOpenChange={setShowResetConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              Reset All Settings?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will reset all settings to their default values. Your custom theme colors, language preferences, 
              and automation settings will be lost. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleResetSettings} className="bg-orange-600 hover:bg-orange-700">
              Reset Settings
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Clear Cache Confirmation Dialog */}
      <AlertDialog open={showClearCacheConfirm} onOpenChange={setShowClearCacheConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <Trash2 className="h-5 w-5 text-red-600" />
              Clear Thumbnail Cache?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will delete all cached document thumbnails (approximately 125 MB). 
              Thumbnails will be regenerated as you browse documents, which may cause temporary slowdowns.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleClearCache} className="bg-red-600 hover:bg-red-700">
              Clear Cache
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Keyboard Shortcuts Dialog */}
      <Dialog open={showKeyboardShortcuts} onOpenChange={setShowKeyboardShortcuts}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Keyboard className="h-5 w-5" />
              Keyboard Shortcuts
            </DialogTitle>
            <DialogDescription>
              Use these keyboard shortcuts to navigate and interact with Paperless-NGX more efficiently
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Navigation Section */}
            <div>
              <h3 className="font-semibold text-sm text-gray-900 mb-3">Navigation</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-700">Go to Documents</span>
                  <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-300 rounded">
                    Ctrl + D
                  </kbd>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-700">Go to Upload</span>
                  <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-300 rounded">
                    Ctrl + U
                  </kbd>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-700">Go to Settings</span>
                  <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-300 rounded">
                    Ctrl + ,
                  </kbd>
                </div>
              </div>
            </div>

            {/* Actions Section */}
            <div>
              <h3 className="font-semibold text-sm text-gray-900 mb-3">Actions</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-700">Search Documents</span>
                  <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-300 rounded">
                    Ctrl + F
                  </kbd>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-700">Refresh Current View</span>
                  <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-300 rounded">
                    F5
                  </kbd>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-700">Toggle Filters</span>
                  <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-300 rounded">
                    Ctrl + K
                  </kbd>
                </div>
              </div>
            </div>

            {/* Document View Section */}
            <div>
              <h3 className="font-semibold text-sm text-gray-900 mb-3">Document View</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-700">Switch to Card View</span>
                  <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-300 rounded">
                    Ctrl + 1
                  </kbd>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-700">Switch to Table View</span>
                  <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-300 rounded">
                    Ctrl + 2
                  </kbd>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-700">Next Page</span>
                  <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-300 rounded">
                    →
                  </kbd>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-700">Previous Page</span>
                  <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-300 rounded">
                    ←
                  </kbd>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}