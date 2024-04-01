using BeHeathy.Application;
using BeHealthy.Core.Models;
using BeHealthy.Core;
using BeHealthy.Application.Interfaces;

namespace BeHealthy.Application.Services;

public class UserService : IUserService
{
    private readonly IPasswordHasher _passwordHasher;
    private readonly IUsersRepository _usersRepository;
    private readonly IJwtProvider _jwtProvider;
    public UserService(
        IUsersRepository usersRepository,
        IPasswordHasher passwordHasher,
        IJwtProvider jwtProvider)
    {
        _passwordHasher = passwordHasher;
        _usersRepository = usersRepository;
        _jwtProvider = jwtProvider;
    }
    public async Task<bool> Register(string userName, string email, string password)
    {
        bool isNew = await _usersRepository.isNewUser(email);

        if (isNew)
        {
            var hashedPassword = _passwordHasher.Generate(password);

            var user = User.Create(Guid.NewGuid(), userName, hashedPassword, email);

            await _usersRepository.Add(user);

            return true;
        } else
        {
            return false;
        }
    }

    public async Task<string> Login(string email, string password)
    {
        try
        {
            var user = await _usersRepository.GetByEmail(email);

            var result = _passwordHasher.Verify(password, user.PasswordHash);
            if (result)
            {
                var token = _jwtProvider.Generate(user);
                return token;
            } else
            {
                return "NoUser";
            }


        } catch (Exception ex)
        {
            return "NoUser";
        }
        
    }

}
