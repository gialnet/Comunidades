
/**
 * Lista de partidas de un presupuesto
 * @returns {Conectar}
 */

function LeerRepartoPresupuesto()
{

    var pag=window.pagina;
    var tama=window.pagsize;
    var url='ServletAjaxPresupuestos.servlet';
    var dataToSend='accion=LeerRepartoPresupuesto&pagina='+pag +'&size='+tama;
    var conn = new Conectar(url, dataToSend);
       
    conn.pageRequest.onreadystatechange = function() { ListaRepartoPresupuesto(conn.pageRequest); };

    conn.Enviar();
    
    return conn;
}

/**
 * 
 * @param {type} pageRequest
 * @returns {unresolved}
 */
function ListaRepartoPresupuesto(pageRequest) {


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
                CrearTablaRepartoPresupuesto(pageRequest.responseText);
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
function CrearTablaRepartoPresupuesto(myJson)
{

    var tabla = new grid("oTabla");
    var j = 0;

    var obj = JSON.parse(myJson);

    // borrar las tuplas de consultas anteriores
    deleteLastRow("oTabla");
    
    //alert(myJson);
    
    for (j = 0; j <= (obj.length - 1); j++)
    {
        //alert(obj[j].Descripcion);
        var row = tabla.AddRowTable(j + 1);

        //tabla.AddRowCellText(row, 0, obj[j].id);
        var celda = tabla.AddRowCellText(row, 0, obj[j].id);
        celda.setAttribute('hidden', 'true'); // ocultar la columna ID
        tabla.AddRowCellText(row, 1, obj[j].comunero );
        tabla.AddRowCellText(row, 2, obj[j].LocaleImporte );
        tabla.AddRowCellNumber(row, 3, obj[j].LocaleCuota );
        tabla.AddRowCellNumber(row, 4, obj[j].domiciliado );
        tabla.AddRowCellText(row, 5, 
        '<ul class="table-controls"><li ><a  onclick="VerRepartoPresupuesto('+(obj[j].id)+');"  class="btn tip" title="Ver"> <i class="icon-eye-open"> </i> </a></li>'+
        '</ul>'
        );
    
    }
    obj=null;


}

/**
 * 
 * @param {type} IDPresupuesto
 * @returns {undefined}
 */
function VerRepartoPresupuesto(IDPresupuesto)
{

    window.location.href = 'BrowsePresupuesto.jsp?xIDPresupuesto='+IDPresupuesto;
}

/**
 * Alta de un nuevo socio
 * @returns {undefined}
 */
/*
function NuevoPresupuesto()
{
    // paso un cero para que sea un alta
    //window.location.href = 'NewSocio.jsp?xIDSocio=0';
}
*/