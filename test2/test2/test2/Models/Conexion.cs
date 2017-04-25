using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Configuration;
namespace test2.Models
{

    public class Conexion
    {
        //SqlConnection con = new SqlConnection("Data Source=DESKTOP-DGU3E63;Initial Catalog=infoTecDB;Persist Security Info=True;User ID=sa;Password=as");//conexcion local
        SqlConnection con = new SqlConnection("Data Source=35.162.182.157;Initial Catalog=infoTec;Persist Security Info=True;User ID=InfoTec;Password=Cmoviles2017");//conexion remota
        SqlCommand comand;
        SqlDataReader reader;
        string consult;

        public List<DTO_Persona> Log(String id, String pass)
        {
            
            con.Open();
            //consult = string.Format("select * from skill where Name ='{0}'", lista[listaIndex].nombre);
            consult = string.Format("select ID,nombre,rol from Persona where ID=@ID and pass=@pass");
            comand = new SqlCommand(consult, con);

            comand.Parameters.Add("@ID", System.Data.SqlDbType.VarChar);

            comand.Parameters["@ID"].Value = id;
            comand.Parameters.Add("@PASS", System.Data.SqlDbType.VarChar);

            comand.Parameters["@PASS"].Value = pass;

            reader = comand.ExecuteReader();

            List<DTO_Persona> lista = new List<DTO_Persona>();
            while (reader.Read())
            {
                DTO_Persona nn = new DTO_Persona();
                nn.ID = reader[0].ToString();
                nn.nombre = reader[1].ToString();
                nn.tipo = reader[2].ToString();
                lista.Add(nn);
            }
            con.Close();
            return lista;
        }
        public String IN(String a1,String a2,String a3,String a4,int a5,int a6,String a7)
        {

            SqlCommand comand;
            string consult;
            try
            {
                

                consult = string.Format("insert into  Persona values (@a1,@a2,@a3,@a4,@a5,@a6,@a7)");//////////////////
                comand = new SqlCommand(consult, con);
                //------------------generico para cualquier consulta


                // Creando los parámetros necesarios
                comand.Parameters.Add("@a1", System.Data.SqlDbType.VarChar);
                comand.Parameters.Add("@a2", System.Data.SqlDbType.VarChar);
                comand.Parameters.Add("@a3", System.Data.SqlDbType.VarChar);
                comand.Parameters.Add("@a4", System.Data.SqlDbType.VarChar);
                comand.Parameters.Add("@a5", System.Data.SqlDbType.Int);
                comand.Parameters.Add("@a6", System.Data.SqlDbType.Int);
                comand.Parameters.Add("@a7", System.Data.SqlDbType.VarChar);
                // Asignando los valores a los atributos
                comand.Parameters["@a1"].Value = a1;
                comand.Parameters["@a2"].Value = a2;
                comand.Parameters["@a3"].Value = a3;
                comand.Parameters["@a4"].Value = a4;
                comand.Parameters["@a5"].Value = a5;
                comand.Parameters["@a6"].Value = a6;
                comand.Parameters["@a7"].Value = a7;


                //-----------------------------------------------
                con.Open();
                comand.ExecuteNonQuery();
                con.Close();
                return "successful";
            }
            catch (Exception ex)
            {
                return ex.Message+"!!!!!";
            }

        }

        public List<DTO_MisMensajes> getOwnMessage(String id)
        {
            
            con.Open();            
            consult = string.Format("exec misMensajes @ID");
            comand = new SqlCommand(consult, con);
            comand.Parameters.Add("@ID", System.Data.SqlDbType.VarChar);
            comand.Parameters["@ID"].Value = id;
            reader = comand.ExecuteReader();
            List<DTO_MisMensajes> lista = new List<DTO_MisMensajes>();
            while (reader.Read())
            {
                DTO_MisMensajes nn = new DTO_MisMensajes();
                nn.titulo = reader[0].ToString();
                nn.descripcion = reader[1].ToString();
                nn.fecha = reader[2].ToString();
                nn.imagen = reader[3].ToString();
                nn.remitente = reader[4].ToString();
                nn.borrable = reader[5].ToString();
                nn.mensaje_ID = reader[6].ToString();
                nn.visto = reader[7].ToString();
                lista.Add(nn);
            }
            con.Close();
            return lista;
        }

        public List<DTO_adminMensajes> AdminM(String remitente)
        {
            
            con.Open();
            consult = string.Format("select * from mensaje where remitente=@remitente");
            comand = new SqlCommand(consult, con);
            comand.Parameters.Add("@remitente", System.Data.SqlDbType.VarChar);
            comand.Parameters["@remitente"].Value = remitente;
            reader = comand.ExecuteReader();
            List<DTO_adminMensajes> lista = new List<DTO_adminMensajes>();
            while (reader.Read())
            {
                DTO_adminMensajes nn = new DTO_adminMensajes();

                nn.mensaje_ID = reader[0].ToString();
                nn.titulo = reader[1].ToString();
                nn.descripcion = reader[2].ToString();
                nn.fecha = reader[3].ToString();
                nn.imagen = reader[4].ToString();                
                lista.Add(nn);
            }
            con.Close();
            return lista;
        }

