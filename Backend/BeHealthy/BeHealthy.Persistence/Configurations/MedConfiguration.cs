using BeHealthy.Persistence.Entities;
using BeHealthy.Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BeHealthy.Persistence.Configurations;

public class MedConfiguration : IEntityTypeConfiguration<MedEntity>
{
    public void Configure(EntityTypeBuilder<MedEntity> builder)
    {
        builder.HasKey(x => x.Id);

        builder.Property(b => b.Title)
            .HasMaxLength(Med.MAX_TITLE_LENGTH)
            .IsRequired();
    }
}
