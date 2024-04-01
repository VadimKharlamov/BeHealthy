using BeHealthy.Core.Models;

namespace BeHealthy.Core;

public interface IEventHistoryRepository
{
    Task<Guid> Add(EventHistory eventHistory);
    Task<Guid> Delete(Guid id);
    Task<List<EventHistory>> Get(Guid userId);
    Task<Guid> Update(Guid id, string title, string description,
        DateTime visitTime, string direction, string doctorName,
        string doctorPhone, string clinicName, string clinicPhone, string address);
}