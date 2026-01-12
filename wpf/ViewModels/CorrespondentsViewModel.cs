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
        private ObservableCollection<Correspondent> _allCorrespondents = new();

        [ObservableProperty]
        private ObservableCollection<Correspondent> correspondents = new();

        [ObservableProperty]
        private ObservableCollection<Correspondent> filteredCorrespondents = new();

        [ObservableProperty]
        private string searchQuery = string.Empty;

        [ObservableProperty]
        private string sortOrder = "name-asc";

        [ObservableProperty]
        private int currentPage = 1;

        [ObservableProperty]
        private int pageSize = 20;

        [ObservableProperty]
        private int totalPages = 1;

        [ObservableProperty]
        private int totalCorrespondents = 0;

        [ObservableProperty]
        private int paginationStart = 1;

        [ObservableProperty]
        private int paginationEnd = 0;

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
                _allCorrespondents = new ObservableCollection<Correspondent>(loaded);
                Correspondents = new ObservableCollection<Correspondent>(loaded);
                CurrentPage = 1;
                ApplyFiltersAndSort();
            }
            finally
            {
                IsLoading = false;
            }
        }

        [RelayCommand]
        public void ClearSearch()
        {
            SearchQuery = string.Empty;
            ApplyFiltersAndSort();
        }

        [RelayCommand]
        public void NextPage()
        {
            if (CurrentPage < TotalPages)
            {
                CurrentPage++;
                ApplyFiltersAndSort();
            }
        }

        [RelayCommand]
        public void PreviousPage()
        {
            if (CurrentPage > 1)
            {
                CurrentPage--;
                ApplyFiltersAndSort();
            }
        }

        partial void OnSearchQueryChanged(string value)
        {
            CurrentPage = 1;
            ApplyFiltersAndSort();
        }

        partial void OnSortOrderChanged(string value)
        {
            CurrentPage = 1;
            ApplyFiltersAndSort();
        }

        partial void OnPageSizeChanged(int value)
        {
            CurrentPage = 1;
            ApplyFiltersAndSort();
        }

        private void ApplyFiltersAndSort()
        {
            var filtered = _allCorrespondents.AsEnumerable();

            if (!string.IsNullOrWhiteSpace(SearchQuery))
            {
                var query = SearchQuery.ToLower();
                filtered = filtered.Where(c => c.Name.ToLower().Contains(query));
            }

            filtered = SortOrder switch
            {
                "name-desc" => filtered.OrderByDescending(c => c.Name),
                "documents" => filtered.OrderByDescending(c => c.DocumentCount),
                _ => filtered.OrderBy(c => c.Name)
            };

            var filteredList = filtered.ToList();
            TotalCorrespondents = filteredList.Count;
            TotalPages = (TotalCorrespondents + PageSize - 1) / PageSize;

            if (CurrentPage > TotalPages && TotalPages > 0)
                CurrentPage = TotalPages;

            var pagedItems = filteredList
                .Skip((CurrentPage - 1) * PageSize)
                .Take(PageSize)
                .ToList();

            FilteredCorrespondents = new ObservableCollection<Correspondent>(pagedItems);

            PaginationStart = TotalCorrespondents == 0 ? 0 : (CurrentPage - 1) * PageSize + 1;
            PaginationEnd = Math.Min(CurrentPage * PageSize, TotalCorrespondents);
        }
    }
}
