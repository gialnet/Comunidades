
/**
 * Borrar una línea
 * @param {type} myfila
 * @returns {undefined}
 */

function deleteRowDiario(myfila)
{   
 
    var tbl = document.getElementById('oTabla');
    
    tbl.deleteRow(myfila);
    
    window.fila--;
    
}


/**
 * Enviar los datos del formulario de nuevo asiento
 * Controla que la suma de movientos al debe es igual al del haber
 * 
  * @returns {undefined}
 */

function SendDatosAsiento()
{
    // Enviar los datos de un nuevo asiento
    var varFloat;
    var debehaber;
    var SumaHaber = 0;
    var SumaDebe = 0;
    var importe;

    var rejilla = {};
    var myarray = [];

    var myfila=window.fila;

    /*
     * En caso de una modificación el campo xIDAsiento será mayor de 0
     */

     /*
    if (document.getElementById('xIDAsiento').value > 0)
        obj.id = document.getElementById('xIDAsiento').value;

    obj.concepto = document.getElementById('xConcepto').value;
    
    // comprobar que ka fecha esté en formato ISO AAAA-MM-DD
    obj.fecha = Fecha;
    */
    
    //alert(myfila);
    
    for (j=1; j<myfila; j++)
        {
            mycel = document.getElementById('oCuenta'+j);
            rejilla.cuenta = mycel.innerHTML;
            
            mycel = document.getElementById('odebe_haber'+j);
            rejilla.debe_haber = mycel.innerHTML;
            debehaber = mycel.innerHTML;
                        
            mycel = document.getElementById('oimporte'+j);
            rejilla.importe = mycel.innerHTML;
            importe = mycel.innerHTML;
                       
            varFloat = parseFloat(importe);
            
            //alert('varFloat: '+varFloat);
            
            if (debehaber!=='D')
                SumaHaber += varFloat;
            else
                SumaDebe += varFloat;
        
            myarray.push(rejilla);
            rejilla = {};

            //alert(mycel.innerHTML);
        }
       
    //alert('SumaHaber: '+SumaHaber);
    //alert('SumaDebe: '+SumaDebe);
    
    if (SumaDebe !== SumaHaber )
        {
            alert('Asiento descuadrado, no coinciden las sumas del debe y el haber');
            return false;
        }
    
    var myJsonString = JSON.stringify(myarray);
    
    var hiddenField = document.createElement("input");
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("name", "myJson");
    hiddenField.setAttribute("value", myJsonString);

    var formulario = document.getElementById('newAsiento');
    formulario.appendChild(hiddenField);
    
    // alert(myJsonString);
    
    formulario.submit();
}

/**
 * 
 * @param {type} myJson
 * @returns {undefined}
 */
function MostrarDetalleAsiento(myJson)
{
    var tabla = new grid("oTabla");
    var j = 0;
    var myfila = window.fila;
    var obj = JSON.parse(myJson);
    var row;

    // borrar las tuplas de consultas anteriores
    deleteLastRow("oTabla");
    
    //alert(obj.length);
    
    for (j = 0; j <= (obj.length - 1); j++)
    {
        //alert(obj[j].Descripcion);
        
        myfila = window.fila;
        
        row = tabla.AddRowTable(j + 1);
                
        celda = tabla.AddRowCellText(row, 0, (myfila).toString()); // id
        celda.setAttribute('hidden', 'true');
        
        // cuenta contable
        celda = tabla.AddRowCellText(row, 1, obj[j].cuenta); 
        celda.setAttribute('id', 'oCuenta'+myfila);
        celda.setAttribute('onclick', 'GetCellDiarioCuenta(this.id);');

        // debe o haber
        celda = tabla.AddRowCellText(row, 2, obj[j].debe_haber); 
        celda.setAttribute('id', 'odebe_haber'+myfila);
        celda.setAttribute('onclick', 'GetCellDiarioDebeHaber(this.id);');
        
        // Importe
        celda = tabla.AddRowCellNumber(row, 3, obj[j].importe); 
        celda.setAttribute('id', 'oimporte'+myfila);
        celda.setAttribute('onclick', 'GetCellDiarioImporte(this.id);');
               
        // se toma de la tabla cuentas
        celda = tabla.AddRowCellText(row, 4, obj[j].concepto); 
        celda.setAttribute('id', 'oConcepto'+myfila);
        
        // para borrar un movimiento
        tabla.AddRowCellText(row, 5,
                '<a onclick="deleteRowDiario('+myfila+')" class="btn tip" title="Eliminar Concepto"> <i class="icon-trash"> </i> </a>');
                
        window.fila++;
    
           
    }
    obj=null;
}

