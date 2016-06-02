
/**
 * Lista de Remesas
 * @returns {Conectar}
 */

function LeerRemesas()
{
    
    var pag=window.pagina;
    var tama=window.pagsize;
    var url='ServletAjaxPresupuestos.servlet';
    var dataToSend='accion=LeerRemesas'+'&pagina=' + pag + '&size=' + tama;
    var conn = new Conectar(url, dataToSend);
       
    conn.pageRequest.onreadystatechange = function() { ListaRemesas(conn.pageRequest); };

    conn.Enviar();
    
    return conn;
}

/**
 * 
 * @param {type} pageRequest
 * @returns {unresolved}
 */
function ListaRemesas(pageRequest) {


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
                CrearTablaListaRemesas(pageRequest.responseText);
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
function CrearTablaListaRemesas(myJson)
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
        tabla.AddRowCellText(row, 1, obj[j].descripcion );
        tabla.AddRowCellText(row, 2, obj[j].fecha_cobro );
        tabla.AddRowCellText(row, 3, obj[j].estado );
        tabla.AddRowCellText(row, 4,
        '<ul class="table-controls"><li><a  onclick="GenerarCuaderno('+(obj[j].id)+');"  class="btn tip" title="Generar fichero ISO20022"> <i class="icon-barcode"> </i> </a></li>'+
        '<li><a  onclick="GenerarCuaderno('+(obj[j].id)+');"  class="btn tip" title="Ver los no domiciliados"> <i class="icon-calendar"> </i> </a></li>'+
        '</ul>');
    
    }
    obj=null;


}

/**
 * 
 * @param {type} IDRemesa
 * @returns {undefined}
 */
function GenerarCuaderno(IDRemesa)
{

    window.location.href = 'ServletCuadernoSEPA.servlet?xIDRemesa='+IDRemesa;
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