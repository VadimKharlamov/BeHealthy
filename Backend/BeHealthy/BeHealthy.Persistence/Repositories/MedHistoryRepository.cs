using BeHealthy.Persistence.Entities;
using BeHealthy.Core.Models;
using BeHealthy.Core;
using Microsoft.EntityFrameworkCore;

namespace BeHealthy.Persistence.Repositories;

public class MedHistoryRepository : IMedHistoryRepository
{
    private readonly HealthyDbContext _dbContext;

    public MedHistoryRepository(HealthyDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<List<MedHistory>> Get(Guid userId)
    {
        var medHistoryEntities = await _dbContext.MedHistory
            .AsNoTracking()
            .ToListAsync();
        var history = medHistoryEntities
            .Where(b => b.UserId == userId)
            .Select(b => MedHistory.Create(b.Id, b.UserId, b.Title, b.Description, b.Count, b.CountType, b.TakeTime).medHistory)
            .ToList();
        return history;
    }

    public async Task<Guid> Add(MedHistory medHistory)
    {
        var medHistoryEntity = new MedHistoryEntity
        {
            Id = medHistory.Id,
            UserId = medHistory.UserId,
            Title = medHistory.Title,
            Description = medHistory.Description,
            Count = medHistory.Count,
            CountType = medHistory.CountType,
            TakeTime = medHistory.TakeTime
        };
        await _dbContext.MedHistory.AddAsync(medHistoryEntity);
        await _dbContext.SaveChangesAsync();

        return medHistoryEntity.Id;
    }

    public async Task<Guid> Update(Guid id, string title, string description, int count, int countType, List<DateTime> takeTime)
    {
        var medHistoryEntity = await _dbContext.MedHistory
            .Where(b => b.Id == id)
            .ExecuteUpdateAsync(s => s
                .SetProperty(b => b.Title, b => title)
                .SetProperty(b => b.Description, b => description)
                .SetProperty(b => b.Count, b => count)
                .SetProperty(b => b.CountType, b => countType)
                .SetProperty(b => b.TakeTime, b => takeTime));
        return id;
    }

    public async Task<Guid> Delete(Guid id)
    {
        await _dbContext.MedHistory
            .Where(c => c.Id == id)
            .ExecuteDeleteAsync();
        return id;
    }
}
