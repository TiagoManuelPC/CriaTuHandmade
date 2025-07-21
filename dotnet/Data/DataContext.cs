using AutoMapper;
using dotnet.DTOs;
using dotnet.Entities;
using Microsoft.EntityFrameworkCore;

namespace dotnet.Data
{
    public class DataContext : DbContext
    {
        private readonly IMapper _mapper; // Add a field for IMapper

        public DataContext(DbContextOptions options, IMapper mapper) : base(options)
        {
            _mapper = mapper; // Initialize the IMapper instance
        }

        public DbSet<BlogPostModel> BlogPosts { get; set; }

        // Mapping configuration should not be in the DbContext class.
        // Move it to a separate AutoMapper profile class.
    }

    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<BlogPostModel, BlogPostDTO>();
            CreateMap<BlogPostDTO, BlogPostModel>();
        }
    }
}