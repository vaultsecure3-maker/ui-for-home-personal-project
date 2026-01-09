using DocumentManagement.Models;

namespace DocumentManagement.Services
{
    public interface IDataService
    {
        Task<List<Document>> GetDocumentsAsync();
        Task<Document?> GetDocumentByIdAsync(int id);
        Task<List<Tag>> GetTagsAsync();
        Task<List<Correspondent>> GetCorrespondentsAsync();
        Task<List<DocumentType>> GetDocumentTypesAsync();
    }
}
