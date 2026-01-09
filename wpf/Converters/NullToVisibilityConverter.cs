using System.Globalization;
using System.Windows;
using System.Windows.Data;

namespace DocumentManagement.Converters
{
    public class NullToVisibilityConverter : IValueConverter
    {
        public object Convert(object? value, Type targetType, object? parameter, CultureInfo cultureInfo)
        {
            return value is null ? Visibility.Collapsed : Visibility.Visible;
        }

        public object ConvertBack(object? value, Type targetType, object? parameter, CultureInfo cultureInfo)
        {
            throw new NotImplementedException();
        }
    }
}
