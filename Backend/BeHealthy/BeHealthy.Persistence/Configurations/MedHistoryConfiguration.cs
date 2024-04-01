using BeHealthy.Persistence.Entities;
using BeHealthy.Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BeHealthy.Persistence.Configurations;

public class MedHistoryConfiguration : IEntityTypeConfiguration<MedHistoryEntity>
{
    public void Configure(EntityTypeBuilder<MedHistoryEntity> builder)
    {
        builder.HasKey(x => x.Id);

        builder.Property(b => b.Title)
            .HasMaxLength(50)
            .IsRequired();
    }
}
