using StudentMangemetSystem.Models;

namespace StudentMangemetSystem.Repositories.Interface
{
    public interface IUserRepository
    {
        User GetUser(string username, string password);
    
     }
}
