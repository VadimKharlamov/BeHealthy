using BeHealthy.Core;
using BeHealthy.Core.Models;
namespace BeHealthy.Application.Services;

public class EventHistoryService : IEventHistoryService
{
    private readonly IEventHistoryRepository _eventHistoryRepository;
    public EventHistoryService(IEventHistoryRepository eventHistoryRepository)
    {
        _eventHistoryRepository = eventHistoryRepository;
    }

    public async Task<List<EventHistory>> GetUserEventHistory(Guid userId)
    {
        return await _eventHistoryRepository.Get(userId);
    }

    public async Task<Guid> CreateEventHistory(EventHistory eventHistory)
    {
        return await _eventHistoryRepository.Add(eventHistory);
    }

    public async Task<Guid> UpdateEventHistory(Guid id, string title, string description,
        DateTime visitTime, string direction, string doctorName,
        string doctorPhone, string clinicName, string clinicPhone, string address)
    {
        return await _eventHistoryRepository.Update(id, title, description, visitTime,
            direction, doctorName, doctorPhone, clinicName, clinicPhone, address);
    }

    public async Task<Guid> DeleteEventHistory(Guid id)
    {
        return await _eventHistoryRepository.Delete(id);
    }
}