        public List<DTO_Departamento> getDepartementPerson(string id)
        {
            con.Open();
            consult = string.Format("select d.nombre From Persona as p inner Join Persona_departamentos as Pd on p.ID = Pd.IDPer inner join departamentos as d on Pd.nombreDep = d.nombre where id = @idC");
            comand = new SqlCommand(consult, con);
            comand.Parameters.Add("@idC", System.Data.SqlDbType.Int);
            comand.Parameters["@idC"].Value = id;
            reader = comand.ExecuteReader();
            List<DTO_Departamento> lista = new List<DTO_Departamento>();
            while (reader.Read())
            {
                DTO_Departamento dto = new DTO_Departamento();
                dto.nombre = reader[0].ToString();
                lista.Add(dto);
            }
            con.Close();
            return lista;
        }


        public String insertar(String titulo, String Descripcion, String fecha, String imagen, String remitente, String borrable, string departamento)
        {

            SqlCommand comand;
            string consult;
            try
            {

                consult = string.Format("exec NuevoMensaje @titulo ,@descripcion ,@fecha  ,@imagen ,@remitente,@borrable,@departamento  ");//////////////////
                comand = new SqlCommand(consult, con);
                //------------------generico para cualquier consulta


                // Creando los parámetros necesarios
                comand.Parameters.Add("@titulo", System.Data.SqlDbType.VarChar);
                comand.Parameters.Add("@descripcion", System.Data.SqlDbType.VarChar);
                comand.Parameters.Add("@fecha", System.Data.SqlDbType.VarChar);
                comand.Parameters.Add("@imagen", System.Data.SqlDbType.VarChar);
                comand.Parameters.Add("@remitente", System.Data.SqlDbType.VarChar);
                comand.Parameters.Add("@borrable", System.Data.SqlDbType.VarChar);
                comand.Parameters.Add("@departamento", System.Data.SqlDbType.VarChar);
                // Asignando los valores a los atributos
                comand.Parameters["@titulo"].Value = titulo;
                comand.Parameters["@descripcion"].Value = Descripcion;
                comand.Parameters["@fecha"].Value = fecha;
                comand.Parameters["@imagen"].Value = imagen;
                comand.Parameters["@remitente"].Value = remitente;
                comand.Parameters["@borrable"].Value = borrable;
                comand.Parameters["@departamento"].Value = departamento;


                //-----------------------------------------------
                con.Open();
                comand.ExecuteNonQuery();
                con.Close();
                return "successful";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }

        public String borrarMensaje(int mensajeID, int personaID)
        {

            SqlCommand comand;
            string consult;
            try
            {
                

                consult = string.Format("delete from Mensaje_Persona where ID_m=@ID_m and ID_p = @ID_p");//////////////////
                comand = new SqlCommand(consult, con);
                //------------------generico para cualquier consulta


                // Creando los parámetros necesarios
                comand.Parameters.Add("@ID_m", System.Data.SqlDbType.Int);
                comand.Parameters.Add("@ID_p", System.Data.SqlDbType.Int);

                // Asignando los valores a los atributos
                comand.Parameters["@ID_m"].Value = mensajeID;
                comand.Parameters["@ID_p"].Value = personaID;


                //-----------------------------------------------
                con.Open();
                comand.ExecuteNonQuery();
                con.Close();
                return "succesfull";

            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }
    }
}
//insert into  Mensaje (titulo,Descripcion,fecha,imagen,remitente) values ('Ferias de idea','Los jovenes enprendedores del tec mostaran su ideas en pasillos frente a la bola','2016-10-02','','CA maritza')

/*
 
  SqlConnection connection;
            SqlCommand comand;
            string consult;
            try
            {
                connection = new SqlConnection("Data Source=Jimmy-PC;Initial Catalog=seven_abyssal_lords;User ID=sa;Password=heaven");

                consult = string.Format("delete Caracter where name=@name delete skill where name=@name;");//////////////////
                comand = new SqlCommand(consult, connection);
                //------------------generico para cualquier consulta


                // Creando los parámetros necesarios
                comand.Parameters.Add("@name", System.Data.SqlDbType.VarChar);

                // Asignando los valores a los atributos
                comand.Parameters["@name"].Value = lista[listaIndex].nombre;


                //-----------------------------------------------
                connection.Open();////////////////////////
 
   SqlConnection connection;
            SqlCommand comand;
            string consult;
            try
            {
                connection = new SqlConnection("Data Source=Jimmy-PC;Initial Catalog=seven_abyssal_lords;User ID=sa;Password=heaven");

                consult = string.Format("execute crear @pjindex ,@name  ,@modelindex ,@texindex ");//////////////////
                comand = new SqlCommand(consult, connection);
                //------------------generico para cualquier consulta


                // Creando los parámetros necesarios
                comand.Parameters.Add("@modelindex", System.Data.SqlDbType.Int);
                comand.Parameters.Add("@texindex", System.Data.SqlDbType.Int);
                comand.Parameters.Add("@pjindex", System.Data.SqlDbType.Int);
                comand.Parameters.Add("@name", System.Data.SqlDbType.VarChar);
                // Asignando los valores a los atributos
                comand.Parameters["@modelindex"].Value = modelIndex;
                comand.Parameters["@texindex"].Value = texIndex;
                comand.Parameters["@pjindex"].Value = pjIndex;
                comand.Parameters["@name"].Value = PjName;


                //-----------------------------------------------
                connection.Open();
                comand.ExecuteNonQuery();
                connection.Close();
 
 */