using BeHealthy.Core.Models;

namespace BeHealthy.Core;

public interface IMedHistoryRepository
{
    Task<Guid> Add(MedHistory med);
    Task<Guid> Delete(Guid id);
    Task<List<MedHistory>> Get(Guid userId);
    Task<Guid> Update(Guid id, string title, string description, int count, int countType, List<DateTime> takeTime);
}