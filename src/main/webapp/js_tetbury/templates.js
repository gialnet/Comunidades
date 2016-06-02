
/**
 * Borrar las lineas
 * @param {type} myfila
 * @returns {undefined}
 */
function deleteRowTemplate(myfila)
{
    var tabla = document.getElementById("oTabla");
     tabla.deleteRow('oCuenta'+myfila);
}


/**
 * Leer datos desde el servidor
 * @returns {Conectar}
 */
function LeerTemplates()
{
    var pag=window.pagina;
    var tama=window.pagsize;
    var url='AjaxContaServlet.servlet';
    var dataToSend='accion=ListaTemplates&pagina='+pag +'&size='+tama;
    //alert('dataToSend'+dataToSend);
    var conn = new Conectar(url, dataToSend);
    
    conn.pageRequest.onreadystatechange = function() { ListaTemplates(conn.pageRequest); };
    //alert('onreadystatechange');
    conn.Enviar();
    //alert('despues del envio');
    return conn;
}

/**
 * Buscar una plantilla por concpeto
 * @returns {Conectar}
 */
function LeerTemplatesByConcepto()
{
    var pag=window.pagina;
    var tama=window.pagsize;
    var xConcepto=document.getElementById("xConcepto").value;
    var url='AjaxContaServlet.servlet';
    var dataToSend='accion=ListaTemplatesByConcepto&pagina='+pag +'&size='+tama+'&xConcepto='+xConcepto;
    //alert('dataToSend'+dataToSend);
    var conn = new Conectar(url, dataToSend);
    
    conn.pageRequest.onreadystatechange = function() { ListaTemplates(conn.pageRequest); };
    //alert('onreadystatechange');
    conn.Enviar();
    //alert('despues del envio');
    return conn;
}



/**
 * Recibe la respuesta del servidor
 * @param {type} pageRequest
 * @returns {unresolved}
 */
function ListaTemplates(pageRequest) {


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
                CrearTablaTuplasTemplates(pageRequest.responseText);
                //return pageRequest.responseText;

            }


        }
    }
    else
        return;
}



/**
 * Leer el JSON on las tuplas de TuplasTemplates
 * @param {type} myJson
 * @returns {undefined}
 */
function CrearTablaTuplasTemplates(myJson)
{

    var tabla = new grid("oTabla");
    var j = 0;
    //alert(myJson);
    var obj = JSON.parse(myJson);
    //alert(obj.length);
    // borrar las tuplas de consultas anteriores
    //deleteLastRow("oTabla");
    
  
    
    for (j = 0; j <= (obj.length - 1); j++)
    {
        //alert(obj[j].Descripcion);
        var row = tabla.AddRowTable(j + 1);

        var celda = tabla.AddRowCellText(row, 0, obj[j].id);
        celda.setAttribute('hidden', 'true'); // ocultar la columna ID
        
        tabla.AddRowCellText(row, 1, obj[j].concepto);
        tabla.AddRowCellText(row, 2,
               '<div onclick="HacerAlgo('+(j+1)+');"><a href="#" class="btn tip" title="Editar Plantilla"> <i class="icon-pencil"> </i> </a></div>');

    }
    
    obj=null;


}



/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function SendDatosPlantilla()
{
    // grabar los datos de una plantilla
    // NewPlantilla.do
    
}

/**
 * Añadir una celda a la tabla de nueva plantilla
 * @returns {undefined}
 */
function addRowNewBlankTemplate()
{
    
 var tabla = new grid("oTabla");
 var myfila = window.fila;

    //alert(myfila);
        var row = tabla.AddRowTable(myfila);
        
        tabla.AddRowCellText(row, 0, (myfila).toString()); // id
        
        // cuenta contable
        var celda = tabla.AddRowCellText(row, 1, "");
        celda.setAttribute('id', 'oCuenta'+myfila);
        celda.setAttribute('onclick', 'GetCellTemplate(this.id);');

        // debe o haber
        celda = tabla.AddRowCellNumber(row, 2, "D"); 
        celda.setAttribute('id', 'debe_haber'+myfila);
        celda.setAttribute('onclick', 'GetCellTemplate(this.id);');

        // se toma de la tabla cuentas
        celda = tabla.AddRowCellText(row, 3, "concepto contable"); 

               
        // para borrar un movimiento
        tabla.AddRowCellText(row, 4,
                '<a onclick="deleteRowTemplate('+myfila+')" class="btn tip" title="Eliminar Concepto"> <i class="icon-trash"> </i> </a>');
                
        window.fila++;
}

