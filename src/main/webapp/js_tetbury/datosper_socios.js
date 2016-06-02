
/**
 * Lista de socios con sus aportaciones
 * @returns {Conectar}
 */

function LeerSocios()
{
    
    var url='AjaxContaServlet.servlet';
    var dataToSend='accion=ListaSocios';
    var conn = new Conectar(url, dataToSend);
       
    conn.pageRequest.onreadystatechange = function() { ListaSocios(conn.pageRequest); };

    conn.Enviar();
    
    return conn;
}

/**
 * 
 * @param {type} pageRequest
 * @returns {unresolved}
 */
function ListaSocios(pageRequest) {


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
                CrearTablaSocios(pageRequest.responseText);
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
function CrearTablaSocios(myJson)
{

    var tabla = new grid("oSocios");
    var j = 0;

    var obj = JSON.parse(myJson);

    // borrar las tuplas de consultas anteriores
    deleteLastRow("oSocios");
    
    //alert(myJson);
    
    for (j = 0; j <= (obj.length - 1); j++)
    {
        //alert(obj[j].Descripcion);
        var row = tabla.AddRowTable(j + 1);

        //tabla.AddRowCellText(row, 0, obj[j].id);
        var celda = tabla.AddRowCellText(row, 0, obj[j].id);
        celda.setAttribute('hidden', 'true'); // ocultar la columna ID
        tabla.AddRowCellText(row, 1, obj[j].nif );
        tabla.AddRowCellText(row, 2, obj[j].nombre );
        tabla.AddRowCellNumber(row, 3, obj[j].LocaleImporte );
        tabla.AddRowCellText(row, 4,           
        '<ul class="table-controls"><li ><a  onclick="UpdateSocio('+(j+1)+');"  class="btn tip" title="Editar"> <i class="icon-refresh"> </i> </a></li>'+
        '</ul>');
    
    }
    obj=null;


}

/**
 * Actualizar los datos de un socio
 * @param {type} numFila
 * @returns {undefined}
 */
function UpdateSocio(numFila)
{
    //
    var xID='ofila'+numFila;
    var oCelda = document.getElementById(xID).cells[0];

    window.location.href = 'NewSocio.jsp?xIDSocio='+oCelda.innerHTML;
}

/**
 * Alta de un nuevo socio
 * @returns {undefined}
 */
function NuevoSocio()
{
    // paso un cero para que sea un alta
    window.location.href = 'NewSocio.jsp?xIDSocio=0';
}