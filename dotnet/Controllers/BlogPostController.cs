using dotnet.Data;
using dotnet.DTOs;
using dotnet.Entities;
using dotnet.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;
using System.Text;

namespace dotnet.Controllers;

[ApiController]
[Route("[controller]")]
public class BlogPostController : BaseApiController
{
    private readonly DataContext _context;
    private readonly IBlogPostRepository _blogPostRepository;


    public BlogPostController(DataContext context, IBlogPostRepository blogPostRepository)
    {
        _context = context;
        _blogPostRepository = blogPostRepository;
    }

    [HttpPost("createPost")]
    public async Task<ActionResult<BlogPostDTO>> CreatePost(BlogPostDTO postDto)
    {
        var post = new BlogPostModel
        {
            Title = postDto.Title,
            Content = postDto.Content,
            CreatedAt = DateTime.UtcNow,
        };

        _context.BlogPosts.Add(post);

        await _context.SaveChangesAsync();

        return postDto;
    }

    [HttpGet("getBlogPosts")]
    public async Task<ActionResult<IEnumerable<BlogPostDTO>>> GetBlogPosts()
    {
        var users = await _blogPostRepository.GetBlogPostsAsync();
        return Ok(users);
    }


}
