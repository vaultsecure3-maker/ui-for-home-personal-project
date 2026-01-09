// Mock data for the Paperless-NGX application

export interface Document {
  id: number;
  title: string;
  created: string;
  added: string;
  correspondent: string | null;
  documentType: string | null;
  tags: Tag[];
  thumbnailUrl: string;
  previewUrl: string;
  fileSize: string;
  pageCount: number;
}

export interface Tag {
  id: number;
  name: string;
  color: string;
  documentCount: number;
}

export interface Correspondent {
  id: number;
  name: string;
  color: string;
  documentCount: number;
}

export interface DocumentType {
  id: number;
  name: string;
  color: string;
  documentCount: number;
}

// Mock Tags
export const mockTags: Tag[] = [
  { id: 1, name: "Invoice", color: "#3b82f6", documentCount: 45 },
  { id: 2, name: "Receipt", color: "#10b981", documentCount: 32 },
  { id: 3, name: "Contract", color: "#f59e0b", documentCount: 12 },
  { id: 4, name: "Important", color: "#ef4444", documentCount: 28 },
  { id: 5, name: "Personal", color: "#8b5cf6", documentCount: 19 },
  { id: 6, name: "Work", color: "#06b6d4", documentCount: 56 },
  { id: 7, name: "Tax", color: "#ec4899", documentCount: 15 },
  { id: 8, name: "Utility", color: "#14b8a6", documentCount: 22 },
];

// Mock Correspondents
export const mockCorrespondents: Correspondent[] = [
  { id: 1, name: "ABC Corporation", color: "#3b82f6", documentCount: 45 },
  { id: 2, name: "Utility Company", color: "#10b981", documentCount: 32 },
  { id: 3, name: "Bank of America", color: "#f59e0b", documentCount: 28 },
  { id: 4, name: "Insurance Agency", color: "#ef4444", documentCount: 19 },
  { id: 5, name: "Tax Office", color: "#8b5cf6", documentCount: 15 },
];

// Mock Document Types
export const mockDocumentTypes: DocumentType[] = [
  { id: 1, name: "Invoice", color: "#3b82f6", documentCount: 56 },
  { id: 2, name: "Receipt", color: "#10b981", documentCount: 42 },
  { id: 3, name: "Contract", color: "#f59e0b", documentCount: 23 },
  { id: 4, name: "Letter", color: "#ec4899", documentCount: 18 },
  { id: 5, name: "Report", color: "#14b8a6", documentCount: 31 },
];

// Mock Documents
export const mockDocuments: Document[] = [
  {
    id: 1,
    title: "Monthly Invoice - December 2025",
    created: "2025-12-15T10:30:00Z",
    added: "2025-12-15T10:35:00Z",
    correspondent: "ABC Corporation",
    documentType: "Invoice",
    tags: [mockTags[0], mockTags[3]],
    thumbnailUrl: "https://images.unsplash.com/photo-1554224311-bcc7c1d0a6a7?w=400&h=600",
    previewUrl: "/api/documents/1/preview/",
    fileSize: "2.3 MB",
    pageCount: 5,
  },
  {
    id: 2,
    title: "Electricity Bill - November 2025",
    created: "2025-11-20T14:20:00Z",
    added: "2025-11-20T14:25:00Z",
    correspondent: "Utility Company",
    documentType: "Receipt",
    tags: [mockTags[1], mockTags[7]],
    thumbnailUrl: "https://images.unsplash.com/photo-1554224307-1f7c7e2c39ed?w=400&h=600",
    previewUrl: "/api/documents/2/preview/",
    fileSize: "1.1 MB",
    pageCount: 2,
  },
  {
    id: 3,
    title: "Insurance Policy 2026",
    created: "2025-12-01T09:00:00Z",
    added: "2025-12-01T09:05:00Z",
    correspondent: "Insurance Agency",
    documentType: "Contract",
    tags: [mockTags[2], mockTags[3]],
    thumbnailUrl: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=600",
    previewUrl: "/api/documents/3/preview/",
    fileSize: "5.7 MB",
    pageCount: 12,
  },
  {
    id: 4,
    title: "Tax Return Documents 2025",
    created: "2026-01-05T11:45:00Z",
    added: "2026-01-05T11:50:00Z",
    correspondent: "Tax Office",
    documentType: "Report",
    tags: [mockTags[6], mockTags[3]],
    thumbnailUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=600",
    previewUrl: "/api/documents/4/preview/",
    fileSize: "3.8 MB",
    pageCount: 8,
  },
  {
    id: 5,
    title: "Bank Statement - December 2025",
    created: "2026-01-02T08:15:00Z",
    added: "2026-01-02T08:20:00Z",
    correspondent: "Bank of America",
    documentType: "Letter",
    tags: [mockTags[4], mockTags[5]],
    thumbnailUrl: "https://images.unsplash.com/photo-1554224311-c3a1f3f28cfe?w=400&h=600",
    previewUrl: "/api/documents/5/preview/",
    fileSize: "1.5 MB",
    pageCount: 3,
  },
  {
    id: 6,
    title: "Project Proposal Q1 2026",
    created: "2025-12-28T16:30:00Z",
    added: "2025-12-28T16:35:00Z",
    correspondent: "ABC Corporation",
    documentType: "Report",
    tags: [mockTags[5]],
    thumbnailUrl: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=600",
    previewUrl: "/api/documents/6/preview/",
    fileSize: "4.2 MB",
    pageCount: 15,
  },
];

// Generate more mock documents for pagination testing
for (let i = 7; i <= 50; i++) {
  mockDocuments.push({
    id: i,
    title: `Document ${i} - Sample Title`,
    created: new Date(2025, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
    added: new Date(2025, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
    correspondent: mockCorrespondents[Math.floor(Math.random() * mockCorrespondents.length)].name,
    documentType: mockDocumentTypes[Math.floor(Math.random() * mockDocumentTypes.length)].name,
    tags: [mockTags[Math.floor(Math.random() * mockTags.length)]],
    thumbnailUrl: `https://images.unsplash.com/photo-${1554224307 + i}?w=400&h=600`,
    previewUrl: `/api/documents/${i}/preview/`,
    fileSize: `${(Math.random() * 5 + 0.5).toFixed(1)} MB`,
    pageCount: Math.floor(Math.random() * 10) + 1,
  });
}