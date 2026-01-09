using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using System.Collections.ObjectModel;
using DocumentManagement.Models;
using DocumentManagement.Services;

namespace DocumentManagement.ViewModels
{
    public partial class TagsViewModel : BaseViewModel
    {
        private readonly IDataService _dataService;

        [ObservableProperty]
        private ObservableCollection<Tag> tags = new();

        [ObservableProperty]
        private Tag? selectedTag;

        public TagsViewModel(IDataService dataService)
        {
            _dataService = dataService;
        }

        [RelayCommand]
        public async Task LoadTags()
        {
            IsLoading = true;
            try
            {
                var loadedTags = await _dataService.GetTagsAsync();
                Tags = new ObservableCollection<Tag>(loadedTags);
            }
            finally
            {
                IsLoading = false;
            }
        }

        [RelayCommand]
        public async Task SaveTag()
        {
            if (SelectedTag is null) return;
            IsLoading = true;
            try
            {
                StatusMessage = "Tag saved successfully";
            }
            finally
            {
                IsLoading = false;
            }
        }
    }
}
