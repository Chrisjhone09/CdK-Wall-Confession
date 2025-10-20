using Back.DTOs;
using Back.Model;
using Microsoft.AspNetCore.SignalR;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace Back.SignalR
{
    public class FreedomWallPost : Hub
    {
        public async Task PostToWall(PostDTO post) =>
            await Clients.All.SendAsync("newPost", post);
    }
}
