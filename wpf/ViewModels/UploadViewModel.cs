using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using System.Collections.ObjectModel;

namespace DocumentManagement.ViewModels
{
    public partial class UploadViewModel : BaseViewModel
    {
        [ObservableProperty]
        private ObservableCollection<string> selectedFiles = new();

        [ObservableProperty]
        private double uploadProgress;

        [RelayCommand]
        public void SelectFiles()
        {
        }

        [RelayCommand]
        public async Task Upload()
        {
            IsLoading = true;
            try
            {
                StatusMessage = "Files uploaded successfully";
            }
            finally
            {
                IsLoading = false;
            }
        }
    }
}
