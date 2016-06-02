
/**
 * 
 * @returns {Conectar}
 */
function LeerNominas()
{
    var pag=window.pagina;
    var tama=window.pagsize;
    var url='AjaxServlet.servlet';

    //alert(xCuenta);

    var dataToSend='accion=ListaNominas&pagina=' + pag + '&size=' + tama;
    var conn = new Conectar(url, dataToSend);
       
    conn.pageRequest.onreadystatechange = function() { ListaNominas(conn.pageRequest); };

    conn.Enviar();
    
    return conn;
}

/**
 * 
 * @param {type} pageRequest
 * @returns {unresolved}
 */
function ListaNominas(pageRequest) {


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
                CrearTablaCrearTablaNominas(pageRequest.responseText);
                //return pageRequest.responseText;

            }


        }
    }
    else
        return;
}


//
// Crear tabla de Nominas
//
function CrearTablaNominas(myJson) {

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
        '<li ><a onclick="IngresoNomina('+(j+1)+');" class="btn tip" title="Pagar Nómina"> <i class="icon-money"> </i> </a></li>'+
        '<li ><a onclick="UpdateCargoNomina('+(j+1)+');" class="btn tip" title="Editar Cargo Nómina"> <i class="icon-pencil"> </i> </a></li></ul>');
       
    }
    
    obj=null;

}

//
// IngresoNomina
//
function IngresoNomina(numFila)
{
    var xID='ofila'+numFila;
    var oCelda = document.getElementById(xID).cells[0];
    window.location.href = 'IngresoNomina.jsp?xIDNomina='+oCelda.innerHTML;
}

/**
 * actualizar un cargo de nóminas en caso de error al impurtar los datos el operador
 * @param {type} numFila
 * @returns {undefined}
 */
function UpdateCargoNomina(numFila)
{
    var xID='ofila'+numFila;
    var oCelda = document.getElementById(xID).cells[0];
    window.location.href = 'CargoNominas.jsp?xIDApunte='+oCelda.innerHTML;
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


//
// Crear tabla de IRPF
//
function CrearTablaIRPF(myJson) {

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
        tabla.AddRowCellText(row, 1, obj[j].Naturaleza);
        tabla.AddRowCellText(row, 2, obj[j].NRC);
        tabla.AddRowCellNumber(row, 3, obj[j].LocaleImporte)
        tabla.AddRowCellText(row, 4, obj[j].year_fiscal);
        tabla.AddRowCellText(row, 5, obj[j].periodo);
        tabla.AddRowCellText(row, 6,
        '<ul class="table-controls">'+
        '<li><a onclick="IngresoIRPF('+(j+1)+');" class="btn tip" title="Pagar IRPF"> <i class="icon-money"> </i> </a></li>'+
        '<li><a onclick="AnularPagoIRPF('+(j+1)+');" class="btn tip" title="Anular pago IRPF"> <i class="icon-pencil"> </i> </a></li></ul>');
       
    }
    
    obj=null;

}

/**
 * Realizar el pago del IRPF
 * @param {type} numFila
 * @returns {undefined}
 */
function IngresoIRPF(numFila)
{
    var xID='ofila'+numFila;
    var oCelda = document.getElementById(xID).cells[0];
    window.location.href = 'IngresoTributo.jsp?xIDTributo='+oCelda.innerHTML+'&xCall=BrowseIVA.jsp';
}

/**
 * Anular el pago
 * @param {type} numFila
 * @returns {undefined}
 */
function AnularPagoIRPF(numFila)
{
    var xID='ofila'+numFila;
    var oCelda = document.getElementById(xID).cells[0];
    var Naturaleza = document.getElementById(xID).cells[1];
    var xNRC = document.getElementById(xID).cells[2];
    
    window.location.href = 'DeshacerIngresoTributo.jsp?xIDTributo='+oCelda.innerHTML+
            '&xCall=BrowseIVA.jsp&Naturaleza='+Naturaleza.innerHTML+
            '&xNRC='+xNRC.innerHTML;
}

//
// Crear tabla de IVA
//
function CrearTablaIVA(myJson) {

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
        tabla.AddRowCellText(row, 1, obj[j].Naturaleza);
        tabla.AddRowCellText(row, 2, obj[j].NRC);
        tabla.AddRowCellNumber(row, 3, obj[j].LocaleImporte)
        tabla.AddRowCellText(row, 4, obj[j].year_fiscal);
        tabla.AddRowCellText(row, 5, obj[j].periodo);
        tabla.AddRowCellText(row, 6,
        '<ul class="table-controls">'+
        '<li><a onclick="IngresoIVA('+(j+1)+');" class="btn tip" title="Pagar IVA"> <i class="icon-money"> </i> </a></li>'+
        '<li><a onclick="AnularPagoIVA('+(j+1)+');" class="btn tip" title="Anular pago IVA"> <i class="icon-pencil"> </i> </a></li></ul>');
       
    }
    
    obj=null;

}

/**
 * Hacer el pago del IVA
 * @param {type} numFila
 * @returns {undefined}
 */
function IngresoIVA(numFila)
{
    var xID='ofila'+numFila;
    var oCelda = document.getElementById(xID).cells[0];
    window.location.href = 'IngresoTributo.jsp?xIDTributo='+oCelda.innerHTML+'&xCall=BrowseIVA.jsp';
}

/**
 * Deshacer el pago del IVA
 * @param {type} numFila
 * @returns {undefined}
 */
function AnularPagoIVA(numFila)
{
    var xID='ofila'+numFila;
    var oCelda = document.getElementById(xID).cells[0];
    var Naturaleza = document.getElementById(xID).cells[1];
    var xNRC = document.getElementById(xID).cells[2];
    
    window.location.href = 'DeshacerIngresoTributo.jsp?xIDTributo='+oCelda.innerHTML+
            '&xCall=BrowseIVA.jsp&Naturaleza='+Naturaleza.innerHTML+
            '&xNRC='+xNRC.innerHTML;
}

//
// Crear tabla de Sociedades
//
function CrearTablaSociedades(myJson) {

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
        tabla.AddRowCellText(row, 1, obj[j].Naturaleza);
        tabla.AddRowCellText(row, 2, obj[j].NRC);
        tabla.AddRowCellNumber(row, 3, obj[j].LocaleImporte)
        tabla.AddRowCellText(row, 4, obj[j].year_fiscal);
        tabla.AddRowCellText(row, 5, obj[j].periodo);
        tabla.AddRowCellText(row, 6,
        '<ul class="table-controls">'+
        '<li><a onclick="IngresoSociedades('+(j+1)+');" class="btn tip" title="Pagar Sociedades"> <i class="icon-money"> </i> </a></li>'+
        '<li><a onclick="UpdateSociedades('+(j+1)+');" class="btn tip" title="Anular pago Sociedades"> <i class="icon-pencil"> </i> </a></li></ul>');
       
    }
    
    obj=null;

}
