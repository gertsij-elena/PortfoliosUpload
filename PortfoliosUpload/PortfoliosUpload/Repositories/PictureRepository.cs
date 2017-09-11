using System;
using System.Net;
using System.Web.Http;
using System.Data;
using System.Linq;
using PortfoliosUpload.Models;
using PortfoliosUpload.Interfaces;

namespace WebAPI_Angular.Repositories
{
    public class PictureRepository: IDisposable,IPicturesRepository
    {
        private Entities db = new Entities();
        public PictureRepository()
        {
        }

        public PictureRepository(Entities context)
        {
            this.db = context;
        }

        public dynamic GetImagesByUserId(long? id)
        {
            try
            {
                var pictures = this.db.images.Where(p => p.userId == id).Select(im => new { im.imageId,im.imageName});
                return pictures;
            }
            catch
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }
           
        }
        public void AddPicture(images im)
        {
            try
            {
                images image = new images { imageName =im.imageName, userId = im.userId};
                db.images.Add(image);
               
            }
            catch
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }
           
        }
        public void DeleteImage(long? id)
        {
            if (id != null)
            {
                images im = db.images.Find(id);
                if (im != null)
                {
                    db.images.Remove(im);
                }
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