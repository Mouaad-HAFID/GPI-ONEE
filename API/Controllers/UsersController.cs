using API.Data;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class UsersController : BaseApiController
    {
        private readonly IUserRepository _userRepository;

        public UsersController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
        {
            return Ok(await _userRepository.GetUsersAsync());
        }

        // [HttpGet("{id}")]
        // public async Task<ActionResult<AppUser>> GetUserById(int id)
        // {
        //     return await _UserRepository.GetUserbyIdAsync(id);
        // }

        [HttpGet("{username}")]
        public async Task<ActionResult<AppUser>> GetUserByUsername(string username)
        {
            return await _userRepository.GetUserbyUsernameAsync(username);
        }
    }
}