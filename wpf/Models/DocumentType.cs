namespace DocumentManagement.Models
{
    public class DocumentType
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Color { get; set; } = "#2563EB";
        public int DocumentCount { get; set; }
    }
}
