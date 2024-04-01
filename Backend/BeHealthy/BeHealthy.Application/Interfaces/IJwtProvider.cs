using BeHealthy.Core.Models;

namespace BeHealthy.Application.Interfaces;
public interface IJwtProvider
{
    string Generate(User user);
}