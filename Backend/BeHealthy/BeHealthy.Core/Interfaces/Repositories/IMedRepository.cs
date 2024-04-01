using BeHealthy.Core.Models;

namespace BeHealthy.Core;

public interface IMedRepository
{
    Task<Guid> Add(Med med);
    Task<Guid> Delete(Guid id);
    Task<List<Med>> Get(Guid userId);

    Task<Guid> Update(Guid id, string title, string description, int count, int takeType, int countType, List<DateTime> takeTime);
}