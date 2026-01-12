using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;

namespace DocumentManagement.Views.Controls
{
    public partial class Pagination : UserControl
    {
        public static readonly DependencyProperty CurrentPageProperty =
            DependencyProperty.Register("CurrentPage", typeof(int), typeof(Pagination), new PropertyMetadata(1));

        public static readonly DependencyProperty TotalPagesProperty =
            DependencyProperty.Register("TotalPages", typeof(int), typeof(Pagination), new PropertyMetadata(1));

        public static readonly DependencyProperty PageSizeProperty =
            DependencyProperty.Register("PageSize", typeof(int), typeof(Pagination), new PropertyMetadata(20));

        public static readonly DependencyProperty TotalProperty =
            DependencyProperty.Register("Total", typeof(int), typeof(Pagination), new PropertyMetadata(0));

        public static readonly DependencyProperty PaginationStartProperty =
            DependencyProperty.Register("PaginationStart", typeof(int), typeof(Pagination), new PropertyMetadata(1));

        public static readonly DependencyProperty PaginationEndProperty =
            DependencyProperty.Register("PaginationEnd", typeof(int), typeof(Pagination), new PropertyMetadata(0));

        public static readonly DependencyProperty ItemLabelProperty =
            DependencyProperty.Register("ItemLabel", typeof(string), typeof(Pagination), new PropertyMetadata("items"));

        public static readonly DependencyProperty NextPageCommandProperty =
            DependencyProperty.Register("NextPageCommand", typeof(ICommand), typeof(Pagination), new PropertyMetadata(null));

        public static readonly DependencyProperty PreviousPageCommandProperty =
            DependencyProperty.Register("PreviousPageCommand", typeof(ICommand), typeof(Pagination), new PropertyMetadata(null));

        public int CurrentPage
        {
            get { return (int)GetValue(CurrentPageProperty); }
            set { SetValue(CurrentPageProperty, value); }
        }

        public int TotalPages
        {
            get { return (int)GetValue(TotalPagesProperty); }
            set { SetValue(TotalPagesProperty, value); }
        }

        public int PageSize
        {
            get { return (int)GetValue(PageSizeProperty); }
            set { SetValue(PageSizeProperty, value); }
        }

        public int Total
        {
            get { return (int)GetValue(TotalProperty); }
            set { SetValue(TotalProperty, value); }
        }

        public int PaginationStart
        {
            get { return (int)GetValue(PaginationStartProperty); }
            set { SetValue(PaginationStartProperty, value); }
        }

        public int PaginationEnd
        {
            get { return (int)GetValue(PaginationEndProperty); }
            set { SetValue(PaginationEndProperty, value); }
        }

        public string ItemLabel
        {
            get { return (string)GetValue(ItemLabelProperty); }
            set { SetValue(ItemLabelProperty, value); }
        }

        public ICommand NextPageCommand
        {
            get { return (ICommand)GetValue(NextPageCommandProperty); }
            set { SetValue(NextPageCommandProperty, value); }
        }

        public ICommand PreviousPageCommand
        {
            get { return (ICommand)GetValue(PreviousPageCommandProperty); }
            set { SetValue(PreviousPageCommandProperty, value); }
        }

        public Pagination()
        {
            InitializeComponent();
        }
    }
}
