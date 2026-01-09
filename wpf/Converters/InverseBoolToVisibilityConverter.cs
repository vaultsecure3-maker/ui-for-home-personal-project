using System.Globalization;
using System.Windows;
using System.Windows.Data;

namespace DocumentManagement.Converters
{
    public class InverseBoolToVisibilityConverter : IValueConverter
    {
        public object Convert(object? value, Type targetType, object? parameter, CultureInfo cultureInfo)
        {
            if (value is bool boolValue)
                return boolValue ? Visibility.Collapsed : Visibility.Visible;
            return Visibility.Visible;
        }

        public object ConvertBack(object? value, Type targetType, object? parameter, CultureInfo cultureInfo)
        {
            return value is Visibility visibility && visibility == Visibility.Collapsed;
        }
    }
}
