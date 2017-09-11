using System.Collections.Generic;
using PortfoliosUpload.Models;


namespace PortfoliosUpload.Interfaces
{
    public interface IUserRepository
    {
        IEnumerable<dynamic> GetAllUsers();      
       
        void AddUser(users u);
      
        void Save();
    }
}