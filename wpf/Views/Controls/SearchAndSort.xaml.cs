using System.Windows;
using System.Windows.Controls;
using System.Collections.ObjectModel;
using System.Windows.Input;

namespace DocumentManagement.Views.Controls
{
    public partial class SearchAndSort : UserControl
    {
        public static readonly DependencyProperty SearchPlaceholderProperty =
            DependencyProperty.Register("SearchPlaceholder", typeof(string), typeof(SearchAndSort), new PropertyMetadata("Search..."));

        public static readonly DependencyProperty SearchQueryProperty =
            DependencyProperty.Register("SearchQuery", typeof(string), typeof(SearchAndSort), new PropertyMetadata(""));

        public static readonly DependencyProperty SortOrderProperty =
            DependencyProperty.Register("SortOrder", typeof(string), typeof(SearchAndSort), new PropertyMetadata(""));

        public static readonly DependencyProperty ClearSearchCommandProperty =
            DependencyProperty.Register("ClearSearchCommand", typeof(ICommand), typeof(SearchAndSort), new PropertyMetadata(null));

        public static readonly DependencyProperty SortOptionsProperty =
            DependencyProperty.Register("SortOptions", typeof(ObservableCollection<ComboBoxItem>), typeof(SearchAndSort), new PropertyMetadata(null));

        public static readonly DependencyProperty SortComboBoxWidthProperty =
            DependencyProperty.Register("SortComboBoxWidth", typeof(double), typeof(SearchAndSort), new PropertyMetadata(140.0));

        public string SearchPlaceholder
        {
            get { return (string)GetValue(SearchPlaceholderProperty); }
            set { SetValue(SearchPlaceholderProperty, value); }
        }

        public string SearchQuery
        {
            get { return (string)GetValue(SearchQueryProperty); }
            set { SetValue(SearchQueryProperty, value); }
        }

        public string SortOrder
        {
            get { return (string)GetValue(SortOrderProperty); }
            set { SetValue(SortOrderProperty, value); }
        }

        public ICommand ClearSearchCommand
        {
            get { return (ICommand)GetValue(ClearSearchCommandProperty); }
            set { SetValue(ClearSearchCommandProperty, value); }
        }

        public ObservableCollection<ComboBoxItem> SortOptions
        {
            get { return (ObservableCollection<ComboBoxItem>)GetValue(SortOptionsProperty); }
            set { SetValue(SortOptionsProperty, value); }
        }

        public double SortComboBoxWidth
        {
            get { return (double)GetValue(SortComboBoxWidthProperty); }
            set { SetValue(SortComboBoxWidthProperty, value); }
        }

        public SearchAndSort()
        {
            InitializeComponent();
        }
    }
}
