namespace BeHealthy.Persistence.Entities;
public class MedHistoryEntity
{
    public Guid Id { get; set; }

    public Guid UserId { get; set; }

    public string Title { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public int Count { get; set; } = 0;

    public int CountType { get; set; } = 0;

    public List<DateTime> TakeTime { get; set; } = new List<DateTime>();
}
