using System.Windows;
using Microsoft.Extensions.DependencyInjection;
using DocumentManagement.ViewModels;
using DocumentManagement.Services;

namespace DocumentManagement
{
    public partial class App : Application
    {
        private readonly IServiceProvider _serviceProvider;

        public App()
        {
            var services = new ServiceCollection();
            ConfigureServices(services);
            _serviceProvider = services.BuildServiceProvider();
        }

        private void ConfigureServices(IServiceCollection services)
        {
            services.AddScoped<INavigationService, NavigationService>();
            services.AddScoped<IDialogService, DialogService>();
            services.AddScoped<IDataService, DataService>();

            services.AddTransient<MainWindowViewModel>();
            services.AddTransient<DocumentsViewModel>();
            services.AddTransient<DocumentDetailViewModel>();
            services.AddTransient<UploadViewModel>();
            services.AddTransient<TagsViewModel>();
            services.AddTransient<CorrespondentsViewModel>();
            services.AddTransient<DocumentTypesViewModel>();
            services.AddTransient<SettingsViewModel>();

            services.AddSingleton<MainWindow>();
        }

        protected override void OnStartup(StartupEventArgs e)
        {
            base.OnStartup(e);
            var mainWindow = _serviceProvider.GetRequiredService<MainWindow>();
            mainWindow.Show();
        }
    }
}
