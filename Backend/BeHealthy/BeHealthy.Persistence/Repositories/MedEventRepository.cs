using BeHealthy.Persistence.Entities;
using BeHealthy.Core.Models;
using BeHealthy.Core;
using Microsoft.EntityFrameworkCore;

namespace BeHealthy.Persistence.Repositories;

public class MedEventRepository : IMedEventRepository
{
    private readonly HealthyDbContext _dbContext;

    public MedEventRepository(HealthyDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<List<MedEvent>> Get(Guid userId)
    {
        var medsEventEntities = await _dbContext.MedEvents
            .AsNoTracking()
            .ToListAsync();
        var medEvents = medsEventEntities
            .Where(b => b.UserId == userId)
            .Select(b => MedEvent.Create(b.Id, b.UserId, b.HistoryId, b.Title, b.Description, b.VisitTime, b.Direction,
            b.DoctorName, b.DoctorPhone, b.ClinicName, b.ClinicPhone, b.Address).medEvent)
            .ToList();
        return medEvents;
    }

    public async Task<Guid> Add(MedEvent medEvent)
    {
        var medEventEntity = new MedEventEntity
        {
            Id = medEvent.Id,
            UserId = medEvent.UserId,
            HistoryId = medEvent.HistoryId,
            Title = medEvent.Title,
            Description = medEvent.Description,
            VisitTime = medEvent.VisitTime,
            Direction = medEvent.Direction,
            DoctorName = medEvent.DoctorName,
            DoctorPhone = medEvent.DoctorPhone,
            ClinicName = medEvent.ClinicName,
            ClinicPhone = medEvent.ClinicPhone,
            Address = medEvent.Address
        };
        await _dbContext.MedEvents.AddAsync(medEventEntity);
        await _dbContext.SaveChangesAsync();

        return medEventEntity.Id;
    }

    public async Task<Guid> Update(Guid id, string title, string description,
        DateTime visitTime, string direction, string doctorName,
        string doctorPhone, string clinicName, string clinicPhone, string address)
    {
        var medEventEntity = await _dbContext.MedEvents
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
        await _dbContext.MedEvents
            .Where(c => c.Id == id)
            .ExecuteDeleteAsync();
        return id;
    }
}
