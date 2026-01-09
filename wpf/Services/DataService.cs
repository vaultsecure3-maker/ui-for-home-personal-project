using DocumentManagement.Models;

namespace DocumentManagement.Services
{
    public class DataService : IDataService
    {
        public Task<List<Document>> GetDocumentsAsync()
        {
            return Task.FromResult(new List<Document>());
        }

        public Task<Document?> GetDocumentByIdAsync(int id)
        {
            return Task.FromResult<Document?>(null);
        }

        public Task<List<Tag>> GetTagsAsync()
        {
            return Task.FromResult(new List<Tag>());
        }

        public Task<List<Correspondent>> GetCorrespondentsAsync()
        {
            return Task.FromResult(new List<Correspondent>());
        }

        public Task<List<DocumentType>> GetDocumentTypesAsync()
        {
            return Task.FromResult(new List<DocumentType>());
        }
    }
}
