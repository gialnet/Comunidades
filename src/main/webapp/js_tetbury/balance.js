/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Invocar el Servlet de impresión del balance
 * No se necesita pasar variables ya que las lee de la sesion
 * @returns {undefined}
 */

function PrintPDFBalance()
{
    
    //alert(xTipo + xYear);
    window.location.href = 'ServletBalance.servlet';
}

/**
 * Imprimir la cuenta de perdidas y ganacias
 * @returns {undefined}
 */
function PrintPDFPyG()
{
    
    //alert(xTipo + xYear);
    window.location.href = 'ServletPyG.servlet';
}

/**
 * 
 * @returns {undefined}
 */
function PrintPDFEstadoIGR()
{
    
    //alert(xTipo + xYear);
    window.location.href = 'ServletEstadoIGR.servlet';
}


/**
 * Cambia de vista de un tipo de documento a otro
 * @param {type} TypeDocs
 * @param {type} xYear
 * @param {type} xUser
 * @returns {undefined}
 */
function changeTypeDocs(TypeDocs,xYear, xUser)
{
    //var modo="Balance";

    document.getElementById('xTituloPeriodo').innerHTML = "A vista de "+TypeDocs;
    
    if (TypeDocs==='Perdidas y Ganancias' )
        getResultPyG(xYear, xUser);
    
    if (TypeDocs==='Estado de ingresos y gastos reconocidos' )
        getResultEstadoIGR(xYear, xUser);
    
}       



/**
 * Cuenta de Perdidas y Ganancias
 * @param {type} xYear
 * @param {type} xUser
 * @returns {Conectar}
 */

function getResultPyG(xYear, xUser)
{
    var url='AjaxContaServlet.servlet';
    var dataToSend='accion=VistaTuplasPyG&xYear='+xYear+'&xUser='+xUser;
    
    var conn = new Conectar(url, dataToSend);
    conn.pageRequest.onreadystatechange = function() { ListResultadosPyG(conn.pageRequest); };
    //alert('onreadystatechange');
    conn.Enviar();
    //alert('despues del envio');
    //conn.NextPage('accion=ListaCuentasSaldos&xYear=2013');
    //conn.PrevPage('accion=ListaCuentasSaldos&xYear=2013');
    //var vJSON=conn.pageRequest.responseText;
    return conn;
}


function ListResultadosPyG(pageRequest) {


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
                CrearVistaTuplasPyG(pageRequest.responseText);
                //return pageRequest.responseText;

            }


        }
    }
    else
        return;
}

/**
 * 
 * @param {type} myJson TuplasResultPyG
 * @returns {undefined}
 */
function CrearVistaTuplasPyG(myJson)
{

    //alert(myJson);
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

        tabla.AddRowCellText(row, 0, obj[j].seccion);
        tabla.AddRowCellNumber(row, 1, obj[j].str_importe);
        tabla.AddRowCellNumber(row, 2, obj[j].str_importe_prev);
        /*
        tabla.AddRowCellText(row, 2,
               '<div onclick="HacerAlgo('+(j+1)+');"><a href="#" class="btn tip" title="Modificar datos"> <i class="icon-pencil"> </i> </a></div>');
        */
    }
    
    obj=null;


}

// ************************************************************************

/**
 * Estado de ingresos y gastos reconocidos
 * @param {type} xYear
 * @param {type} xUser
 * @returns {Conectar}
 */
function getResultEstadoIGR(xYear, xUser)
{
    var url='AjaxContaServlet.servlet';
    var dataToSend='accion=VistaTuplasEstadoIGR&xYear='+xYear+'&xUser='+xUser;
    
    var conn = new Conectar(url, dataToSend);
    conn.pageRequest.onreadystatechange = function() { ListResultadosEstadoIGR(conn.pageRequest); };
    //alert('onreadystatechange');
    conn.Enviar();
    //alert('despues del envio');
    //conn.NextPage('accion=ListaCuentasSaldos&xYear=2013');
    //conn.PrevPage('accion=ListaCuentasSaldos&xYear=2013');
    //var vJSON=conn.pageRequest.responseText;
    return conn;
}


function ListResultadosEstadoIGR(pageRequest) {


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
                CrearVistaTuplasEstadoIGR(pageRequest.responseText);
                //return pageRequest.responseText;

            }


        }
    }
    else
        return;
}

/**
 * 
 * @param {type} myJson TuplasResultPyG
 * @returns {undefined}
 */
function CrearVistaTuplasEstadoIGR(myJson)
{

    //alert(myJson);
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

        tabla.AddRowCellText(row, 0, obj[j].seccion);
        tabla.AddRowCellNumber(row, 1, obj[j].str_importe);
        tabla.AddRowCellNumber(row, 2, obj[j].str_importe_prev);
        /*
        tabla.AddRowCellText(row, 2,
               '<div onclick="HacerAlgo('+(j+1)+');"><a href="#" class="btn tip" title="Modificar datos"> <i class="icon-pencil"> </i> </a></div>');
        */
    }
    
    obj=null;


}

/**
 * Realizar una llamada a un Servlet vía Ajax
 * @param {type} xYear
 * @param {type} xUser
 * @returns {Conectar}
 */
function ActualizarBalance()
{
    
    //window.location.href = 'ServletActualizarBalance?xYear='+xYear+'&xUser='+xUser;
    
    var url='ServletActualizarBalance.servlet';
    var dataToSend='';
    //alert(dataToSend);
    var conn = new Conectar(url, dataToSend);
       
    conn.pageRequest.onreadystatechange = function() { RefrescarVistaPanel(conn.pageRequest); };

    conn.Enviar();
    
    return conn;   
    
}

/**
 * Para la imagen animada de realizando proceso
 * @param {type} pageRequest
 * @returns {unresolved}
 */
function RefrescarVistaPanel(pageRequest) {


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
                PararAnimacionEnProceso();
                //return pageRequest.responseText;

            }


        }
    }
    else
        return;
}

/**
 * Alerta de proceso concluido
 * @returns {undefined}
 */
function PararAnimacionEnProceso()
{
    alert('Proceso concluido, refresco los datos');
    window.location.href = 'conta-Balance.jsp';
}