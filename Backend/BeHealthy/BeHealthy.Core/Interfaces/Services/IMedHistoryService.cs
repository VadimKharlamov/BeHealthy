using BeHealthy.Core.Models;

namespace BeHealthy.Core;

public interface IMedHistoryService
{
    Task<Guid> CreateMedHistory(MedHistory medHistory);
    Task<Guid> DeleteMedHistory(Guid id);
    Task<List<MedHistory>> GetUserMedHistory(Guid userId);
    Task<Guid> UpdateMedHistory(Guid id, string title, string description, int count, int countType, List<DateTime> takeTime);
}