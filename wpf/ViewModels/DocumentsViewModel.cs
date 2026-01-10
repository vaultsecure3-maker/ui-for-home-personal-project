using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using System.Collections.ObjectModel;
using DocumentManagement.Models;
using DocumentManagement.Services;

namespace DocumentManagement.ViewModels
{
    public partial class DocumentsViewModel : BaseViewModel
    {
        private readonly IDataService _dataService;

        [ObservableProperty]
        private ObservableCollection<Document> documents;

        [ObservableProperty]
        private string viewMode = "card";

        [ObservableProperty]
        private string sortOrder = "date-newest";

        [ObservableProperty]
        private string searchQuery = string.Empty;

        [ObservableProperty]
        private int currentPage = 1;

        [ObservableProperty]
        private int pageSize = 20;

        [ObservableProperty]
        private bool showFilters = false;

        [ObservableProperty]
        private ObservableCollection<string> selectedTags = new();

        [ObservableProperty]
        private ObservableCollection<string> selectedCorrespondents = new();

        [ObservableProperty]
        private ObservableCollection<string> selectedDocumentTypes = new();
        public DocumentsViewModel(IDataService dataService)
        {
            _dataService = dataService;
            Documents = new ObservableCollection<Document>();
            LoadSampleData();
        }

        private void LoadSampleData()
        {
            // Add sample documents for design-time preview
            Documents.Add(new Document 
            { 
                Id = 1, 
                Title = "Monthly Invoice - December 2025",
                Created = DateTime.Now.AddDays(-5),
                Correspondent = "ABC Corporation",
                DocumentType = "Invoice",
                ThumbnailUrl = "https://via.placeholder.com/300x400/E5E7EB/6B7280?text=Document",
                PageCount = 5,
                Tags = new List<Tag> 
                { 
                    new Tag { Name = "Invoice", Color = "#3B82F6" },
                    new Tag { Name = "Important", Color = "#EF4444" }
                }
            });
            
            Documents.Add(new Document 
            { 
                Id = 2, 
                Title = "Electricity Bill - November 2025",
                Created = DateTime.Now.AddDays(-10),
                Correspondent = "Utility Company",
                DocumentType = "Receipt",
                ThumbnailUrl = "https://via.placeholder.com/300x400/F3F4F6/9CA3AF?text=Bill",
                PageCount = 2,
                Tags = new List<Tag> 
                { 
                    new Tag { Name = "Receipt", Color = "#10B981" },
                    new Tag { Name = "Utility", Color = "#14B8A6" }
                }
            });
            
            Documents.Add(new Document 
            { 
                Id = 3, 
                Title = "Insurance Policy 2026",
                Created = DateTime.Now.AddDays(-15),
                Correspondent = "Insurance Agency",
                DocumentType = "Contract",
                ThumbnailUrl = "https://via.placeholder.com/300x400/DBEAFE/3B82F6?text=Contract",
                PageCount = 12,
                Tags = new List<Tag> 
                { 
                    new Tag { Name = "Contract", Color = "#F59E0B" },
                    new Tag { Name = "Important", Color = "#EF4444" }
                }
            });
        }

        [RelayCommand]
        public async Task LoadDocuments()
        {
            IsLoading = true;
            try
            {
                var docs = await _dataService.GetDocumentsAsync();
                Documents.Clear();
                foreach (var doc in docs)
                {
                    Documents.Add(doc);
                }
            }
            finally
            {
                IsLoading = false;
            }
        }

        [RelayCommand]
        public void Search(string query)
        {
            SearchQuery = query;
            CurrentPage = 1;
            // Apply search filter
        }

        [RelayCommand]
        public void ClearFilters()
        {
            SearchQuery = string.Empty;
            SelectedTags.Clear();
            SelectedCorrespondents.Clear();
            SelectedDocumentTypes.Clear();
            CurrentPage = 1;
        }

        [RelayCommand]
        public void ToggleFilters()
        {
            ShowFilters = !ShowFilters;
        }

        [RelayCommand]
        public void ChangeViewMode(string mode)
        {
            ViewMode = mode;
        }

        [RelayCommand]
        public void ChangeSortOrder(string order)
        {
            SortOrder = order;
            // Apply sorting
        }
    }
}
