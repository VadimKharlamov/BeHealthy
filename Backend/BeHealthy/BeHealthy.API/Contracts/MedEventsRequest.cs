using System.ComponentModel.DataAnnotations;

namespace BeHealthy.API.Contracts;

public record MedEventsRequest(
    [Required] Guid UserId,
    [Required] string Title,
    [Required] string Description,
    [Required] DateTime VisitTime,
    [Required] string Direction,
    [Required] string DoctorName,
    [Required] string DoctorPhone,
    [Required] string ClinicName,
    [Required] string ClinicPhone,
    [Required] string Address);
