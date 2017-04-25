var userName = "";
var listaCarreras = ["Computacion", "Direccion_sede"];//, "Agronomia", "Administracion", "Electronica"];

function loginDinamico(mensaje) {

    var client = new XMLHttpRequest();
    client.open('GET', '/infoTec/js/Login.html');
    client.onreadystatechange = function () {
        document.getElementById('MainDiv').innerHTML = client.responseText;
        document.getElementById("mensajeLogin").innerHTML = "" + mensaje;
    }
    client.send();
}
function CPasswordDinamico() {
    var client = new XMLHttpRequest();
    client.open('GET', '/infoTec/js/ChangePass.html');
    client.onreadystatechange = function () {
        
        document.getElementById('MainDiv').innerHTML = client.responseText;
        document.getElementById("UserName").innerHTML = userName; //nombre del usuario                                        
    }
    client.send();
}
function AdministrarDinamico() {

    var client = new XMLHttpRequest();
    client.open('GET', '/infoTec/js/AdministrarMensajes.html');
    client.onreadystatechange = function () {
        document.getElementById('MainDiv').innerHTML = client.responseText;
        cambiarLoad();
        document.getElementById("UserName").innerHTML = userName; //nombre del usuario                                        
    }
    client.send();
}

function EnviarMensajeDinamico() {
    
    var client = new XMLHttpRequest();
    client.open('GET', '/infoTec/js/EnviarMensaje.html');
    client.onreadystatechange = function () {
        document.getElementById('MainDiv').innerHTML = client.responseText;

        $("#Direccion_sede").bootstrapSwitch();//debe ser dinamico
        $("#Computacion").bootstrapSwitch();
        $("#switch-offColor").bootstrapSwitch();
        $("#datepicker").datepicker();
        document.getElementById("UserName").innerHTML =userName; //nombre del usuario                                        
    }
    client.send();
}
// funcion que se encarga de mostrar mensaje de error en caso de que se incumpla con el llenado de algun campo de texto
function MensajeErrorEnviar(mensaje) {
    document.getElementById("mensajeErrorEnviar").innerHTML = mensaje;
}
function MensajeDinamico(mensaje, Enviante) {
    
    document.getElementById("send").innerHTML = '<div id="topmenu"><h3>' + mensaje + '</h3><div>'    
    + ' <input id="continuar" type="button" onclick="EnviarMensajeDinamico()" class="btn btn-primary btn-block btn-large" value="Continuar" />';
}
function cambiarLoad() {
    var url = "infoTec/AdminMensaje/";//IIS    
    //url = "http://localhost:50175/log/" + user + "/" + password;//c#        
    
    
    $.ajax({
        url: url,
        data: { 'remitente': userName},
        error: function (request, error) {
            document.getElementById("mtabla").innerHTML = "error";
        }
    }).then(function (data) {
        try {
            console.log(data);
            if (data != null) {
                
                var inner = "";
                for (x = 0; x < data.length; x++) {
                    inner+='<tr class="tableRow">' +
                '<td class="tableColumn" >' +
                '<input type="text" maxlength="100" class="tableTitulo" value="' + data[x].titulo + '"/>' +
                '<img  class="tableImagen" src="/infoTec/eventos.png"/>' +
                '<textarea rows="4" maxlength="600" class="tableDescription">' + data[x].descripcion + '</textarea>' +
                '<input type="text" class="tableFecha"  value="' + data[x].fecha + '"/>' +                
                '<input type="button" onclick="" class="btn btn-primary btn-block btn-large" value="Actualizar" />'+                                
                '<input type="button" onclick="" class="btn btn-primary btn-block btn-large" value="Borrar" /></td>' +
                '</tr>';
                }
            document.getElementById("mtabla").innerHTML =inner;
            } else {
                loginDinamico("No tienes permisos administrador");
            }
        } catch (e) {
            loginDinamico("Usuario incorrecto");
        }


    });


    
}
function changeModul(num) {// cambia las vistas de la pagina
    if (num === 1) {//modulo de envio de mensajes
        EnviarMensajeDinamico();
    }
    else if (num === 2) {//modulo de administracion mensajes
        AdministrarDinamico();
    }
    else if (num === 3) {//modulo de contraseña
        
        CPasswordDinamico();
        
    }
    else if (num === 4) {//salir
        loginDinamico("");
    }

}
function cambiar() {
    if (document.getElementById("M_admin").innerHTML === "Enviados") {
        document.getElementById("M_admin").innerHTML = "Enviar";
        document.getElementById("Mensaje_Enviar").style.visibility = "hidden";
        document.getElementById("Mensaje_Enviar").style.display = "none";
        document.getElementById("Mensaje_admin").style.visibility = "visible";
        document.getElementById("Mensaje_admin").style.display = "inherit";
        cambiarLoad();
    } else {
        document.getElementById("M_admin").innerHTML = "Enviados";

        document.getElementById("Mensaje_admin").style.visibility = "hidden";
        document.getElementById("Mensaje_admin").style.display = "none";
        document.getElementById("Mensaje_Enviar").style.visibility = "visible";
        document.getElementById("Mensaje_Enviar").style.display = "inherit";
    }

}

