using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using System.Collections.ObjectModel;
using DocumentManagement.Models;
using DocumentManagement.Services;

namespace DocumentManagement.ViewModels
{
    public partial class DocumentTypesViewModel : BaseViewModel
    {
        private readonly IDataService _dataService;

        [ObservableProperty]
        private ObservableCollection<DocumentType> documentTypes = new();

        [ObservableProperty]
        private DocumentType? selectedType;

        public DocumentTypesViewModel(IDataService dataService)
        {
            _dataService = dataService;
        }

        [RelayCommand]
        public async Task LoadDocumentTypes()
        {
            IsLoading = true;
            try
            {
                var loaded = await _dataService.GetDocumentTypesAsync();
                DocumentTypes = new ObservableCollection<DocumentType>(loaded);
            }
            finally
            {
                IsLoading = false;
            }
        }

        [RelayCommand]
        public async Task SaveDocumentType()
        {
            if (SelectedType is null) return;
            IsLoading = true;
            try
            {
                StatusMessage = "Document type saved successfully";
            }
            finally
            {
                IsLoading = false;
            }
        }
    }
}
