namespace DocumentManagement.Services
{
    public interface IDialogService
    {
        Task<bool> ShowConfirmationAsync(string title, string message);
        void ShowError(string title, string message);
        void ShowInfo(string title, string message);
    }
}
