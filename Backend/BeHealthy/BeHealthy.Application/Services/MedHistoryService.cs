using BeHealthy.Core;
using BeHealthy.Core.Models;
namespace BeHealthy.Application.Services;

public class MedHistoryService : IMedHistoryService
{
    private readonly IMedHistoryRepository _medHistoryRepository;
    public MedHistoryService(IMedHistoryRepository medHisotryRepository)
    {
        _medHistoryRepository = medHisotryRepository;
    }

    public async Task<List<MedHistory>> GetUserMedHistory(Guid userId)
    {
        return await _medHistoryRepository.Get(userId);
    }

    public async Task<Guid> CreateMedHistory(MedHistory medHistory)
    {
        return await _medHistoryRepository.Add(medHistory);
    }

    public async Task<Guid> UpdateMedHistory(Guid id, string title, string description, int count, int countType, List<DateTime> takeTime)
    {
        return await _medHistoryRepository.Update(id, title, description, count, countType, takeTime);
    }

    public async Task<Guid> DeleteMedHistory(Guid id)
    {
        return await _medHistoryRepository.Delete(id);
    }
}
