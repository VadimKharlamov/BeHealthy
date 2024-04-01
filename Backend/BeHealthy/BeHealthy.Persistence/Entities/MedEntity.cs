namespace BeHealthy.Persistence.Entities;
public class MedEntity
{
    public Guid Id { get; set; }

    public Guid UserId { get; set; }

    public Guid HistoryId { get; set; }

    public string Title { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public int Count { get; set; } = 0;

    public int TakeType { get; set; } = 0;

    public int CountType { get; set; } = 0;

    public List<DateTime> TakeTime { get; set; } = new List<DateTime>();
}
