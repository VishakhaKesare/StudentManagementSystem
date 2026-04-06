using StudentMangemetSystem.DTOs;
using StudentMangemetSystem.Models;

namespace StudentMangemetSystem.Services
{
    public interface IStudentService
    {
        Task<IEnumerable<Student>> GetAll();
        Task<Student?> Get(int id);
        Task Add(StudentDto dto);
        Task Update(int id, StudentDto dto);
        Task Delete(int id);
    }
}
