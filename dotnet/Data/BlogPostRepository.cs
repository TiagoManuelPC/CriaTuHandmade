﻿using AutoMapper;
using AutoMapper.QueryableExtensions;
using dotnet.DTOs;
using dotnet.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace dotnet.Data
{
    public class BlogPostRepository : IBlogPostRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public BlogPostRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<BlogPostDTO> GetBlogPostAsync(int id)
        {
            return await _context.BlogPosts
                .Where(x => x.Id == id)
                .ProjectTo<BlogPostDTO>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<BlogPostDTO>> GetBlogPostsAsync()
        {
            return await _context.BlogPosts
                .ProjectTo<BlogPostDTO>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        //public async Task<AppUser> GetUserByIdAsync(int id)
        //{
        //    return await _context.Users.FindAsync(id);
        //}

        //public async Task<AppUser> GetUserByUserameAsync(string username)
        //{
        //    return await _context.Users.Include(p => p.Photos).SingleOrDefaultAsync(x => x.UserName == username);
        //}

        //public async Task<IEnumerable<AppUser>> GetUsersAsync()
        //{
        //    return await _context.Users.Include(p => p.Photos).ToListAsync();
        //}

        //public async Task<bool> SaveAllAsync()
        //{
        //    return await _context.SaveChangesAsync() > 0;
        //}

        //public void Update(AppUser user)
        //{
        //    _context.Entry(user).State = EntityState.Modified;
        //}
    }
}
