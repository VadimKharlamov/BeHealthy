using BeHealthy.Core.Models;

namespace BeHealthy.Core;

public interface IMedEventService
{
    Task<MedEvent> CreateMedEvent(MedEvent medEvent);
    Task<Guid> DeleteMedEvent(Guid id);
    Task<List<MedEvent>> GetAllUserMedEvents(Guid userId);
    Task<Guid> UpdateMedEvent(Guid id, string title, string description,
        DateTime visitTime, string direction, string doctorName,
        string doctorPhone, string clinicName, string clinicPhone, string address);
}