namespace BeHealthy.Persistence.Entities;
public class EventHistoryEntity
{
    public Guid Id { get; set; }

    public Guid UserId { get; set; }

    public string Title { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public DateTime VisitTime { get; set; } = new DateTime();

    public string Direction { get; set; } = string.Empty;

    public string DoctorName { get; set; } = string.Empty;

    public string DoctorPhone { get; set; } = string.Empty;

    public string ClinicName { get; set; } = string.Empty;

    public string ClinicPhone { get; set; } = string.Empty;

    public string Address { get; set; } = string.Empty;
}
