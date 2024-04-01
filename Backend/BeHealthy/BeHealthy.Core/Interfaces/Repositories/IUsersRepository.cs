using BeHealthy.Core.Models;

namespace BeHealthy.Core;

public interface IUsersRepository
{
    Task Add(User user);
    Task<User> GetByEmail(string email);

    Task<bool> isNewUser(string email);
}