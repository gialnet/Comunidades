
function LeerProviders()
{
    var pag=window.pagina;
    var tama=window.pagsize;
    var url='AjaxServlet.servlet';
    var dataToSend='accion=proveedores'+'&pagina=' + pag + '&size=' + tama;
    var conn = new Conectar(url, dataToSend);
       
    conn.pageRequest.onreadystatechange = function() { ListaProviders(conn.pageRequest); };

    conn.Enviar();
    
    return conn;
}

/**
 * 
 * @param {type} pageRequest
 * @returns {unresolved}
 */
function ListaProviders(pageRequest) {


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
                CrearTablaProviders(pageRequest.responseText);
                //return pageRequest.responseText;

            }


        }
    }
    else
        return;
}



/**
 * Crear la tabla de Proveedores
 * @param {type} myJson
 * @returns {undefined}
 */
function CrearTablaProviders(myJson) {

    var tabla = new grid("oTabla");
    var j = 0;

    var obj = JSON.parse(myJson);
    deleteLastRow("oTabla");
//alert(obj.length);
    for (j = 0; j <= (obj.length - 1); j++)
    {
        //alert(obj[j].Descripcion);
        var row = tabla.AddRowTable(j + 1);

        //tabla.AddRowCellText(row, 0, obj[j].ID);
        
         var celda = tabla.AddRowCellText(row, 0, obj[j].ID);
        celda.setAttribute('hidden', 'true'); // ocultar la columna ID
        
        tabla.AddRowCellText(row, 1, obj[j].Nif);
        tabla.AddRowCellText(row, 2, obj[j].Nombre);
        tabla.AddRowCellText(row, 3, obj[j].Direccion);
        tabla.AddRowCellText(row, 4, obj[j].Movil);
        tabla.AddRowCellText(row, 5, obj[j].Mail);
        tabla.AddRowCellText(row, 6,
                '<ul class="table-controls"><li ><a onclick="EditarProveedor('+(j+1)+');" class="btn tip" title="Ver/Editar Proveedor"> <i class="icon-pencil"> </i> </a></li></ul>');

    }
    
    obj=null;

}


/**
 * Busqueda de clientes por nombre
 * @returns {undefined}
 */
function ProveedorByNombre(){
    
    /*
    var pag=1; 
    var tama=10; 
    var xNombre = document.getElementById('xNombre').value;
    var direccion='accion=proveedoresByNombre&pagina='+pag +'&size='+tama+'&xNombre='+xNombre;
    //alert(direccion);
    CallRemote('AjaxServlet', direccion);
    */
   
    var pag=window.pagina;
    var tama=window.pagsize;
    var url='AjaxServlet.servlet';
    var xNombre=document.getElementById('xNombre').value;
    var dataToSend='accion=proveedoresByNombre&pagina='+pag +'&size='+tama+'&xNombre='+xNombre;
    var conn = new Conectar(url, dataToSend);
       
    conn.pageRequest.onreadystatechange = function() { ListaProviders(conn.pageRequest); };

    conn.Enviar();
    
    return conn;

}


//
// Abrir el formulario para editar un cliente
//
function EditarProveedor(numFila)
{
    
    var xID='ofila'+numFila;
    var oCelda = document.getElementById(xID).cells[0];   
    
    window.location.href = 'newProveedor.jsp?xIDProveedor='+oCelda.innerHTML;
}
