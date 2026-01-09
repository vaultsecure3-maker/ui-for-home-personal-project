using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;

namespace DocumentManagement.ViewModels
{
    public partial class SettingsViewModel : BaseViewModel
    {
        [ObservableProperty]
        private string theme = "Light";

        [ObservableProperty]
        private bool autoSync = true;

        [ObservableProperty]
        private int syncInterval = 60;

        [RelayCommand]
        public async Task SaveSettings()
        {
            IsLoading = true;
            try
            {
                StatusMessage = "Settings saved successfully";
            }
            finally
            {
                IsLoading = false;
            }
        }
    }
}
