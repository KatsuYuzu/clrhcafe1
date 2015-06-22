using System.Web.Mvc;

namespace ClrhCafe1.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public string Test()
        {
            System.Threading.Thread.Sleep(2000);
            return "hello world";
        }
    }
}