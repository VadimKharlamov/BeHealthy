namespace BeHealthy.API.Contracts;

public record MedEventResponse(
    Guid Id,
    Guid UserId,
    Guid HistoryId,
    string Title,
    string Description,
    DateTime VisitTime,
    string Direction,
    string DoctorName,
    string DoctorPhone,
    string ClinicName,
    string ClinicPhone,
    string Address);
