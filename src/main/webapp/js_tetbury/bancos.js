

/**
 * Lista de movimientos de una cuenta
 * @returns {undefined}
 */

function LeerMovimientosBancos()
{
    var pag=window.pagina;
    var tama=window.pagsize;
    var url='AjaxServlet.servlet';
    document.xCuenta=$("#xCuentaBanco option:selected").val();
    //alert(xCuenta);

    var dataToSend='accion=ListaMovimientosBancos&cuantos=year_fiscal&xCuentaBanco='+document.xCuenta+'&pagina=' + pag + '&size=' + tama;
    var conn = new Conectar(url, dataToSend);
       
    conn.pageRequest.onreadystatechange = function() { ListaMovimientosBancos(conn.pageRequest); };

    conn.Enviar();
    
    LeerSaldoCuenta();
    
    return conn;
}

/**
 * 
 * @param {type} pageRequest
 * @returns {unresolved}
 */
function ListaMovimientosBancos(pageRequest) {


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
                CrearTablaMovimientosBancos(pageRequest.responseText);
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
function CrearTablaMovimientosBancos(myJson)
{

    var tabla = new grid("oTabla");
    var j = 0;

    var obj = JSON.parse(myJson);

    // borrar las tuplas de consultas anteriores
    deleteLastRow("oTabla");
    
    //alert(obj.length);
    
    for (j = 0; j <= (obj.length - 1); j++)
    {
        //alert(obj[j].Descripcion);
        var row = tabla.AddRowTable(j + 1);

       // tabla.AddRowCellText(row, 0, obj[j].id);
         var celda = tabla.AddRowCellText(row, 0, obj[j].id);
        celda.setAttribute('hidden', 'true'); // ocultar la columna ID
        tabla.AddRowCellText(row, 1, obj[j].fecha);
        tabla.AddRowCellText(row, 2, obj[j].concepto);
        //tabla.AddRowCellNumber(row, 3, obj[j].importe);
        if (obj[j].debe_haber==='D')
            {
                tabla.AddRowCellNumber(row, 3, obj[j].LocaleImporte);
                tabla.AddRowCellNumber(row, 4, '');
            }
        else
            {
                tabla.AddRowCellNumber(row, 3, '');
                tabla.AddRowCellNumber(row, 4, obj[j].LocaleImporte);
            }
        
        tabla.AddRowCellText(row, 5,
                '<ul class="table-controls">'+
               '<li ><a onclick="UpdateAsientoCaja('+(j+1)+');" class="btn tip" title="Editar movimiento"> <i class="icon-pencil"> </i> </a></li>'+
                '</ul>');

    }
    
    obj=null;


}




/**
 * 
 * @returns {undefined}
 */
function LeerSaldoCuenta()
{
    
   document.xCuenta=$("#xCuentaBanco option:selected").val();
    //alert(xCuenta);
    CallRemote('AjaxServlet.servlet', 'accion=LeerSaldoCuenta&cuantos=year_fiscal&xCuentaBanco='+document.xCuenta);
}

function PutSaldoenHTML(saldo)
{
    //alert(saldo);
    document.getElementById("xSaldo").innerHTML='Saldo en cuenta: '+saldo;
}





/**
 * 
 * @param {type} numFila
 * @returns {undefined}
 */
function UpdateAsientoCaja(numFila)
{
    // Abrir la pantalla para actualizar el asiento
    var xID='ofila'+numFila;
    var oCelda = document.getElementById(xID).cells[0];
    // http://localhost:8080/FacturaRedmoon/
    window.location.href = 'ReintegrosIngresos.jsp?xIDAsiento='+oCelda.innerHTML;
}

