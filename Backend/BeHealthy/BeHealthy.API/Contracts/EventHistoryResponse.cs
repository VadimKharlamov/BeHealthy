namespace BeHealthy.API.Contracts;

public record EventHistoryResponse(
    Guid Id,
    Guid UserId,
    string Title,
    string Description,
    DateTime VisitTime,
    string Direction,
    string DoctorName,
    string DoctorPhone,
    string ClinicName,
    string ClinicPhone,
    string Address);
