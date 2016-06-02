

/**
 * Lista de socios con sus aportaciones
 * @returns {Conectar}
 */

function LeerEmpleados()
{
    
    var url='AjaxContaServlet.servlet';
    var dataToSend='accion=ListaEmpleados';
    var conn = new Conectar(url, dataToSend);
    
    conn.pageRequest.onreadystatechange = function() { ListaEmpleados(conn.pageRequest); };

    conn.Enviar();
    
    return conn;
}

function ListaEmpleados(pageRequest) {


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
                CrearTablaEmpleados(pageRequest.responseText);
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
function CrearTablaEmpleados(myJson)
{

    var tabla = new grid("oEmpleados");
    var j = 0;

    var obj = JSON.parse(myJson);

    // borrar las tuplas de consultas anteriores
    deleteLastRow("oEmpleados");
    
    //alert(obj.length);
    
    for (j = 0; j <= (obj.length - 1); j++)
    {
        //alert(obj[j].Descripcion);
        var row = tabla.AddRowTable(j + 1);

        //tabla.AddRowCellText(row, 0, obj[j].id);
        var celda = tabla.AddRowCellText(row, 0, obj[j].id);
        celda.setAttribute('hidden', 'true'); // ocultar la columna ID
        tabla.AddRowCellText(row, 1, obj[j].nif );
        tabla.AddRowCellNumber(row, 2, obj[j].nombre );
        tabla.AddRowCellNumber(row, 3, obj[j].importe );
        tabla.AddRowCellText(row, 4,           
        '<ul class="table-controls"><li ><a  onclick="VerDiarioApunte('+(j+1)+');"  class="btn tip" title="Editar"> <i class="icon-refresh"> </i> </a></li></ul>');
    
    }
    obj=null;


}