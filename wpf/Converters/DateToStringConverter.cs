using System.Globalization;
using System.Windows.Data;

namespace DocumentManagement.Converters
{
    public class DateToStringConverter : IValueConverter
    {
        public object Convert(object? value, Type targetType, object? parameter, CultureInfo cultureInfo)
        {
            if (value is DateTime dateTime)
                return dateTime.ToString("MMM dd, yyyy");
            return string.Empty;
        }

        public object ConvertBack(object? value, Type targetType, object? parameter, CultureInfo cultureInfo)
        {
            throw new NotImplementedException();
        }
    }
}
