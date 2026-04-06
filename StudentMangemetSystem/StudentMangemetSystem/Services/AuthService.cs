using StudentMangemetSystem.Models;
using StudentMangemetSystem.Repositories.Interface;

namespace StudentMangemetSystem.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _repo;

        public AuthService(IUserRepository repo)
        {
            _repo = repo;
        }

        public User ValidateUser(string username, string password)
        {
            return _repo.GetUser(username, password);
        }
    }
}
