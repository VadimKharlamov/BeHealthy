using BeHealthy.Persistence.Configurations;
using BeHealthy.Persistence.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace BeHealthy.Persistence;

public class HealthyDbContext(DbContextOptions<HealthyDbContext> options)
    : DbContext(options)
{
    public DbSet<MedEntity> Meds { get; set; }

    public DbSet<UserEntity> Users { get; set; }

    public DbSet<MedEventEntity> MedEvents { get; set; }

    public DbSet<MedHistoryEntity> MedHistory { get; set; }

    public DbSet<EventHistoryEntity> EventHistory { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfiguration(new MedConfiguration());
        modelBuilder.ApplyConfiguration(new UserConfiguration());
        modelBuilder.ApplyConfiguration(new MedEventConfiguration());
        modelBuilder.ApplyConfiguration(new MedHistoryConfiguration());
        modelBuilder.ApplyConfiguration(new EventHistoryConfiguration());

        base.OnModelCreating(modelBuilder);
    }
}
