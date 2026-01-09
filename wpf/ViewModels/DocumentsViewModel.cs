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
        private ObservableCollection<Document> documents = new();

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

        public DocumentsViewModel(IDataService dataService)
        {
            _dataService = dataService;
        }

        [RelayCommand]
        public async Task LoadDocuments()
        {
            IsLoading = true;
            try
            {
                var docs = await _dataService.GetDocumentsAsync();
                Documents = new ObservableCollection<Document>(docs);
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
        }

        [RelayCommand]
        public void ClearFilters()
        {
            SearchQuery = string.Empty;
            CurrentPage = 1;
        }
    }
}
