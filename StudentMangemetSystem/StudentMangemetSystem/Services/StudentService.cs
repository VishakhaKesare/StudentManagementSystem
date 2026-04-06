using StudentMangemetSystem.DTOs;
using StudentMangemetSystem.Models;
using StudentMangemetSystem.Repositories.Interface;

namespace StudentMangemetSystem.Services
{
    public class StudentService: IStudentService
    {
        private readonly IStudentRepository _repo;

        public StudentService(IStudentRepository repo)
        {
            _repo = repo;
        }

        public async Task<IEnumerable<Student>> GetAll()
            => await _repo.GetAll();

        public async Task<Student?> Get(int id)
            => await _repo.GetById(id);

        public async Task Add(StudentDto dto)
        {
            var student = new Student
            {
                Name = dto.Name,
                Email = dto.Email,
                Age = dto.Age,
                Course = dto.Course
            };
            await _repo.Add(student);
        }

        public async Task Update(int id, StudentDto dto)
        {
            var student = await _repo.GetById(id);
            if (student == null) throw new Exception("Student not found");

            student.Name = dto.Name;
            student.Email = dto.Email;
            student.Age = dto.Age;
            student.Course = dto.Course;

            await _repo.Update(student);
        }

        public async Task Delete(int id)
            => await _repo.Delete(id);
    }
}

