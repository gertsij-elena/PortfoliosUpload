using System.Web.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Data.Entity;
using PortfoliosUpload.Models;


namespace PortfoliosUpload.Controllers
{
    public class HomeController : Controller
    {
        
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";

            return View();
        }
       
    }
}
