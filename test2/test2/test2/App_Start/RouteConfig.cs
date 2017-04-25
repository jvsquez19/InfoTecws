using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace test2
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            


            routes.MapRoute(
                "logRr",
                "log/{id}/{pass}",
                new
                {
                    controller = "Test",
                    action = "Log",
                }
            );
            
            routes.MapRoute(
                "gomR",
                "getOwnMessage/{id}",
                new
                {
                    controller = "Test",
                    action = "getOwnMessage",
                }
            );
            routes.MapRoute(
                "insertR",
                "nuevoMensaje",
                new
                {
                    controller = "Test",
                    action = "nuevoMensaje",
                }
            );
            routes.MapRoute(
                "AdmiM",
                "AdminMensaje",
                new
                {
                    controller = "Test",
                    action = "AdminM",
                }
            );
            routes.MapRoute(
                "IN",
                "IN",
                new
                {
                    controller = "Test",
                    action = "IN",
                }
            );
            routes.MapRoute(
                "DeleteownMessajeR",
                "delleteownmensaje/{id_m}/{id_p}",
                new
                {
                    controller = "Test",
                    action = "DelOwnM",
                }
            );

            routes.MapRoute(
                "getDepartementPerson",
                "getDepartementPerson/{id}",
                new
                {
                    controller = "Test",
                    action = "getDepartementPerson"
                }

            );

            routes.MapRoute(//no mover de aqui
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );

        }
    }
}