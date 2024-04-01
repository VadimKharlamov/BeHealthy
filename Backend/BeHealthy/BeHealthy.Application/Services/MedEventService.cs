using BeHealthy.Core;
using BeHealthy.Core.Models;
namespace BeHealthy.Application.Services;

public class MedEventService : IMedEventService
{
    private readonly IMedEventRepository _medEventRepository;
    public MedEventService(IMedEventRepository medEventRepository)
    {
        _medEventRepository = medEventRepository;
    }

    public async Task<List<MedEvent>> GetAllUserMedEvents(Guid userId)
    {
        return await _medEventRepository.Get(userId);
    }

    public async Task<MedEvent> CreateMedEvent(MedEvent medEvent)
    {
        await _medEventRepository.Add(medEvent);
        return medEvent;
    }

    public async Task<Guid> UpdateMedEvent(Guid id, string title, string description,
        DateTime visitTime, string direction, string doctorName,
        string doctorPhone, string clinicName, string clinicPhone, string address)
    {
        return await _medEventRepository.Update(id, title, description, visitTime,
            direction, doctorName, doctorPhone, clinicName, clinicPhone, address);
    }

    public async Task<Guid> DeleteMedEvent(Guid id)
    {
        return await _medEventRepository.Delete(id);
    }
}
