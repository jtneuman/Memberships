﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity; // Needed for HttpContext Identity
using Memberships.Extensions; // Needed for the extension methods.

namespace Memberships.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            var userId = Request.IsAuthenticated ? HttpContext.User.Identity.GetUserId() : null;
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}