/**
 * Añadir una celda a la tabla de nueva plantilla
 * @returns {undefined}
 */
function addRowNewBlankAsientoDiario()
{
    
 var tabla = new grid("oTabla");
 var myfila = window.fila;

    //alert(myfila);
        var row = tabla.AddRowTable(myfila);
        
        celda = tabla.AddRowCellText(row, 0, (myfila).toString()); // id
        celda.setAttribute('hidden', 'true');
        
        // cuenta contable
        celda = tabla.AddRowCellText(row, 1, ""); 
        celda.setAttribute('id', 'oCuenta'+myfila);
        celda.setAttribute('onclick', 'GetCellDiarioCuenta(this.id);');

        // debe o haber
        celda = tabla.AddRowCellText(row, 2, ""); 
        celda.setAttribute('id', 'odebe_haber'+myfila);
        celda.setAttribute('onclick', 'GetCellDiarioDebeHaber(this.id);');
        //celda.setAttribute('pattern', '[H]{1}[D]{1}');
        
        // Importe
        celda = tabla.AddRowCellNumber(row, 3, ""); 
        celda.setAttribute('id', 'oimporte'+myfila);
        celda.setAttribute('onclick', 'GetCellDiarioImporte(this.id);');
               
        // se toma de la tabla cuentas
        celda = tabla.AddRowCellText(row, 4, ""); 
        celda.setAttribute('id', 'oConcepto'+myfila);
        
        // para borrar un movimiento
        tabla.AddRowCellText(row, 5,
                '<a onclick="deleteRowDiario('+myfila+')" class="btn tip" title="Eliminar Concepto"> <i class="icon-trash"> </i> </a>');
                
        window.fila++;
}

/**
 * 
 * @param {type} IDCelda
 * @returns {undefined}
 */

function GetCellDiarioCuenta(IDCelda)
{
    //myID
    // Leer
    var oValor=document.getElementById(IDCelda);
    var IDCeldaString=IDCelda.toString();
    //stringID
    //alert("GetCell:"+IDCeldaString);
    var campo;
    
    if (IDCeldaString.substring(0, 7) ==='oCuenta')
        {
            if (oValor.innerHTML.toString().substring(0,6) ==='<input')
                oValor.innerHTML=document.getElementById('cuenta').value;
            else
                {
                    campo='<input name="cuenta" onblur="AsientoDiarioInputToRowCellHtml(this.id,'+IDCeldaString+');" value="'+
                            oValor.innerHTML+'" type="text" id="cuenta" size="10" maxlength="10" onkeypress="TeclaAsientoDiario(event, this.id,'+
                            IDCeldaString+')" />';
                    oValor.innerHTML=campo;
                }
            
            document.getElementById('cuenta').focus();
            
        }
        

        
}

/**
 * Poner el contenido VALUE de INPUT TEXT en el innerHTML de una celda de la tabla
 * @param {type} MyinputID
 * @param {type} IDCelda
 * @returns {undefined}
 */
function AsientoDiarioInputToRowCellHtml(MyinputID,IDCelda)
{
    var InputValor = document.getElementById(MyinputID).value;
    
    //Aunque se haya pasado el id del atributo como string
    //en la llamada a la funcion lo detecta como un objeto
    //y hay que volver a coger el atributo id
    var IDCeldaString = IDCelda.getAttribute('id');
    //alert(IDCeldaString);
    //alert('el id de la fila'+MyrowID.getAttribute('id'));
   // MyrowID=MyrowID.getAttribute('id');
    
    if (MyinputID==='cuenta')
        {
            //alert(IDCeldaString);
            var oCelda=document.getElementById(IDCeldaString);
           //alert(InputValor);

            if (oCelda.innerHTML.toString().substring(0,6) ==='<input')
                oCelda.innerHTML=InputValor.toString();
            
        }

}

