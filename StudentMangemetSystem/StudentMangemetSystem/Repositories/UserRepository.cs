using StudentMangemetSystem.Data;
using StudentMangemetSystem.Models;
using StudentMangemetSystem.Repositories.Interface;

namespace StudentMangemetSystem.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _context;

        public UserRepository(AppDbContext context)
        {
            _context = context;
        }

        public User GetUser(string username, string password)
        {
            return _context.Users
                .FirstOrDefault(x => x.Username == username && x.Password == password);
        }
    }
}
