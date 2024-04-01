using BeHealthy.Core.Models;

namespace BeHealthy.Core;

public interface IEventHistoryService
{
    Task<Guid> CreateEventHistory(EventHistory eventHistory);
    Task<Guid> DeleteEventHistory(Guid id);
    Task<List<EventHistory>> GetUserEventHistory(Guid userId);
    Task<Guid> UpdateEventHistory(Guid id, string title, string description,
        DateTime visitTime, string direction, string doctorName,
        string doctorPhone, string clinicName, string clinicPhone, string address);
}