using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Back.Data;
using Back.Model;
using Back.DTOs;

namespace Back.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PostsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Posts
        [HttpGet("get-posts")]
        public async Task<ActionResult<IEnumerable<Post>>> GetPosts()
        {
            var posts = _context.Posts.OrderByDescending(p => p.DatePosted).Select(p => new Post
            {
                PostId = p.PostId,
                Sender = p.Sender,
                Text = p.Text,
                DatePosted = p.DatePosted
            }).ToList();

            return Ok(posts);
        }

        
        // POST: api/Posts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("upload-post")]
        public async Task<ActionResult<Post>> UploadPost([FromBody]PostDTO post)
        {
            Random rand = new Random();
            var now = DateTime.Now;
            Post p = new Post
            {
                DatePosted = DateTime.Now,
                Text = post.Text,
                PostId = Guid.NewGuid(),
                Sender = post.Sender == string.Empty ? $"Anonymous{rand.Next(10000, 99999)}" : post.Sender
            };
            _context.Posts.Add(p);
            await _context.SaveChangesAsync();

            return Ok();
        }

       
    }
}
