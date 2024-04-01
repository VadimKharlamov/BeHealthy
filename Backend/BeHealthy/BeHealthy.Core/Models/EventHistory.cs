namespace BeHealthy.Core.Models;

public class EventHistory
{
    private EventHistory(Guid id, Guid userId, string title, string description,
        DateTime visitTime, string direction, string doctorName,
        string doctorPhone, string clinicName, string clinicPhone, string address)
    {
        Id = id;
        UserId = userId;
        Title = title;
        Description = description;
        VisitTime = visitTime;
        Direction = direction;
        DoctorName = doctorName;
        DoctorPhone = doctorPhone;
        ClinicName = clinicName;
        ClinicPhone = clinicPhone;
        Address = address;
    }

    public Guid Id { get; private set; }

    public Guid UserId { get; private set; }

    public string Title { get; private set; } = string.Empty;

    public string Description { get; private set; } = string.Empty;

    public DateTime VisitTime { get; private set; } = new DateTime();

    public string Direction { get; private set; } = string.Empty;

    public string DoctorName { get; private set; } = string.Empty;

    public string DoctorPhone { get; private set; } = string.Empty;

    public string ClinicName { get; private set; } = string.Empty;

    public string ClinicPhone { get; private set; } = string.Empty;

    public string Address { get; private set; } = string.Empty;

    public static (EventHistory eventHistory, string Error) Create(Guid id, Guid userId, string title, string description,
        DateTime visitTime, string direction, string doctorName,
        string doctorPhone, string clinicName, string clinicPhone, string address)
    {
        var error = string.Empty;

        if (string.IsNullOrEmpty(title) || title.Length > 50)
        {
            error = "Title can not be empty or longer than 50 symbols";
        }
        var eventHistory = new EventHistory(id, userId, title, description, visitTime, direction, doctorName, doctorPhone, clinicName, clinicPhone, address);
        return (eventHistory, error);
    }
}
