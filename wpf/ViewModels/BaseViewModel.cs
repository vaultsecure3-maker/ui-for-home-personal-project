using CommunityToolkit.Mvvm.ComponentModel;

namespace DocumentManagement.ViewModels
{
    public partial class BaseViewModel : ObservableObject
    {
        [ObservableProperty]
        private bool isLoading;

        [ObservableProperty]
        private string errorMessage = string.Empty;

        [ObservableProperty]
        private string statusMessage = string.Empty;
    }
}
