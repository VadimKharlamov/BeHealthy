using BeHealthy.Persistence.Entities;
using BeHealthy.Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BeHealthy.Persistence.Configurations;

public class MedEventConfiguration : IEntityTypeConfiguration<MedEventEntity>
{
    public void Configure(EntityTypeBuilder<MedEventEntity> builder)
    {
        builder.HasKey(x => x.Id);

        builder.Property(b => b.Title)
            .IsRequired();
    }
}
