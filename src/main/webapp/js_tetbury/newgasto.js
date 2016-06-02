
// enviar los datos necesario para crear una nueva factura
// estos datos estan almacenados el la pagina Web newFactura.jsp
// y se manipulan a través del objeto DOM de la misma
// oTabla contiene una tabla con las líneas de detalle de la factura
// xNombre de tipo input text tiene el nombre del cliente
// input type="date" id="xFecha" la fecha en formato ISO yyyy-mm-dd
// por lo tanto compondremos un objeto JSON al que le vamos a pasar los datos

function SendDatosNewGasto(newgasto)
{  

    var obj = {};
    var rejilla = {};
    var myarray = [];

    var Fecha=document.getElementById("xFecha").value;
    var myfila=window.fila;
    
    //alert('test');
    
    //alert('antes del for');
    //idfact
    /*
     * En caso de una modificación el campo xIDFactura será mayor de 0
     */

     if (document.getElementById('xIDCompra').value > 0)
         obj.idfact = document.getElementById('xIDCompra').value;


     obj.id_pro = document.getElementById('xIDCodProveedor').value;

    //alert(obj.id);
    if (typeof obj.id_pro === "undefined")
        {
            alert("Tiene que seleccionar un cliente");
            return false;
        }
    
    obj.fecha = Fecha;

    
    //alert(myfila);
    
    for (j=1; j<myfila; j++)
        {
            mycel = document.getElementById('oConcepto'+j);
            rejilla.concepto = mycel.innerHTML;
            
            mycel = document.getElementById('oUnidades'+j);
            rejilla.unidades = mycel.innerHTML;
            
            mycel = document.getElementById('oIVA'+j);
            rejilla.por_vat = mycel.innerHTML;
            
            mycel = document.getElementById('oPrecio'+j);
            rejilla.importe = mycel.innerHTML;
        
            myarray.push(rejilla);
            rejilla = {};

            //alert(mycel.innerHTML);
        }
       
    obj.LineasFact=myarray;
    
    var myJsonString = JSON.stringify(obj);
    
    var hiddenField = document.createElement("input");
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("name", "myJson");
    hiddenField.setAttribute("value", myJsonString);

    var formulario = document.getElementById(newgasto);
    formulario.appendChild(hiddenField);
    //alert(myJsonString);
    
    newgasto.submit();

}


function ValidarFormularioGasto(newgasto)
{
    

    // validar los campos xBase xPorIVA xTotal
    /*
     * Se pueden dar las siguientes circunstancias
     * 1ª que solo sepa el Total y no tenga IVA paises como UK permiten facturar sin VAT
     * 2º el total y el IVA
     * 3º
     */
    /*
    var base = document.getElementById("xBase").value;
    var vat = document.getElementById("xPorIVA").value;
    var total = document.getElementById("xTotal").value;
        
    var baseFloat = parseFloat(base.toString().trim());
    var vatFloat = parseFloat(vat.toString().trim());
    var totalFloat = parseFloat(total.toString().trim());
    
    if (isNaN(baseFloat))
        document.getElementById("xBase").value="0";
    
    if (isNaN(vatFloat))
        document.getElementById("xPorIVA").value="0";
    
    if (isNaN(totalFloat))
        {
            alert("Al menos tiene que indicar el total de la factura");
            return false;
        }
    */
   
    /*
     * En caso de una modificación el campo xIDCompra será mayor de 0
     * es una modificación
     */

     var id_form;
     
     id_form = document.getElementById('xIDCodProveedor').value;
    
    //alert(id_form);
    if (typeof id_form === "undefined")
        {
            alert("Tiene que seleccionar un proveedor");
            return false;
        }
        
    document.getElementById('xIDCodProveedor').value=id_form;
    
    newgasto.submit();
    
}

/**
 * 
 * @param {type} xID
 * @returns {undefined}
 */
function checkVAT(xID)
{
    var vat = document.getElementById(xID).value;
    var vatFloat = parseFloat(vat.toString().trim());
    var base = document.getElementById("xBase").value;
    var baseFloat = parseFloat(base.toString().trim());
    
    if (isNaN(vatFloat))
        document.getElementById("xPorIVA").value="0";
    else
        {
            if (isNaN(baseFloat))
                document.getElementById("xBase").value="0";
            else
                {
                    document.getElementById("xTotal").value=((baseFloat)+(baseFloat*vatFloat/100)).toFixed(2);
                }
        }
}

/**
 * 
 * @param {type} xID
 * @returns {undefined}
 */
