using System.ComponentModel.DataAnnotations;

namespace BeHealthy.API.Contracts;

public record MedHistoryRequest(
    [Required] Guid Id,
    [Required] Guid UserId,
    [Required] string Title,
    [Required] string Description,
    [Required] int Count,
    [Required] int CountType,
    [Required] List<DateTime> TakeTime);
