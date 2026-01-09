using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using DocumentManagement.Models;
using DocumentManagement.Services;

namespace DocumentManagement.ViewModels
{
    public partial class DocumentDetailViewModel : BaseViewModel
    {
        private readonly IDataService _dataService;

        [ObservableProperty]
        private Document? currentDocument;

        [ObservableProperty]
        private bool isEditMode;

        public DocumentDetailViewModel(IDataService dataService)
        {
            _dataService = dataService;
        }

        [RelayCommand]
        public async Task LoadDocument(int id)
        {
            IsLoading = true;
            try
            {
                CurrentDocument = await _dataService.GetDocumentByIdAsync(id);
            }
            finally
            {
                IsLoading = false;
            }
        }

        [RelayCommand]
        public void ToggleEditMode()
        {
            IsEditMode = !IsEditMode;
        }

        [RelayCommand]
        public async Task SaveDocument()
        {
            if (CurrentDocument is null) return;
            IsLoading = true;
            try
            {
                StatusMessage = "Document saved successfully";
            }
            finally
            {
                IsLoading = false;
            }
        }
    }
}
