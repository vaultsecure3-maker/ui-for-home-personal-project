namespace DocumentManagement.Models
{
    public class Document
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public DateTime Created { get; set; }
        public string Correspondent { get; set; } = string.Empty;
        public string DocumentType { get; set; } = string.Empty;
        public string ThumbnailUrl { get; set; } = string.Empty;
        public int PageCount { get; set; }
        public List<Tag> Tags { get; set; } = new();
    }
}
