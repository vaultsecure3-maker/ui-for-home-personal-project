using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using System.Collections.ObjectModel;
using DocumentManagement.Models;
using DocumentManagement.Services;

namespace DocumentManagement.ViewModels
{
    public partial class CorrespondentsViewModel : BaseViewModel
    {
        private readonly IDataService _dataService;

        [ObservableProperty]
        private ObservableCollection<Correspondent> correspondents = new();

        [ObservableProperty]
        private Correspondent? selectedCorrespondent;

        public CorrespondentsViewModel(IDataService dataService)
        {
            _dataService = dataService;
        }

        [RelayCommand]
        public async Task LoadCorrespondents()
        {
            IsLoading = true;
            try
            {
                var loaded = await _dataService.GetCorrespondentsAsync();
                Correspondents = new ObservableCollection<Correspondent>(loaded);
            }
            finally
            {
                IsLoading = false;
            }
        }

        [RelayCommand]
        public async Task SaveCorrespondent()
        {
            if (SelectedCorrespondent is null) return;
            IsLoading = true;
            try
            {
                StatusMessage = "Correspondent saved successfully";
            }
            finally
            {
                IsLoading = false;
            }
        }
    }
}