/**
 * pulsación de las teclas, cuando se pulsa return se graba el valor
 * @param {type} e
 * @param {type} MyinputID
 * @param {type} IDCeldaString
 * @returns {undefined}
 */
/*
function callkeydownhandler(evnt) {
    
   var ev = (evnt) ? evnt : event;
   var code=(ev.which) ? ev.which : event.keyCode;
   alert("El código de la tecla pulsada es: " + code);
}
*/

if (window.document.addEventListener) {
   window.document.addEventListener("keydown", TeclaAsientoDiario, false);
} else {
   window.document.attachEvent("onkeydown", TeclaAsientoDiario);
}


function TeclaAsientoDiario(e, MyinputID, IDCeldaString){

var InputValor=document.getElementById(MyinputID).value;

var ev = (e) ? e : event;
var tecla=(ev.which) ? ev.which : event.keyCode;
/*
if (window.event)
	tecla=e.charCode;//   keyCode;
else
	tecla=e.which;
*/

//alert(tecla);

//escape
if(tecla===27){
	
	if (window.event)
	{
		e.returnValue=false;
		window.event.cancelBubble = true;
	}
	else
	{
		e.preventDefault();
		e.stopPropagation();
	}
	// refrescar la pantalla
        AsientoDiarioInputToRowCellHtml(MyinputID,IDCeldaString);
	
	
}

if(tecla===13 || tecla===9)
{
	if (window.event)
	{
		e.returnValue=false;
		window.event.cancelBubble = true;
	}
	else
	{
		e.preventDefault();
		e.stopPropagation();
	}

        //alert(MyrowID.toString());
	// Grabar el importe introducido al pulsar return
	AsientoDiarioInputToRowCellHtml(MyinputID,IDCeldaString);
	
		
}
//alert(InputValor.length);

if (InputValor.length >=3 && tecla===13)
{
    //alert(InputValor);
    //document.getElementById('xTablaAsiento').setAttribute("class", "modal");
    $('#xTablaAsiento').modal('show');

    FindOutCuentas(InputValor,IDCeldaString);
}
//alert(tecla);
}


/**
 * Llamada a la base de datos con la consulta de un rango de cuentas
 * @param {type} xRango
 * @param {type} IDCeldaString
 * @returns {Conectar}
 */
function FindOutCuentas(xRango,IDCeldaString)
{
    
    var url='AjaxContaServlet.servlet';
    var dataToSend='accion=FindOutCuentas&xCuenta='+xRango;
    //alert('dataToSend'+dataToSend);
    var conn = new Conectar(url, dataToSend);
    
    conn.pageRequest.onreadystatechange = function() { PrintOneCuentas(conn.pageRequest,IDCeldaString); };
    //alert('onreadystatechange');
    conn.Enviar();
    
    return conn;
}

/**
 * Muestra una ventana flotante con la lista de cuentas
 * @param {type} pageRequest
 * @param {type} IDCeldaString
 * @returns {unresolved}
 */
function PrintOneCuentas(pageRequest,IDCeldaString)
{
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
                ShowCuentaContable(pageRequest.responseText,IDCeldaString);
                //return pageRequest.responseText;

            }


        }
    }
    else
        return;
    
}

/**
 * Mostrar los resultados de la búsqueda
 * @param {type} myJson
 * @param {type} IDCelda
 * @returns {undefined}
 */

