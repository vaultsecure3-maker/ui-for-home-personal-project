using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;
using System.Windows.Threading;

namespace DocumentManagement.Views
{
    public partial class DocumentsView : UserControl
    {
        private DispatcherTimer? _loadingTimer;
        private bool _documentLoaded = false;

        public DocumentsView()
        {
            InitializeComponent();
        }

        private void PreviewButton_MouseEnter(object sender, MouseEventArgs e)
        {
            PreviewPopup.IsOpen = true;

            if (!_documentLoaded)
            {
                LoadingPanel.Visibility = Visibility.Visible;
                DocumentScrollViewer.Visibility = Visibility.Collapsed;

                var random = new Random();
                var loadTime = 1500 + random.Next(0, 1001);

                _loadingTimer = new DispatcherTimer
                {
                    Interval = TimeSpan.FromMilliseconds(loadTime)
                };

                _loadingTimer.Tick += (s, args) =>
                {
                    _loadingTimer?.Stop();
                    _loadingTimer = null;

                    LoadingPanel.Visibility = Visibility.Collapsed;
                    DocumentScrollViewer.Visibility = Visibility.Visible;
                    _documentLoaded = true;
                };

                _loadingTimer.Start();
            }
        }

        private void PreviewButton_MouseLeave(object sender, MouseEventArgs e)
        {
            // Let the popup handle its own mouse leave
        }

        private void PreviewPopup_MouseLeave(object sender, MouseEventArgs e)
        {
            PreviewPopup.IsOpen = false;
            ResetPreviewState();
        }

        private void ClosePreview_Click(object sender, RoutedEventArgs e)
        {
            PreviewPopup.IsOpen = false;
            ResetPreviewState();
        }

        private void ResetPreviewState()
        {
            _loadingTimer?.Stop();
            _loadingTimer = null;

            var resetTimer = new DispatcherTimer
            {
                Interval = TimeSpan.FromMilliseconds(200)
            };

            resetTimer.Tick += (s, args) =>
            {
                resetTimer.Stop();
                _documentLoaded = false;
            };

            resetTimer.Start();
        }
    }
}