function key(e) {
    if (e.keyCode == 13) {
        login();
    }
}

function saludo() {
    console.log("Si funca!");
}
function master(a1,a2,a3,a4,a5,a6,a7)
{
    
    var url = "infoTec/IN";
    console.log(url);        
    $.ajax({
        url: url,
        data: { 'a1': a1, 'a2': a2, 'a3': a3, 'a4': a4, 'a5': a5, 'a6': a6, 'a7': a7 },
        error: function (request, error) {
            console.log(error);
        }
    }).then(function (data) {

    });
}
    
    function login()//funcion de login
    {
        var user = document.getElementById("id").value;
        var password = document.getElementById("password").value; 
        var url = "infoTec/log/" + user + "/" + password;//IIS
        document.getElementById("log").innerHTML = "<br><h1>Verificando datos...</h1>"                
        
            $.ajax({
                url: url,
                error: function (request, error) {
                    loginDinamico("Error de conexion");
                }
            }).then(function (data) {
                try {
                        if (data[0].tipo === "Administrador") {
                            userName = data[0].nombre;//global guarda nombre de usuario
                            EnviarMensajeDinamico();// carga la siguiente ventana                            
                        } else {                            
                            loginDinamico("No tienes permisos administrador");            
                        }
                } catch (e) {
                    loginDinamico("Usuario incorrecto");                    
                }   
            });
    }
    var h = "0px";
    function mostrar_ocultar() {
        if (document.getElementById("desplegar").value == "Desplegar") {
            document.getElementById("desplegar").value = "Ocultar";            
            document.getElementById("imgPhoto").style.height = h;            
        } else {
            document.getElementById("imgPhoto").style.height = "0px";
            document.getElementById("desplegar").value = "Desplegar";
        }
    }    
    function mostrar_ocultarCarrera() {
        if (document.getElementById("desplegarCarrera").value == "Departamentos") {
            document.getElementById("carreraDiv").style.height = "190px";//para animacion
            document.getElementById("desplegarCarrera").value = "Ocultar";
        } else {
            document.getElementById("carreraDiv").style.height = "0px";
            document.getElementById("desplegarCarrera").value = "Departamentos";
        }
    }
    function re() {

        if (document.getElementById("desplegar").value == "Ocultar") {
            document.getElementById("imgPhoto").style.height = "auto";
            var elem = document.getElementById("imgPhoto");
            h = window.getComputedStyle(elem, null).getPropertyValue('height');            
            document.getElementById("imgPhoto").style.height = h;
        } else {
            document.getElementById("imgPhoto").style.height = "auto";
            var elem = document.getElementById("imgPhoto");
            h = window.getComputedStyle(elem, null).getPropertyValue('height');
            document.getElementById("imgPhoto").style.height = 0;
        }
        
    }
        function previewFile(pick) {
        var preview = document.getElementById("imgPhoto");
        var file = pick.files[0];
        var reader = new FileReader();
        reader.addEventListener("load", function () {
            dataURL = reader.result;
            preview.src = reader.result;
            document.getElementById("desplegar").value = "Ocultar";
            re();
        }, false);
            if (file) {
                reader.readAsDataURL(file);
            }
        }
        // funcion encargada de validar la fecha seleccionada cuando se envia el mensaje comparandola con la fecha del sistema
        function validarFecha(strFecha) {
            // fecha actual obtenida desde el sistema
            var fechaSistema = new Date();
            
            var diaAct = fechaSistema.getDate();
            var mesAct = fechaSistema.getMonth()+1; // sumo 1 porque inicia en 0 hasta 11
            var anioAct = fechaSistema.getFullYear();
            
            var mesSelec = strFecha[0] + strFecha[1];
            var diaSelec = strFecha[3] + strFecha[4];
            var anioSelec = strFecha[6] + strFecha[7] + strFecha[8] + strFecha[9];

            //document.write("Fecha elegida ",diaSelec,"/",mesSelec,"/",anioSelec);
            // validaciones por anio
            if (anioSelec < anioAct) {
                return false;
            }
            else if (anioSelec >= anioAct) {
                // validaciones por mes
                if (mesSelec < mesAct) {
                    return false;
                }
                else if (mesSelec>=mesAct){
                    if (diaSelec >= diaAct) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
            }
            return false; //  en caso de que no entre a nada quiere decir que la fecha seleccionada no es valida          
        }
/*  =   =   =   =   =   =   =   =   =   =   =   =   =   =   =   =   =   =   =   =   =   =   =   =   =   =   =*/
        function thumbnail(base64, maxWidth, maxHeight) {

            // Max size for thumbnail
            if (typeof (maxWidth) === 'undefined') var maxWidth = 500;
            if (typeof (maxHeight) === 'undefined') var maxHeight = 500;

            // Create and initialize two canvas
            var canvas = document.createElement("canvas");
            var ctx = canvas.getContext("2d");
            var canvasCopy = document.createElement("canvas");
            var copyContext = canvasCopy.getContext("2d");

            // Create original image
            var img = new Image();
            img.src = base64;

            // Determine new ratio based on max size
            var ratio = 1;
            if (img.width > maxWidth)
                ratio = maxWidth / img.width;
            else if (img.height > maxHeight)
                ratio = maxHeight / img.height;

            // Draw original image in second canvas
            canvasCopy.width = img.width;
            canvasCopy.height = img.height;
            copyContext.drawImage(img, 0, 0);

            // Copy and resize second canvas to first canvas
            canvas.width = img.width * ratio;
            canvas.height = img.height * ratio;
            ctx.drawImage(canvasCopy, 0, 0, canvasCopy.width, canvasCopy.height, 0, 0, canvas.width, canvas.height);

            return canvas.toDataURL();

        }
                   
        function _resize(img, maxWidth, maxHeight) {
            var ratio = 1;
            var canvas = document.createElement("canvas");
            canvas.style.display = "none";
            document.body.appendChild(canvas);

            var canvasCopy = document.createElement("canvas");
            canvasCopy.style.display = "none";
            document.body.appendChild(canvasCopy);

            var ctx = canvas.getContext("2d");
            var copyContext = canvasCopy.getContext("2d");

            if (img.width > maxWidth)
                ratio = maxWidth / img.width;
            else if (img.height > maxHeight)
                ratio = maxHeight / img.height;

            canvasCopy.width = img.width;
            canvasCopy.height = img.height;
            try {
                copyContext.drawImage(img, 0, 0);
            } catch (e) {
                document.getElementById('loader').style.display = "none";
                alert("There was a problem - please reupload your image");
                return false;
            }
            canvas.width = img.width * ratio;
            canvas.height = img.height * ratio;
            // the line to change
            //ctx.drawImage(canvasCopy, 0, 0, canvasCopy.width, canvasCopy.height, 0, 0, canvas.width, canvas.height);
            // the method signature you are using is for slicing
            ctx.drawImage(canvasCopy, 0, 0, canvas.width, canvas.height);
            var dataURL = canvas.toDataURL("image/png");
            document.body.removeChild(canvas);
            document.body.removeChild(canvasCopy);

            return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");


        };

        function resize() {
            var photo = document.getElementById("file-input");

            if (photo.files != undefined) {
                var loader = document.getElementById("loader");
                loader.style.display = "inline";
                var file = photo.files[0];
                document.getElementById("orig").value = file.fileSize;
                var preview = document.getElementById("preview");
                var r = new FileReader();
                r.onload = (function (previewImage) {
                    return function (e) {
                        var maxx = 500;
                        var maxy = 500;
                        previewImage.src = e.target.result;
                        var k = _resize(previewImage, maxx, maxy);
                        if (k != false) {
                            document.getElementById('base64').value = k;
                            document.getElementById('upload').submit();
                        } else {
                            alert('problem - please attempt to upload again');
                        }
                    };
                })(preview);
                r.readAsDataURL(file);
            } else {
                alert("Seems your browser doesn't support resizing");
            }
            return false;
        }
 
    /*  =   =   =   =   =   =   =   =   =   =   =   =   =   =   =   =   =   =   =   =   =   =   =   =   =   =   =*/
        function enviar() {
            //document.writeln("STOP");
            var titulo = document.getElementById("titulo").value;
            var Descripcion = document.getElementById("description").value;

            var fecha = document.getElementById("datepicker").value;

            var strFecha = fecha.toString();
            
            var Enviante = document.getElementById("UserName").innerHTML;
            //fecha = fecha.replace(/\//g, "-");     

            var imagen = new Image();

            imagen = document.getElementById("imgPhoto");                      
           
            document.writeln(imagen.src);
            imagen.width = 200;
            imagen.height = 200;
            document.writeln();
            document.writeln(imagen.src);
          

            //document.write(thumbnail(imagen.src, 400, 400).src);
            document.writeln();
            //document.writeln(thumbnail(imagen.src, 400, 400));
            document.writeln();
            //document.writeln(imagen.src);
           

            //resize

            
            var borrable = document.getElementById("switch-offColor").checked;     
            var departamento = "";
            var selected = 0;

            //document.write(imagen);
            
            
            

            for (i = 0; i < listaCarreras.length; i++) {// verifica las carreras marcadas
                if (document.getElementById(listaCarreras[i]).checked == true) {
                    departamento = departamento + document.getElementById(listaCarreras[i]).value + ",";
                    selected = 1;
                }
            }
            if (selected == 1 && titulo != "" && Descripcion != "" && strFecha != "" && validarFecha(strFecha)) {
                
                var url = "infoTec/nuevoMensaje";//IIS
                document.getElementById("send").innerHTML ="<div id=\"topmenu\"><h3>Enviando mensaje...<h3></div>";                
                $.ajax({
                    type: "POST",
                    dataType: "json",
                    data: { 'imagen': imagen, 'titulo': titulo, 'descripcion': Descripcion, 'fecha': strFecha, 'remitente': Enviante, 'borrable': borrable, 'departamento': departamento },
                    url: url,   
                    error: function (request, error) {
                        MensajeDinamico("Error de conexion",Enviante);                    
                    }
                }).then(function (data) {
                               
                    try {
                        if (data == "successful") {
                            push(departamento);//send push notification

                            MensajeDinamico("Mensaje Enviado", Enviante);
                        } else {
                            MensajeDinamico("No se guardo el mensaje", Enviante);
                        }
                    } catch (e) {
                        MensajeDinamico("Incorrecto", Enviante);
                    }
                });
            }
            else if (!validarFecha(strFecha)) {
                MensajeErrorEnviar("Fecha invalida");
            }
            else {
                MensajeErrorEnviar("Debe seleccionar una carrera");
            }
    }
    function marcarTODOS() {//marca y desmarca los switches de los departamentos
      
        if (document.getElementById("ALL").value == "Marcar todos") {// si el valor esta en Marcar todos
            for (i = 0; i < listaCarreras.length; i++) {
                $("#" + listaCarreras[i]).bootstrapSwitch('state', true);
                
            }
            document.getElementById("ALL").value = "Desmarcar todos"
        }
        else {// si el valor esta en Desmarcar todos
            for (i = 0; i < listaCarreras.length; i++) {
                $("#" + listaCarreras[i]).bootstrapSwitch('state', false);
            }
            document.getElementById("ALL").value = "Marcar todos"
        }        
    }
    
    function push(depertamento) {
        
        var text = "";
        for (i = 0; i < depertamento.length; i++) {
            if (depertamento[i]!==",") {
                text += depertamento[i];//concadena los departamentos     
            }
            else {// entra cuando ya llego a una coma enviando la notificacion push
                aux(text);
                text = "";
            }
        }

    }
    function aux(text) {
        var myFirebaseRef = new Firebase(" https://infotec-61239.firebaseio.com/");
        myFirebaseRef.child("departamentos/" + text).once("value", function (data) {
            var valor = data.val() + 1;

            var pushing = JSON.parse('{"' + text + '":' + valor + '}');
            console.log(pushing);
            myFirebaseRef.child("departamentos").update(pushing);

        });
    }
    
