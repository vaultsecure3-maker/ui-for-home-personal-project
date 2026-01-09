import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload as UploadIcon, Check, FileText, ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { mockCorrespondents, mockDocumentTypes } from '../../lib/mockData';
import { toast } from 'sonner';

type Step = 1 | 2 | 3;

export function UploadView() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);

  // Form state
  const [title, setTitle] = useState('');
  const [correspondent, setCorrespondent] = useState('');
  const [documentType, setDocumentType] = useState('');

  const handleFileSelect = (file: File) => {
    if (file.size > 50 * 1024 * 1024) {
      toast.error('File size exceeds 50MB limit');
      return;
    }
    setSelectedFile(file);
    setTitle(file.name.replace(/\.[^/.]+$/, ''));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const handleUpload = () => {
    setUploading(true);
    setCurrentStep(3);
    
    // Simulate upload
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          setUploadComplete(true);
          toast.success('Upload complete!');
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6 flex-shrink-0">
        <h1 className="text-2xl font-semibold text-gray-900">Upload Documents</h1>
        <p className="text-sm text-gray-600 mt-1">Add new documents to your archive with metadata</p>
      </div>

      {/* Stepper Header */}
      <div className="border-b border-gray-200 py-6">
        <div className="max-w-2xl mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Step 1 */}
            <div className="flex flex-col items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  currentStep >= 1
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {currentStep > 1 ? <Check className="h-5 w-5" /> : '1'}
              </div>
              <span className={`text-sm ${currentStep >= 1 ? 'font-medium' : 'text-gray-500'}`}>
                Select File
              </span>
            </div>

            <ChevronRight className="text-gray-400 mx-4" />

            {/* Step 2 */}
            <div className="flex flex-col items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  currentStep >= 2
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {currentStep > 2 ? <Check className="h-5 w-5" /> : '2'}
              </div>
              <span className={`text-sm ${currentStep >= 2 ? 'font-medium' : 'text-gray-500'}`}>
                Add Details
              </span>
            </div>

            <ChevronRight className="text-gray-400 mx-4" />

            {/* Step 3 */}
            <div className="flex flex-col items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  currentStep >= 3
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {uploadComplete ? <Check className="h-5 w-5" /> : '3'}
              </div>
              <span className={`text-sm ${currentStep >= 3 ? 'font-medium' : 'text-gray-500'}`}>
                Upload
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="border-b border-gray-200 bg-gray-50 px-4 py-3">
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <UploadIcon className="h-4 w-4 text-gray-500" />
            <span className="text-gray-600">
              {!selectedFile && 'No file selected'}
              {selectedFile && !uploadComplete && (
                <>
                  <span className="font-medium text-gray-900">{selectedFile.name}</span>
                  {' '}({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                </>
              )}
              {uploadComplete && (
                <>
                  <span className="font-medium text-green-600">Upload complete!</span>
                </>
              )}
            </span>
          </div>
          {currentStep === 2 && (
            <Badge variant="secondary" className="gap-1">
              Step 2 of 3
            </Badge>
          )}
          {uploading && (
            <Badge variant="secondary" className="gap-1">
              Uploading... {uploadProgress}%
            </Badge>
          )}
          {uploadComplete && (
            <Badge className="gap-1 bg-green-600">
              <Check className="h-3 w-3" />
              Complete
            </Badge>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-2xl mx-auto">
          {/* Step 1: File Selection */}
          {currentStep === 1 && !selectedFile && (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
              <div
                className={`border-4 border-dashed rounded-lg p-12 w-full max-w-md transition-colors cursor-pointer ${
                  isDragging
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onDrop={handleDrop}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onClick={() => document.getElementById('file-input')?.click()}
              >
                <div className="text-center">
                  <UploadIcon className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Drop files here</h3>
                  <p className="text-gray-600 mb-2">or click to browse</p>
                  <p className="text-sm text-gray-500">PDF, JPG, PNG (Max 50MB)</p>
                </div>
              </div>
              <input
                id="file-input"
                type="file"
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileSelect(file);
                }}
              />
              <Button variant="outline" className="mt-6" onClick={() => document.getElementById('file-input')?.click()}>
                Select Files...
              </Button>
            </div>
          )}

          {currentStep === 1 && selectedFile && (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
              <div className="bg-white border-2 border-gray-200 rounded-lg p-8 w-full max-w-md">
                <div className="flex items-center gap-4">
                  <FileText className="h-12 w-12 text-blue-600" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">{selectedFile.name}</h3>
                    <p className="text-sm text-gray-600">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full mt-6"
                  onClick={() => {
                    setSelectedFile(null);
                    setTitle('');
                  }}
                >
                  Change File
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Metadata Input */}
          {currentStep === 2 && (
            <div className="max-w-md mx-auto space-y-6">
              <h2 className="text-2xl font-bold mb-6">Add Document Details</h2>
              
              <div className="space-y-2">
                <Label htmlFor="upload-title">
                  Title <span className="text-red-600">*</span>
                </Label>
                <Input
                  id="upload-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Document title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="upload-correspondent">Correspondent</Label>
                <Select value={correspondent || 'none'} onValueChange={(value) => setCorrespondent(value === 'none' ? '' : value)}>
                  <SelectTrigger id="upload-correspondent">
                    <SelectValue placeholder="Select correspondent" />
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

              <div className="space-y-2">
                <Label htmlFor="upload-type">Document Type</Label>
                <Select value={documentType || 'none'} onValueChange={(value) => setDocumentType(value === 'none' ? '' : value)}>
                  <SelectTrigger id="upload-type">
                    <SelectValue placeholder="Select document type" />
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
            </div>
          )}

          {/* Step 3: Upload Progress/Success */}
          {currentStep === 3 && !uploadComplete && (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
              <div className="w-32 h-32 mb-6">
                <Progress value={uploadProgress} className="h-32 w-32" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">{uploadProgress}%</h3>
              <p className="text-gray-600 mb-2">Uploading...</p>
              <p className="text-sm text-gray-500">About {Math.ceil((100 - uploadProgress) / 10)} seconds remaining</p>
            </div>
          )}

          {currentStep === 3 && uploadComplete && (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
              <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <Check className="h-16 w-16 text-green-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">Upload Complete!</h3>
              <p className="text-gray-600 mb-6">Your document has been added</p>
              <img
                src={selectedFile ? URL.createObjectURL(selectedFile) : ''}
                alt="Preview"
                className="max-w-sm rounded-lg shadow-lg mb-6"
              />
            </div>
          )}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="border-t border-gray-200 px-6 py-4">
        <div className="max-w-2xl mx-auto flex justify-between">
          {currentStep === 1 && selectedFile && (
            <>
              <div></div>
              <Button onClick={() => setCurrentStep(2)}>
                Next <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </>
          )}

          {currentStep === 2 && (
            <>
              <Button
                variant="outline"
                onClick={() => setCurrentStep(1)}
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <Button onClick={handleUpload} disabled={!title}>
                Upload Document
              </Button>
            </>
          )}

          {currentStep === 3 && uploadComplete && (
            <>
              <Button
                variant="outline"
                onClick={() => {
                  setCurrentStep(1);
                  setSelectedFile(null);
                  setTitle('');
                  setCorrespondent('');
                  setDocumentType('');
                  setUploadProgress(0);
                  setUploadComplete(false);
                }}
              >
                Upload Another
              </Button>
              <Button onClick={() => navigate('/documents')}>
                Open Document
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}