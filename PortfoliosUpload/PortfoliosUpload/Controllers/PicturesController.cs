using System;
using System.Web;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using PortfoliosUpload.Models;
using PortfoliosUpload.Interfaces;
using WebAPI_Angular.Repositories;


namespace PortfoliosUpload.Controllers
{
    public class PicturesController : ApiController
    {
        static readonly IPicturesRepository r = new PictureRepository();
        // GET: api/Pictures/5
        [HttpGet]
        [ActionName("GetPicturesByUserId")]
        public dynamic GetPicturesByUserId(long? id)
        {
            return r.GetImagesByUserId(id);
        }
       
        //UploadPicture
        [HttpPost]
        [ActionName("UploadPicture")]
        public string UploadPicture()
        {
            string path = HttpContext.Current.Server.MapPath("~/Pictures/");

            var files = HttpContext.Current.Request.Files;

            if (files.Count > 0)
            {
                HttpPostedFile file = files[0];
                string fileName = new FileInfo(file.FileName).Name;
                if (file.ContentLength > 0)
                {
                   
                    Random r = new Random();
                    var filePath = Path.GetFileName((r.Next(1,100)).ToString() + "_" + fileName);

                    if (!File.Exists(path + filePath))
                    {

                        file.SaveAs(path + filePath);
                        return filePath;
                    }
                    return null;
                }               
            }                     
            return null;
        }
        //PostToDb Picture
        [HttpPost]
        [ActionName("PostToDb")]
        public images PostToDb(images im)
        {
            if (im == null)
            {
                throw new ArgumentNullException("null");
            }

            images image= new images{ imageName = im.imageName, userId =im.userId };
            r.AddPicture(image);
            r.Save();
            return image;
        }
       
        // DELETE: api/Picture/5
        [HttpDelete]
        [ActionName("DeletePicture")]
        public HttpResponseMessage DeletePicture(long? id)
        {
            if (id != null)
            {
                r.DeleteImage(id);
                r.Save();
            }
          
            var response = new HttpResponseMessage(HttpStatusCode.OK);
            return response;
        }
    }
}
