
/**
 * Lista de socios con sus aportaciones
 * @returns {Conectar}
 */

function LeerAvisosSistema()
{
    
    var url='ServletMensajes.servlet';
    var dataToSend='accion=AvisosSistema';
    var conn = new Conectar(url, dataToSend);
    
    conn.pageRequest.onreadystatechange = function() { ListaAvisosSistema(conn.pageRequest); };

    conn.Enviar();
    
    return conn;
}

function ListaAvisosSistema(pageRequest) {


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
                CrearTablaAvisosSistema(pageRequest.responseText);
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
function CrearTablaAvisosSistema(myJson)
{

    var tabla = new grid("oAvisosSistema");
    var j = 0;

    var obj = JSON.parse(myJson);

    // borrar las tuplas de consultas anteriores
    deleteLastRow("oAvisosSistema");
    
    //alert(obj.length);
    
    for (j = 0; j <= (obj.length - 1); j++)
    {
        //alert(obj[j].Descripcion);
        var row = tabla.AddRowTable(j + 1);

        //tabla.AddRowCellText(row, 0, obj[j].id);
        var celda = tabla.AddRowCellText(row, 0, obj[j].id);
        celda.setAttribute('hidden', 'true'); // ocultar la columna ID
        tabla.AddRowCellText(row, 1, obj[j].fecha );
        tabla.AddRowCellText(row, 2, obj[j].texto );
        tabla.AddRowCellText(row, 3,
        '<ul class="table-controls"><li ><a  onclick="YaVeremos('+(j+1)+');"  class="btn tip" title="Editar"> <i class="icon-refresh"> </i> </a></li></ul>');
    
    }
    obj=null;


}