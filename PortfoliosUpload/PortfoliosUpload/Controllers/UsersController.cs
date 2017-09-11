using System;
using System.Web.Http;
using PortfoliosUpload.Models;
using PortfoliosUpload.Interfaces;
using PortfoliosUpload.Repositories;

namespace PortfoliosUpload.Controllers
{
    public class UsersController : ApiController
    {
        static readonly IUserRepository rep = new UserRepository();
        
        // GET: api/Users
        [HttpGet]
        [ActionName("GetAllUsers")]
        public dynamic GetAllUsers()
        {           
            return rep.GetAllUsers();
        }

        //Post:api/User
        [HttpPost]
        [ActionName("PostUser")]
        public users PostUser(users user)
        {
            if (user == null)
            {
                throw new ArgumentNullException("item");
            }

            rep.AddUser(user);
            rep.Save();

            return user;
        }
    }
}
