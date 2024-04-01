using BeHealthy.Persistence.Entities;
using BeHealthy.Core.Models;
using BeHealthy.Core;
using Microsoft.EntityFrameworkCore;

namespace BeHealthy.Persistence.Repositories;

public class EventHistoryRepository : IEventHistoryRepository
{
    private readonly HealthyDbContext _dbContext;

    public EventHistoryRepository(HealthyDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<List<EventHistory>> Get(Guid userId)
    {
        var eventHistoryEntities = await _dbContext.EventHistory
            .AsNoTracking()
            .ToListAsync();
        var eventHistory = eventHistoryEntities
            .Where(b => b.UserId == userId)
            .Select(b => EventHistory.Create(b.Id, b.UserId, b.Title, b.Description, b.VisitTime, b.Direction,
            b.DoctorName, b.DoctorPhone, b.ClinicName, b.ClinicPhone, b.Address).eventHistory) 
            .ToList();
        return eventHistory;
    }

    public async Task<Guid> Add(EventHistory eventHistory)
    {
        var eventHistoryEntity = new EventHistoryEntity
        {
            Id = eventHistory.Id,
            UserId = eventHistory.UserId,
            Title = eventHistory.Title,
            Description = eventHistory.Description,
            VisitTime = eventHistory.VisitTime,
            Direction = eventHistory.Direction,
            DoctorName = eventHistory.DoctorName,
            DoctorPhone = eventHistory.DoctorPhone,
            ClinicName = eventHistory.ClinicName,
            ClinicPhone = eventHistory.ClinicPhone,
            Address = eventHistory.Address
        };
        await _dbContext.EventHistory.AddAsync(eventHistoryEntity);
        await _dbContext.SaveChangesAsync();

        return eventHistoryEntity.Id;
    }

    public async Task<Guid> Update(Guid id, string title, string description,
        DateTime visitTime, string direction, string doctorName,
        string doctorPhone, string clinicName, string clinicPhone, string address) 
    {
        var eventHistoryEntity = await _dbContext.EventHistory
            .Where(b => b.Id == id)
            .ExecuteUpdateAsync(s => s
                .SetProperty(b => b.Title, b => title)
                .SetProperty(b => b.Description, b => description)
                .SetProperty(b => b.VisitTime, b => visitTime)
                .SetProperty(b => b.Direction, b => direction)
                .SetProperty(b => b.DoctorName, b => doctorName)
                .SetProperty(b => b.DoctorPhone, b => doctorPhone)
                .SetProperty(b => b.ClinicName, b => clinicName)
                .SetProperty(b => b.ClinicPhone, b => clinicPhone)
                .SetProperty(b => b.Address, b => address));
        return id;
    }

    public async Task<Guid> Delete(Guid id)
    {
        await _dbContext.EventHistory
            .Where(c => c.Id == id)
            .ExecuteDeleteAsync();
        return id;
    }
}
