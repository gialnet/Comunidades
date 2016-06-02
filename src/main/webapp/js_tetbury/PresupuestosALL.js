
/**
 * Lista de partidas de un presupuesto
 * @returns {Conectar}
 */

function LeerTodosPresupuestos()
{
    var pag=window.pagina;
    var tama=window.pagsize;
    var url='ServletAjaxPresupuestos.servlet';
    var dataToSend='accion=LeerTodosPresupuestos&pagina='+pag +'&size='+tama;
    var conn = new Conectar(url, dataToSend);
       
    conn.pageRequest.onreadystatechange = function() { ListaDePresupuestos(conn.pageRequest); };

    conn.Enviar();
    
    return conn;
}

/**
 * 
 * @param {type} pageRequest
 * @returns {unresolved}
 */
function ListaDePresupuestos(pageRequest) {


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
                CrearTablaListaPresupuestos(pageRequest.responseText);
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
function CrearTablaListaPresupuestos(myJson)
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
        tabla.AddRowCellText(row, 1, obj[j].Descripcion );
        tabla.AddRowCellText(row, 2, obj[j].Fecha );
        tabla.AddRowCellNumber(row, 3, obj[j].LocaleImporte );
        tabla.AddRowCellText(row, 4,
        '<ul class="table-controls"><li ><a  onclick="VerPresupuesto('+(obj[j].id)+');"  class="btn tip" title="Ver presupuesto"> <i class="icon-eye-open"> </i> </a></li>'+
        '<li><a  onclick="VerReparto('+(obj[j].id)+');"  class="btn tip" title="detalle del reparto"> <i class="icon-search"> </i> </a></li>'+
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
function VerPresupuesto(IDPresupuesto)
{

    window.location.href = 'BrowsePresupuesto.jsp?xIDPresupuesto='+IDPresupuesto;
}

function VerReparto(IDPresupuesto)
{

    window.location.href = 'BrowseRepartoPresupuesto.jsp?xIDPresupuesto='+IDPresupuesto;
}

/**
 * Alta de un nuevo socio
 * @returns {undefined}
 */

function newPresupuesto()
{
    window.location.href = 'ServletNewPresupuesto.servlet?xPresupuesto='+$('#xPresupuesto').val();
}
