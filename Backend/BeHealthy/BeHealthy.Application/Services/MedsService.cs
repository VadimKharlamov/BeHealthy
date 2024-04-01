using BeHealthy.Core;
using BeHealthy.Core.Models;
namespace BeHealthy.Application.Services;

public class MedsService : IMedsService
{
    private readonly IMedRepository _medsRepository;
    public MedsService(IMedRepository medRepository)
    {
        _medsRepository = medRepository;
    }

    public async Task<List<Med>> GetAllUserMeds(Guid userId)
    {
        return await _medsRepository.Get(userId);
    }

    public async Task<Med> CreateMed(Med med)
    {
        await _medsRepository.Add(med);

        return med;
    }

    public async Task<Guid> UpdateMed(Guid id, string title, string description, int count, int takeType, int countType, List<DateTime> takeTime)
    {
        return await _medsRepository.Update(id, title, description, count, takeType, countType, takeTime);
    }

    public async Task<Guid> DeleteMed(Guid id)
    {
        return await _medsRepository.Delete(id);
    }
}
