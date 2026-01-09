namespace DocumentManagement.Services
{
    public interface INavigationService
    {
        void Navigate(Type viewModelType);
        void Navigate(string viewName);
    }
}
