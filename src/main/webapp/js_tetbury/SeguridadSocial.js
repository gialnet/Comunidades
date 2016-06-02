
/**
 * 
 * @returns {Conectar}
 */
function LeerSeguridadSocial()
{
    var pag=window.pagina;
    var tama=window.pagsize;
    var url='AjaxServlet.servlet';

    //alert(xCuenta);

    var dataToSend='accion=ListaSeguridadSocial&pagina='+pag+'&size='+tama;
    var conn = new Conectar(url, dataToSend);
       
    conn.pageRequest.onreadystatechange = function() { ListaSeguridadSocial(conn.pageRequest); };

    conn.Enviar();
    
    return conn;
}

/**
 * 
 * @param {type} pageRequest
 * @returns {unresolved}
 */
function ListaSeguridadSocial(pageRequest) {


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
                CrearTablaCrearTablaSeguridadSocial(pageRequest.responseText);
                //return pageRequest.responseText;

            }


        }
    }
    else
        return;
}


//
// Crear tabla de Seguridad Social
//
function CrearTablaSeguridadSocial(myJson) {

    var tabla = new grid("oTabla");
    var j = 0;

    var obj = JSON.parse(myJson);
    deleteLastRow("oTabla");
    //alert(obj.length);
    
    for (j = 0; j <= (obj.length - 1); j++)
    {
        //alert(obj[j].Descripcion);
        var row = tabla.AddRowTable(j + 1);

       
         var celda = tabla.AddRowCellText(row, 0, obj[j].id);
        celda.setAttribute('hidden', 'true'); // ocultar la columna ID
        tabla.AddRowCellText(row, 1, obj[j].fecha);
        tabla.AddRowCellText(row, 2, obj[j].concepto);
        tabla.AddRowCellNumber(row, 3, obj[j].LocaleImporte);
        tabla.AddRowCellText(row, 4,
        '<ul class="table-controls">'+
        '<li ><a onclick="IngresoSeguridad('+(j+1)+');" class="btn tip" title="Pagar Nómina"> <i class="icon-money"> </i> </a></li>'+
        '<li ><a onclick="UpdateSeguridad('+(j+1)+');" class="btn tip" title="Editar Cargo Nómina"> <i class="icon-pencil"> </i> </a></li></ul>');
       
    }
    
    obj=null;

}

