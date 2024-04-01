using BeHealthy.Persistence.Entities;
using BeHealthy.Core.Models;
using BeHealthy.Core;
using Microsoft.EntityFrameworkCore;
namespace BeHealthy.Persistence.Repositories;

public class UsersRepository : IUsersRepository
{
    private readonly HealthyDbContext _context;

    public UsersRepository(HealthyDbContext context)
    {
        _context = context;
    }

    public async Task Add(User user)
    {
        var userEntity = new UserEntity()
        {
            Id = user.Id,
            UserName = user.UserName,
            PasswordHash = user.PasswordHash,
            Email = user.Email
        };

        await _context.Users.AddAsync(userEntity);
        await _context.SaveChangesAsync();
    }

    public async Task<User> GetByEmail(string email)
    {
        var userEntity = await _context.Users
            .AsNoTracking()
            .FirstOrDefaultAsync(u => u.Email == email) ?? throw new Exception();

        var user = User.Create(userEntity.Id, userEntity.UserName, userEntity.PasswordHash, userEntity.Email);
        return user;
    }

    public async Task<bool> isNewUser(string email)
    {
        Console.WriteLine(email);
        Console.WriteLine(_context.Users);
        bool userExists = await _context.Users.AsNoTracking().AnyAsync(u => u.Email == email);
        return !userExists;
    }
}