function checkTotal(xID)
{
    var total = document.getElementById(xID).value;
    var vat = document.getElementById("xPorIVA").value;
    var vatFloat = parseFloat(vat.toString().trim());
    
    var totalFloat = parseFloat(total.toString().trim());
    if (isNaN(totalFloat))
        alert("Al menos tiene que indicar el total de la factura");
    else
        {
            // calcular la base imponible en función del IVA
            if (vatFloat > 0)
                {
                    var base = totalFloat/(1+(vatFloat/100));
                    document.getElementById("xBase").value=base.toFixed(2);
                }
        }
}

/**
 * Cuando cambia el valor de los escrito lo buscamos en la base de datos
 * @param {type} Nombre
 * @returns {Conectar}
 */
function DatosProveedorDB(Nombre)
{
    //alert(Nombre);
    var url='AjaxServlet.servlet';
    var dataToSend='accion=LeerDatosProveedor&cuantos=lista_nombres&xIDProveedor=' + Nombre;
    //alert('dataToSend'+dataToSend);
    var conn = new Conectar(url, dataToSend);
    
    conn.pageRequest.onreadystatechange = function() { LeerDatosProveedor(conn.pageRequest); };
    //alert('onreadystatechange');
    conn.Enviar();
    
    return conn;
}

function LeerDatosProveedor(pageRequest) {


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
                CrearSelectProveedores(pageRequest.responseText);
                //return pageRequest.responseText;

            }


        }
    }
    else
        return;
}


/**
 * Llenar una lista de opciones con nombres
 * @param {type} myJson
 * @returns {undefined}
 */
function CrearSelectProveedores(myJson)
{
    
     var obj = JSON.parse(myJson);
     //alert(obj.length);
     for (j = 0; j <= (obj.length - 1); j++)
    {
                 
        $('#listaProveedores').append($('<option>', { 
            value: obj[j].ID,
            text : obj[j].Nombre,
            id_suppliers_type : obj[j].id_suppliers_type
    }));
    }
    
    var xProv = document.getElementById('xIDCodProveedor').value;
    if( xProv.length>0 )
        setProvIndex(xProv);
}

/**
 * Poner el indice de un select de proveedores para las modificaciones de facturas
 * @param {type} xProv
 * @returns {undefined}
 */
function setProvIndex(xProv)
{

    $('#listaProveedores').select2('val',xProv);

}




/**
 * Leer una lista de facturas emitidas en JSON  y crear una tabla
 * @returns {Conectar}
 */
function LeerFacturasRecibidas()
{
    //alert(Nombre);
    
    var pag=window.pagina;
    var tama=window.pagsize;
    var url='AjaxServlet.servlet';
    var dataToSend='accion=fact_recibidas&pagina='+pag+'&size='+tama;
    //alert('dataToSend'+dataToSend);
    var conn = new Conectar(url, dataToSend);
    
    conn.pageRequest.onreadystatechange = function() { LeerFactuRecibidas(conn.pageRequest); };
    //alert('onreadystatechange');
    conn.Enviar();
    
    return conn;
}

function LeerFactuRecibidas(pageRequest) {


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
                CrearTablaRecibidas(pageRequest.responseText);
                //return pageRequest.responseText;

            }


        }
    }
    else
        return;
}

/**
 * Crear la tabla de Facturas Recibidas
 * @param {type} myJson
 * @returns {undefined}
 */
function CrearTablaRecibidas(myJson) {

    //alert(myJson);
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
        
        tabla.AddRowCellText(row, 1, obj[j].nombre);
        
        if (typeof obj[j].tipo_tercero === "undefined")
            tabla.AddRowCellText(row, 2, "");
        else
            tabla.AddRowCellText(row, 2, obj[j].tipo_tercero);
        
        tabla.AddRowCellNumber(row, 3, obj[j].fecha_emision);
        tabla.AddRowCellNumber(row, 4, obj[j].LocaleImporte);
        
        var pago;
        if(obj[j].estado==='PAGADA'){//<span class="label label-success">Done</span>
            tabla.AddRowCellText(row, 5,'<span class="label label-success">'+ obj[j].estado+'</span>');
            pago='<li ><a onclick="CancelarPagarCompra('+(j+1)+');" class="btn tip" title="Anular Pago de la Compra"> <i class="icon-ban-circle"> </i> </a></li>';
        }
        else{
            tabla.AddRowCellText(row, 5,'<span class="label label-info">'+ obj[j].estado+'</span>');
            pago='<li ><a onclick="PagarCompra('+(j+1)+');" href="#fechabanco" data-toggle="modal" class="btn tip" title="Pagar por banco la compra"> <i class="icon-money"> </i> </a></li>';
        }
        
        
          tabla.AddRowCellText(row, 6,
                '<ul class="table-controls">'+
                '<li ><a onclick="VerDocGasto('+(j+1)+');"  class="btn tip" title="Ver Factura"> <i class="icon-eye-open"> </i> </a></li>'+
                '<li ><a onclick="EditarCompra('+(j+1)+');" class="btn tip" title="Editar gasto"> <i class="icon-pencil"> </i> </a></li>'+
                pago+
                '</ul>'
            );
    }
    
    obj=null;

}

