using BeHealthy.Core.Models;

namespace BeHealthy.Core;

public interface IMedsService
{
    Task<Med> CreateMed(Med med);
    Task<Guid> DeleteMed(Guid id);
    Task<List<Med>> GetAllUserMeds(Guid userId);
    Task<Guid> UpdateMed(Guid id, string title, string description, int count, int takeType, int countType, List<DateTime> takeTime);
}