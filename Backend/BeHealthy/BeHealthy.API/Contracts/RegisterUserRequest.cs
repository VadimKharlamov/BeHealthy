using System.ComponentModel.DataAnnotations;

namespace BeHealthy.API.Contracts;

public record RegisterUserRequest(
    [Required] string UserName,
    [Required] string Email,
    [Required] string Password);
