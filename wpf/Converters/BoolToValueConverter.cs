using System.Globalization;
using System.Windows.Data;

namespace DocumentManagement.Converters
{
    public class BoolToValueConverter : IValueConverter
    {
        public object Convert(object? value, Type targetType, object? parameter, CultureInfo cultureInfo)
        {
            if (value is not bool boolValue || parameter is not string paramString)
                return null!;

            var parts = paramString.Split(';');
            if (parts.Length != 2)
                return null!;

            return boolValue
                ? double.TryParse(parts[0], out var trueVal) ? trueVal : null!
                : double.TryParse(parts[1], out var falseVal) ? falseVal : null!;
        }

        public object ConvertBack(object? value, Type targetType, object? parameter, CultureInfo cultureInfo)
        {
            throw new NotImplementedException();
        }
    }
}
