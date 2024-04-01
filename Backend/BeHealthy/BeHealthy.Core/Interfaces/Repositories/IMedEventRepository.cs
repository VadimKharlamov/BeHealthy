using BeHealthy.Core.Models;

namespace BeHealthy.Core;

public interface IMedEventRepository
{
    Task<Guid> Add(MedEvent med);
    Task<Guid> Delete(Guid id);
    Task<List<MedEvent>> Get(Guid userId);
    Task<Guid> Update(Guid id, string title, string description,
        DateTime visitTime, string direction, string doctorName,
        string doctorPhone, string clinicName, string clinicPhone, string address);
}