using PortfoliosUpload.Models;


namespace PortfoliosUpload.Interfaces
{
    public interface IPicturesRepository
    {             
        dynamic GetImagesByUserId(long? id);
        void AddPicture(images i);
        void DeleteImage(long? id);
        void Save();
    }
}