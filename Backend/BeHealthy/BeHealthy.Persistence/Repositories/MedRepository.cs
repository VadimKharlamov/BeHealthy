using BeHealthy.Persistence.Entities;
using BeHealthy.Core.Models;
using BeHealthy.Core;
using Microsoft.EntityFrameworkCore;

namespace BeHealthy.Persistence.Repositories;

public class MedRepository : IMedRepository
{
    private readonly HealthyDbContext _dbContext;

    public MedRepository(HealthyDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<List<Med>> Get(Guid userId)
    {
        var medsEntities = await _dbContext.Meds
            .AsNoTracking()
            .ToListAsync();
        var meds = medsEntities
            .Where(b => b.UserId == userId)
            .Select(b => Med.Create(b.Id, b.UserId, b.HistoryId, b.Title, b.Description, b.Count, b.TakeType, b.CountType, b.TakeTime).med)
            .ToList();
        return meds;
    }

    public async Task<MedEntity?> GetById(Guid id) 
    {
        return await _dbContext.Meds
            .AsNoTracking()
            .FirstOrDefaultAsync(c => c.Id == id);
    }

    public async Task<List<MedEntity>> GetByFilter(string title, int count) 
    {
        var query = _dbContext.Meds.AsNoTracking();

        if (!string.IsNullOrEmpty(title))
        {
            query = query.Where(c => c.Title.Contains(title));
        }

        if (count > 0)
        {
            query = query.Where(c => c.Count > count);
        }

        return await query.ToListAsync();

    }

    public async Task<List<MedEntity>> GetByPage(int page, int pageSize)
    {
        return await _dbContext.Meds
            .AsNoTracking()
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();
    }

    public async Task<Guid> Add(Med med) 
    {
        var medEntity = new MedEntity
        {
            Id = med.Id,
            UserId = med.UserId,
            HistoryId = med.HistoryId,
            Title = med.Title,
            Description = med.Description,
            Count = med.Count,
            TakeType = med.TakeType,
            CountType = med.CountType,
            TakeTime = med.TakeTime
        };
        await _dbContext.Meds.AddAsync(medEntity);
        await _dbContext.SaveChangesAsync();

        return medEntity.Id;
    }

    public async Task<Guid> Update(Guid id, string title, string description, int count, int takeType, int countType, List<DateTime> takeTime)
    {
        var medEntity = await _dbContext.Meds
            .Where(b => b.Id == id)
            .ExecuteUpdateAsync(s => s
                .SetProperty(b => b.Title, b => title)
                .SetProperty(b => b.Description, b => description)
                .SetProperty(b => b.Count, b => count)
                .SetProperty(b => b.TakeType, b => takeType)
                .SetProperty(b => b.CountType, b => countType)
                .SetProperty(b => b.TakeTime, b => takeTime));
        return id;
    }

    public async Task<Guid> Delete(Guid id)
    {
        await _dbContext.Meds
            .Where(c => c.Id == id)
            .ExecuteDeleteAsync();
        return id;
    }
}