function ShowCuentaContable( myJson, IDCelda )
{
    
    
   //alert(IDCeldaString);
    
    //alert(myJson);
    var IDCeldaString = IDCelda.getAttribute('id');
   
    var tabla = new grid("oShowCuentas");
    var j = 0;
    var row;
    var obj = JSON.parse(myJson);
    var concepto="";
    var celda;

    // borrar las tuplas de consultas anteriores
    deleteLastRow("oShowCuentas");
    
    //alert(obj.length);
    
    
    for (j = 0; j <= (obj.length - 1); j++)
    {
        //alert(obj[j].Descripcion);
        row = tabla.AddRowTable(j + 1);
        //alert( obj[j].concepto);
        concepto = obj[j].concepto;
        
        celda = tabla.AddRowCellText(row, 0, obj[j].cuenta );
        celda.setAttribute('id', 'objCuenta'+(j+1));
        
        celda = tabla.AddRowCellText(row, 1, obj[j].concepto );
        celda.setAttribute('id', 'objConcepto'+(j+1));
        
        
        tabla.AddRowCellText(row, 2,
        '<ul class="table-controls">'+
        '<li><a onclick="SelectAccount('+ obj[j].cuenta + ','+ (j+1) +','+IDCeldaString + 
        ');" class="btn tip" title="Seleccionar Cuenta"><i class="icon-eye-open"></i></a></li></ul>');
        
    //' + obj[j].cuenta +','+IDCeldaString+'
    //,'+obj[j].concepto+'
    }
    
    obj=null;
    
}

/**
 * Seleccionar una cuenta dedes una tabla
 * @param {type} xCuenta
 * @param {type} NumFila
 * @param {type} IDCelda
 * @returns {undefined}
 */
function SelectAccount(xCuenta, NumFila, IDCelda)
{
    
    //alert('entra'+xCuenta);
    
   
   //alert( xCuenta );
   /*
   var NameIDCelda = IDCelda.getAttribute('id');
   var myfila = NameIDCelda.substring(7);
   */
  
   var myfila = window.fila - 1;
   var concepto = document.getElementById('objConcepto'+NumFila).innerHTML;
   //alert(myfila);
   var conceptoAsiento = document.getElementById('oConcepto'+myfila);
   //alert( NameIDCelda );
   //alert( concepto );
   
   //alert(concepto);
   $('#xTablaAsiento').modal('hide');
    
   IDCelda.innerHTML = xCuenta;
   conceptoAsiento.innerHTML = concepto;
   //alert(IDCelda);
   
   //alert(idCeldaString);
   //var idFila = idCeldaString.substring(8);
    
   //document.getElementById('oConcepto'+idFila).innerHTML = xConcepto;
   
}

// *********************** DEBE/HABER******************************************

/**
 * Operaciones con la celda D/H
 * @param {type} IDCelda
 * @returns {undefined}
 */
function GetCellDiarioDebeHaber(IDCelda)
{
    // Funciones sobre el campo debe haber D/B
    var oValor=document.getElementById(IDCelda);
    var IDCeldaString=IDCelda.toString();
    //stringID
    //alert("GetCell:"+IDCeldaString);
    var campo;
 
 
    if (IDCeldaString.substring(0, 11) ==='odebe_haber')
        {
            //alert();
            if (oValor.innerHTML.toString().substring(0,6) ==='<input')
                oValor.innerHTML=document.getElementById('debe_haber').value;
            else
                {
                    campo='<input name="debe_haber" onblur="DiarioDebeHaber(this.id,'+IDCeldaString+');" value="'+
                            oValor.innerHTML+'" type="text" id="debe_haber" size="1" maxlength="1" onkeypress="TeclaDiarioDebeHaber(event, this.id,'+
                            IDCeldaString+')" />';
                    oValor.innerHTML=campo;
                }
            
            document.getElementById('debe_haber').focus();
        }
        
    
    
}

/**
 * 
 * @param {type} MyinputID
 * @param {type} IDCelda
 * @returns {undefined}
 */
function DiarioDebeHaber(MyinputID,IDCelda)
{
    var InputValor = document.getElementById(MyinputID).value;
    
    //Aunque se haya pasado el id del atributo como string
    //en la llamada a la funcion lo detecta como un objeto
    //y hay que volver a coger el atributo id
    var IDCeldaString = IDCelda.getAttribute('id');
    
    if (MyinputID==='debe_haber')
        {
            var oCelda=document.getElementById(IDCeldaString);
            
            if (oCelda.innerHTML.toString().substring(0,6) ==='<input')
               {
                   dh = InputValor.toUpperCase();
                   if ((dh === 'D') || (dh === 'H') )
                    oCelda.innerHTML=InputValor.toUpperCase();
                   else
                      alert('Solo Debe/Haber');
               }
            
        }
}

