using System;
using System.Net;
using System.Web.Http;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using PortfoliosUpload.Models;
using PortfoliosUpload.Interfaces;

namespace PortfoliosUpload.Repositories
{
    public class UserRepository:IDisposable,IUserRepository
    {
        private Entities db = new Entities();
        public UserRepository()
        {}
        public UserRepository(Entities context)
        {
            this.db = context;
        }

        public IEnumerable<dynamic> GetAllUsers()
        {
            try
            {
                var users = db.users.Include(u => u.images).Select(u => new { u.userId, u.userName, u.userPhone, u.Pictures.Count });
                return users;
            }
            catch
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }
        }

        public  void AddUser(users u)
        {
            try
            {
                this.db.users.Add(u);
            }
            catch (Exception e)
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }

        }

        public void Save()
        {
            try
            {
                db.SaveChanges();
            }
            catch
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }
        }

        public void Dispose()
        {
            throw new NotImplementedException();
        }

        void IDisposable.Dispose()
        {
            throw new NotImplementedException();
        }
    }
}