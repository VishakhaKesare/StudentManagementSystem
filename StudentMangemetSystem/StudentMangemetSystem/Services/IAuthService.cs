using StudentMangemetSystem.Models;

namespace StudentMangemetSystem.Services
{
    public interface IAuthService
    {
        User ValidateUser(string username, string password);
    }
}
