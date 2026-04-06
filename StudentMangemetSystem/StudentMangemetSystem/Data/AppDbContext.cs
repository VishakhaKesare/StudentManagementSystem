using Microsoft.EntityFrameworkCore;
using StudentMangemetSystem.Models;

namespace StudentMangemetSystem.Data
{
    public class AppDbContext: DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Student> Students { get; set; }
        public DbSet<User> Users { get; set; }
    }
}
