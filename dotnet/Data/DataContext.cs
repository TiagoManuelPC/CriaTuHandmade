using dotnet.Entities;
using Microsoft.EntityFrameworkCore;

namespace dotnet.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
            
        }

        public DbSet<BlogPostModel> BlogPosts { get; set; }
    }
}