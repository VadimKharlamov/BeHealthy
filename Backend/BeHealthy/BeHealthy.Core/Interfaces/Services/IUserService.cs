namespace BeHealthy.Core;

public interface IUserService
{
    Task<string> Login(string email, string password);
    Task<bool> Register(string userName, string email, string password);
}
