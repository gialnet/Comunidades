
function LeerCustomers()
{
    var pag=window.pagina;
    var tama=window.pagsize;
    var url='AjaxServlet.servlet';
    var dataToSend='accion=clientes'+'&pagina=' + pag + '&size=' + tama;
    var conn = new Conectar(url, dataToSend);
       
    conn.pageRequest.onreadystatechange = function() { ListaCustomers(conn.pageRequest); };

    conn.Enviar();
    
    return conn;
}

/**
 * 
 * @param {type} pageRequest
 * @returns {unresolved}
 */
function ListaCustomers(pageRequest) {


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
                CrearTablaCustomers(pageRequest.responseText);
                //return pageRequest.responseText;

            }


        }
    }
    else
        return;
}

/**
 * Crear tabla de Clientes
 * @param {type} myJson
 * @returns {undefined}
 */
function CrearTablaCustomers(myJson) {

    var tabla = new grid("oTabla");
   
    var j = 0;

    var obj = JSON.parse(myJson);

    deleteLastRow("oTabla");
    //alert(obj.length);
    
    for (j = 0; j <= (obj.length - 1); j++)
    {
        //alert(obj[j].Descripcion);
        var row = tabla.AddRowTable(j + 1);

        var celda = tabla.AddRowCellText(row, 0, obj[j].ID);
        celda.setAttribute('hidden', 'true'); // ocultar la columna ID
        tabla.AddRowCellText(row, 1, obj[j].Nif);
        tabla.AddRowCellText(row, 2, obj[j].Nombre);
        tabla.AddRowCellText(row, 3, obj[j].Direccion);
        tabla.AddRowCellText(row, 4, obj[j].Movil);
        tabla.AddRowCellText(row, 5, obj[j].Mail);
        tabla.AddRowCellText(row, 6,
               '<ul class="table-controls">'+
               '<li ><a onclick="EditarCliente('+(j+1)+');" class="btn tip" title="Ver/Editar Cliente"> <i class="icon-pencil"> </i> </a></li>'+
               '<li><a onclick="verDocsCliente('+(j+1)+');" class="btn tip" title="Ver Documentos del cliente"> <i class="icon-briefcase"> </i> </a></li>'+
               '<li><a onclick="chg_igualas('+(j+1)+');" href="#fechabanco" data-toggle="modal"  class="btn tip"  title="Igualas clientes"> <i class="icon-money"> </i> </a></li>'+
               '<li><a onclick="DeleteCustomer('+(j+1)+');" href="#fechabanco" data-toggle="modal"  class="btn tip"  title="Borrar un clientes"> <i class="icon-remove"> </i> </a></li>'+
               '</ul>');




    }
    
    obj=null;

}

/**
 * 
 * @param {type} numFila
 * @returns {@exp;oCelda@pro;innerHTML}
 */
function chg_igualas(numFila){
    var xID='ofila'+numFila;
    var oCelda = document.getElementById(xID).cells[0];
    document.getElementById('fechabanco').style.visibility = 'visible'; //'hidden'
    document.getElementById('xIDCliente').value=oCelda.innerHTML;
    
    return oCelda.innerHTML;
}

/**
 * Busqueda de clientes por nombre
 * @returns {undefined}
 */
function ClientesByNombre(){
    /*
    var pag=1; 
    var tama=10; 
    var xNombre = document.getElementById('xNombre').value;
    var direccion='accion=clientesByNombre&pagina='+pag +'&size='+tama+'&xNombre='+xNombre;
    //alert(direccion);
    CallRemote('AjaxServlet', direccion);
    */
   
    var pag=window.pagina;
    var tama=window.pagsize;
    var url='AjaxServlet.servlet';
    var xNombre=document.getElementById('xNombre').value;
    var dataToSend='accion=clientesByNombre&pagina='+pag +'&size='+tama+'&xNombre='+xNombre;
    var conn = new Conectar(url, dataToSend);
       
    conn.pageRequest.onreadystatechange = function() { ListaCustomers(conn.pageRequest); };

    conn.Enviar();
    
    return conn;
}






function verDocsCliente(numFila){
    
    var xID='ofila'+numFila;
    var oCelda = document.getElementById(xID).cells[0];
    var oCeldaNombre = document.getElementById(xID).cells[2];
    window.location.href = 'docsCustomer.jsp?xIDCliente='+oCelda.innerHTML+'&xNombre='+oCeldaNombre.innerHTML;
}

//
// Abrir el formulario para editar un cliente
//
function EditarCliente(numFila)
{
    var xID='ofila'+numFila;
    var oCelda = document.getElementById(xID).cells[0];
    
    window.location.href = 'newCliente.jsp?xIDCliente='+oCelda.innerHTML;
}


/**
 * Borrar un cliente
 * @returns {undefined}
 */
function DeleteCustomer()
{

    var xID='ofila'+numFila;
    var oCelda = document.getElementById(xID).cells[0];
    
    window.location.href = 'ServletDeleteCustomer.servlet?xIDCliente='+oCelda.innerHTML;
}