/**
 * 
 * @param {type} numFila
 * @returns {undefined}
 */
function EditarCompra(numFila)
{
    var xID='ofila'+numFila;
    var oCelda = document.getElementById(xID).cells[0];
    //alert(oCelda.innerHTML);

    window.location.href = 'newGasto.jsp?xIDCompra='+oCelda.innerHTML;
}

/**
 * Pagar una compra asiento contable y actualización en la tabla de facturas recibidas
 * @param {type} numFila
 * @returns {undefined}
 */
function PagarCompra(numFila)
{
    var xID='ofila'+numFila;
    var oCelda = document.getElementById(xID).cells[0];
    document.getElementById('fechabanco').style.visibility = 'visible'; //'hidden'
    document.getElementById('xIDGasto').value=oCelda.innerHTML;
    
    return oCelda.innerHTML;
}

/**
 * Cancelar el pago de una compra asiento contable y actualización en la tabla de facturas recibidas
 * @param {type} numFila
 * @returns {undefined}
 */
function CancelarPagarCompra(numFila)
{
    var xID='ofila'+numFila;
    var oCelda = document.getElementById(xID).cells[0];
       
    window.location.href = 'CancelarPagoGasto.do?xIDGasto='+oCelda.innerHTML;
}


/**
 * Ver la factura adjunta al gasto
 * @param {type} numFila
 * @returns {undefined}
 */
function VerDocGasto(numFila)
{
    var xID='ofila'+numFila;
    var oCelda = document.getElementById(xID).cells[0];
    //alert(oCelda.innerHTML);
    
    window.location.href = 'verDocGastoServlet.servlet?xIDGasto='+oCelda.innerHTML;
}


/**
 * Añadir una celda a la tabla de nueva factura o modificación
 * @returns {undefined}
 */
function addRowNewBlankFactRec()
{
 var tabla = new grid("oTabla");
 var myfila = window.fila;
 var myVAT = "21";

//alert(obj.length);
    
        //alert(obj[j].Descripcion);
        var row = tabla.AddRowTable(myfila);

        tabla.AddRowCellText(row, 0, (myfila).toString()); // id
        
        var celda = tabla.AddRowCellText(row, 1, ""); // concepto
        celda.setAttribute('id', 'oConcepto'+myfila);
        //celda.setAttribute('contentEditable', true);
        celda.setAttribute('onclick', 'GetCell(this.id);');
        
        celda = tabla.AddRowCellNumber(row, 2, "1"); // unidades
        celda.setAttribute('id', 'oUnidades'+myfila);
        //celda.setAttribute('contentEditable', true);
        celda.setAttribute('onclick', 'GetCell(this.id);');
        
        if (document.getElementById("xTipoProv").value==="3")
            myVAT = "0";
        if (document.getElementById("xTipoProv").value==="4")
            myVAT = "0";
        if (document.getElementById("xTipoProv").value==="5")
            myVAT = "0";
            
        celda = tabla.AddRowCellNumber(row, 3, myVAT); // % IVA
        celda.setAttribute('id', 'oIVA'+myfila);
        celda.setAttribute('onclick', 'GetCell(this.id);');
        //celda.setAttribute('contentEditable', true);
        
        celda = tabla.AddRowCellNumber(row, 4, "0"); // precio
        celda.setAttribute('id', 'oPrecio'+myfila);
        celda.setAttribute('onclick', 'GetCell(this.id);');
        //celda.setAttribute('contentEditable', true);
        
        celda = tabla.AddRowCellNumber(row, 5, "Total"); // total
        celda.setAttribute('id', 'oTotal'+myfila);
        //celda.setAttribute('contentEditable', true);
        
        tabla.AddRowCellText(row, 6, '<a onclick="deleteRowDetalle('+myfila+')" class="btn tip" title="Eliminar Concepto"> <i class="icon-trash"> </i> </a>');

        // variable global definida en el formulario
        // javascript las guarda en el objeto window
        window.fila++;
}

