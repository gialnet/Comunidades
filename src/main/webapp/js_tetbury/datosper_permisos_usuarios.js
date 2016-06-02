
/**
 * Activar en el interfaz de usuario los checkboxes activos en función
 * de los permisos de usuario
 * 
 * @returns {Conectar}
 */

function EstablecerOpciones()
{
    
    var idUser = document.getElementById("xTipo").value;
    //alert(idUser);
    var url='AjaxContaServlet.servlet';
    var dataToSend='accion=getPermisosUsuario&idUsuario='+idUser;
    var conn = new Conectar(url, dataToSend);
       
    conn.pageRequest.onreadystatechange = function() { getPermisosUsuario(conn.pageRequest); };

    conn.Enviar();
    
    return conn;
}

/**
 * 
 * @param {type} pageRequest
 * @returns {unresolved}
 */
function getPermisosUsuario(pageRequest) {


    if (pageRequest.readyState === 4)
    {
        if (pageRequest.status === 200)
        {
            // Solo descomentar para depuración
            //alert(pageRequest.responseText);
            if (pageRequest.responseText === 'Error')
                alert(pageRequest.responseText);
            else
            {
                setPermisosUsuario(pageRequest.responseText);
                //return pageRequest.responseText;

            }


        }
    }
    else
        return;
}

/**
 * 
 * @param {type} myJson
 * @returns {undefined}
 */
function setPermisosUsuario(myJson)
{

    var obj = JSON.parse(myJson);
    
    //alert(obj.panel);
        
    if (obj.panel==="yes")
        document.getElementById("panel").checked=true;
    else
        document.getElementById("panel").checked=false;
    
    if (obj.clientes==="yes")
        document.getElementById("clientes").checked=true;
    else
        document.getElementById("clientes").checked=false;
    
    if (obj.ventas==="yes")
        document.getElementById("ventas").checked=true;
    else
        document.getElementById("ventas").checked=false;
    
    if (obj.proveedores==="yes")
        document.getElementById("proveedores").checked=true;
    else
        document.getElementById("proveedores").checked=false;
    
    if (obj.compras==="yes")
        document.getElementById("compras").checked=true;
    else
        document.getElementById("compras").checked=false;
            
    if (obj.nominas==="yes")
        document.getElementById("nominas").checked=true;
    else
        document.getElementById("nominas").checked=false;
    
    if (obj.bancos==="yes")
        document.getElementById("bancos").checked=true;
    else
        document.getElementById("bancos").checked=false;
    
    if (obj.contabilidad==="yes")
        document.getElementById("contabilidad").checked=true;
    else
        document.getElementById("contabilidad").checked=false;
    
    
    obj=null;


}