/**
 * 
 * @param {type} e
 * @param {type} MyinputID
 * @param {type} IDCeldaString
 * @returns {undefined}
 */
function TeclaDiarioDebeHaber(e, MyinputID, IDCeldaString)
{

var InputValor=document.getElementById(MyinputID).value;

if (window.event)
	tecla=e.keyCode;
else
	tecla=e.which;

//escape
if(tecla===27){
	
	if (window.event)
	{
		e.returnValue=false;
		window.event.cancelBubble = true;
	}
	else
	{
		e.preventDefault();
		e.stopPropagation();
	}
	// refrescar la pantalla
        DiarioDebeHaber(MyinputID,IDCeldaString);
	
	
}

if(tecla===13 || tecla===9)
{
	if (window.event)
	{
		e.returnValue=false;
		window.event.cancelBubble = true;
	}
	else
	{
		e.preventDefault();
		e.stopPropagation();
	}

        //alert(MyrowID.toString());
	// Grabar el importe introducido al pulsar return
	DiarioDebeHaber(MyinputID,IDCeldaString);   
}

}

// *********************** IMPORTE ********************************************

/**
 * Operaciones con la celda importe
 * @param {type} IDCelda
 * @returns {undefined}
 */

function GetCellDiarioImporte(IDCelda)
{
    //
    var oValor=document.getElementById(IDCelda);
    var IDCeldaString=IDCelda.toString();
    //stringID
    //alert("GetCell:"+IDCeldaString);
    var campo;
    
            
   if (IDCeldaString.substring(0, 8) ==='oimporte')
        {
            //alert();
            if (oValor.innerHTML.toString().substring(0,6) ==='<input')
                oValor.innerHTML=document.getElementById('debe_haber').value;
            else
                {
                    campo='<input name="importe" onblur="DiarioImporte(this.id,'+IDCeldaString+');" value="'+
                            oValor.innerHTML+'" type="text" id="importe" size="10" maxlength="10" onkeypress="TeclaDiarioImporte(event, this.id,'+
                            IDCeldaString+')" />';
                    oValor.innerHTML=campo;
                }
            
            document.getElementById('importe').focus();
        }
}

/**
 * 
 * @param {type} MyinputID
 * @param {type} IDCelda
 * @returns {undefined}
 */
function DiarioImporte(MyinputID,IDCelda)
{
    var InputValor = document.getElementById(MyinputID).value;
    
    //Aunque se haya pasado el id del atributo como string
    //en la llamada a la funcion lo detecta como un objeto
    //y hay que volver a coger el atributo id
    var IDCeldaString = IDCelda.getAttribute('id');
 
    if (MyinputID==='importe')
        {
            var oCelda=document.getElementById(IDCeldaString);            
           
            // pasar el foco al campo importe
          
            if (oCelda.innerHTML.toString().substring(0,6) ==='<input')
                oCelda.innerHTML=InputValor;
            
        }
}

/**
 * 
 * @param {type} e
 * @param {type} MyinputID
 * @param {type} IDCeldaString
 * @returns {undefined}
 */
function TeclaDiarioImporte(e, MyinputID, IDCeldaString)
{

var InputValor=document.getElementById(MyinputID).value;

if (window.event)
	tecla=e.keyCode;
else
	tecla=e.which;

//escape
if(tecla===27){
	
	if (window.event)
	{
		e.returnValue=false;
		window.event.cancelBubble = true;
	}
	else
	{
		e.preventDefault();
		e.stopPropagation();
	}
	// refrescar la pantalla
        DiarioImporte(MyinputID,IDCeldaString);
	
	
}

if(tecla===13 || tecla===9)
{
	if (window.event)
	{
		e.returnValue=false;
		window.event.cancelBubble = true;
	}
	else
	{
		e.preventDefault();
		e.stopPropagation();
	}

        //alert(MyrowID.toString());
	// Grabar el importe introducido al pulsar return
	DiarioImporte(MyinputID,IDCeldaString);   
}

}
