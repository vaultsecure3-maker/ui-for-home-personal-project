import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AppLayout } from './components/AppLayout';
import { DocumentsView } from './components/views/DocumentsView';
import { DocumentDetailView } from './components/views/DocumentDetailView';
import { UploadView } from './components/views/UploadView';
import { TagsView } from './components/views/TagsView';
import { CorrespondentsView } from './components/views/CorrespondentsView';
import { DocumentTypesView } from './components/views/DocumentTypesView';
import { SettingsView } from './components/views/SettingsView';

export default function App() {
  return (
    <BrowserRouter>
      <div className="h-screen w-screen bg-gray-50 overflow-hidden">
        <AppLayout>
          <Routes>
            <Route path="/" element={<Navigate to="/documents" replace />} />
            <Route path="/documents" element={<DocumentsView />} />
            <Route path="/documents/:id" element={<DocumentDetailView />} />
            <Route path="/upload" element={<UploadView />} />
            <Route path="/tags" element={<TagsView />} />
            <Route path="/correspondents" element={<CorrespondentsView />} />
            <Route path="/document-types" element={<DocumentTypesView />} />
            <Route path="/settings" element={<SettingsView />} />
          </Routes>
        </AppLayout>
        <Toaster position="bottom-center" richColors />
      </div>
    </BrowserRouter>
  );
}