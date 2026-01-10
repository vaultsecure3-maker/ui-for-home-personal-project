using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using DocumentManagement.Services;

namespace DocumentManagement.ViewModels
{
    public partial class MainWindowViewModel : BaseViewModel
    {
        private readonly INavigationService _navigationService;
        private readonly IDialogService _dialogService;

        [ObservableProperty]
        private BaseViewModel? currentViewModel;

        [ObservableProperty]
        private bool sidebarExpanded = true;

        [ObservableProperty]
        private string currentPageTitle = "Documents";

        [ObservableProperty]
        private string currentPageDescription = string.Empty;

        public MainWindowViewModel(INavigationService navigationService, IDialogService dialogService)
        {
            _navigationService = navigationService;
            _dialogService = dialogService;
            
            // Initialize with Documents view
            NavigateToDocuments();
        }

        [RelayCommand]
        public void NavigateToDocuments()
        {
            CurrentPageTitle = "Documents";
            CurrentPageDescription = "Browse, search, and manage your document archive";
            // In a real implementation, you would set CurrentViewModel to DocumentsViewModel
        }

        [RelayCommand]
        public void NavigateToUpload()
        {
            CurrentPageTitle = "Upload";
            CurrentPageDescription = "Add new documents to your archive";
        }

        [RelayCommand]
        public void NavigateToTags()
        {
            CurrentPageTitle = "Tags";
            CurrentPageDescription = "Manage document tags and categories";
        }

        [RelayCommand]
        public void NavigateToCorrespondents()
        {
            CurrentPageTitle = "Correspondents";
            CurrentPageDescription = "Manage document correspondents";
        }

        [RelayCommand]
        public void NavigateToDocumentTypes()
        {
            CurrentPageTitle = "Document Types";
            CurrentPageDescription = "Manage document types and classifications";
        }

        [RelayCommand]
        public void NavigateToSettings()
        {
            CurrentPageTitle = "Settings";
            CurrentPageDescription = "Configure application preferences";
        }

        [RelayCommand]
        public async Task Logout()
        {
            var confirmed = await _dialogService.ShowConfirmationAsync("Logout", "Are you sure you want to logout?");
            if (confirmed)
            {
                System.Windows.Application.Current.Shutdown();
            }
        }

        [RelayCommand]
        public void ToggleSidebar()
        {
            SidebarExpanded = !SidebarExpanded;
        }
    }
}
