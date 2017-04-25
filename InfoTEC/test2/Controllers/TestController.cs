using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using test2.Models;

namespace test2.Controllers
{
    public class TestController : Controller
    {
        //
        // GET: /Test/
        public Conexion conexion = new Conexion();
      

        public JsonResult Log(String id, String pass)
        {
            switch (Request.HttpMethod)
            {
                /* case "POST":
                     return Json(productosManager.InsertarCliente(item));
                 case "PUT":
                     return Json(productosManager.ActualizarCliente(item));*/
                case "GET":
                    return Json(conexion.Log(id,pass),
                                JsonRequestBehavior.AllowGet);
                /* case "DELETE":
                     return Json(productosManager.EliminarCliente(id.GetValueOrDefault()));*/
            }

            return Json(new { Error = true, Message = "Operación HTTP desconocida" });
        }
        public JsonResult getOwnMessage(String id)
        {
            switch (Request.HttpMethod)
            {
             
                case "GET":
                    return Json(conexion.getOwnMessage(id),
                                JsonRequestBehavior.AllowGet);
            }

            return Json(new { Error = true, Message = "Operación HTTP desconocida" });
        }
        public JsonResult AdminM(String remitente)
        {
            switch (Request.HttpMethod)
            {
             
                case "GET":
                    return Json(conexion.AdminM(remitente),
                                JsonRequestBehavior.AllowGet);
            }

            return Json(new { Error = true, Message = "Operación HTTP desconocida" });
        }
        public JsonResult IN(String a1,String a2,String a3,String a4,int a5,int a6,String a7)
        {
            switch (Request.HttpMethod)
            {

                case "GET":
                    return Json(conexion.IN(a1,a2,a3,a4,a5,a6,a7),
                                JsonRequestBehavior.AllowGet);
            }

            return Json(new { Error = true, Message = "Operación HTTP desconocida" });
        }
        
        public JsonResult nuevoMensaje(String titulo, String Descripcion, String fecha, string imagen, String remitente, String borrable, string departamento)
        {

              return Json(
                    conexion.insertar(titulo, Descripcion, fecha, imagen, remitente, borrable, departamento)
                      ,JsonRequestBehavior.AllowGet);  
            
        }
        public JsonResult DelOwnM(int id_m,int id_p)
        {

            return Json(
                  conexion.borrarMensaje(id_m,id_p)
                    , JsonRequestBehavior.AllowGet);

        }
    }
}
