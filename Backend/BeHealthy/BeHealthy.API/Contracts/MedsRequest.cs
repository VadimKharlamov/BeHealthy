using System.ComponentModel.DataAnnotations;

namespace BeHealthy.API.Contracts;

public record MedsRequest(
    [Required] Guid UserId,
    [Required] string Title,
    [Required] string Description,
    [Required] int Count,
    [Required] int TakeType,
    [Required] int CountType,
    [Required] List<DateTime> TakeTime);
