using dotnet.DTOs;
using Microsoft.EntityFrameworkCore;

namespace dotnet.Interfaces
{
    public interface IBlogPostRepository
    {
        Task<BlogPostDTO> GetBlogPostAsync(int id);

        Task<IEnumerable<BlogPostDTO>> GetBlogPostsAsync();
    }
}
