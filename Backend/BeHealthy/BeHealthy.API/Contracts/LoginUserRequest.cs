using System.ComponentModel.DataAnnotations;

namespace BeHealthy.API.Contracts;

public record LoginUserRequest(
    [Required] string Email,
    [Required] string Password);
