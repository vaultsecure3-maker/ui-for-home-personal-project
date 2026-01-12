using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;

namespace DocumentManagement.Views.Controls
{
    public partial class PageHeader : UserControl
    {
        public static readonly DependencyProperty TitleProperty =
            DependencyProperty.Register("Title", typeof(string), typeof(PageHeader), new PropertyMetadata(""));

        public static readonly DependencyProperty DescriptionProperty =
            DependencyProperty.Register("Description", typeof(string), typeof(PageHeader), new PropertyMetadata(""));

        public static readonly DependencyProperty ShowActionButtonProperty =
            DependencyProperty.Register("ShowActionButton", typeof(bool), typeof(PageHeader), new PropertyMetadata(false));

        public static readonly DependencyProperty ActionButtonTextProperty =
            DependencyProperty.Register("ActionButtonText", typeof(string), typeof(PageHeader), new PropertyMetadata("Action"));

        public static readonly DependencyProperty ActionButtonIconProperty =
            DependencyProperty.Register("ActionButtonIcon", typeof(string), typeof(PageHeader), new PropertyMetadata("Plus"));

        public static readonly DependencyProperty ActionCommandProperty =
            DependencyProperty.Register("ActionCommand", typeof(ICommand), typeof(PageHeader), new PropertyMetadata(null));

        public string Title
        {
            get { return (string)GetValue(TitleProperty); }
            set { SetValue(TitleProperty, value); }
        }

        public string Description
        {
            get { return (string)GetValue(DescriptionProperty); }
            set { SetValue(DescriptionProperty, value); }
        }

        public bool ShowActionButton
        {
            get { return (bool)GetValue(ShowActionButtonProperty); }
            set { SetValue(ShowActionButtonProperty, value); }
        }

        public string ActionButtonText
        {
            get { return (string)GetValue(ActionButtonTextProperty); }
            set { SetValue(ActionButtonTextProperty, value); }
        }

        public string ActionButtonIcon
        {
            get { return (string)GetValue(ActionButtonIconProperty); }
            set { SetValue(ActionButtonIconProperty, value); }
        }

        public ICommand ActionCommand
        {
            get { return (ICommand)GetValue(ActionCommandProperty); }
            set { SetValue(ActionCommandProperty, value); }
        }

        public PageHeader()
        {
            InitializeComponent();
        }
    }
}
