/* 
 * Gestión del diario contable
 * parte de gestión del interfaz
 */

/**
 * Objeto Diario
 * @param {type} idTabla
 * @returns {Diario} object
 */
function Diario(idTabla) {
    
    this.NumCuentas;
    this.TuplasDiario;
    this.tabla = new grid(idTabla);
           
    this.SetTuplasDiario = function(myJson)
    {
        this.TuplasDiario = JSON.parse(myJson);
        this.NumCuentas = this.TuplasDiario.length;

        return this.TuplasDiario;
    };

    this.DeletePreviusTable = function ()
    {
        var tbl = document.getElementById(idTabla);

        for(x=(tbl.rows.length-1); x>0; x--)
            tbl.deleteRow(x);
    };
    
}

/**
 * Crear una tabla con los movimientos de una único asiento
 * conta-fracApunteDetalle.jsp es el contenedor del tabla de detalle del diario
 * [{"id":37,"id_apunte":0,"cuenta":"4100000000","concepto":"Acreedores por prestaciones de servicios",
 * "debe_haber":"H","importe":229.75},{"id":38,"id_apunte":0,"cuenta":"4720000000","concepto":"Hacienda Pública, IVA soportado",
 * "debe_haber":"D","importe":39.87},{"id":39,"id_apunte":0,"cuenta":"6280000000","concepto":"Suministros.",
 * "debe_haber":"D","importe":189.88}]'
 * @param {json TuplasDiario} myJson
 * @returns {diario}
 */
function DiarioLineasDetalle(myJson)
{  


    var j = 0;
    var celda;

    //alert('antes de crear el objeto');
    var diario = new Diario('oDiario');
    //alert('Despues el objeto');
    diario.SetTuplasDiario(myJson);
    diario.DeletePreviusTable();
    var Tuplas = diario.TuplasDiario;
    var tabla = diario.tabla;
    
       
    //alert(diario.TuplasDiario);
    
    for (j = 0; j <= (diario.NumCuentas - 1); j++)
    {
        //alert(obj[j].Descripcion);
        var row = tabla.AddRowTable(j + 1);

        tabla.AddRowCellText(row, 0, Tuplas[j].cuenta);
        tabla.AddRowCellText(row, 1, Tuplas[j].concepto);
        if (Tuplas[j].debe_haber==='D')
            {
                celda = tabla.AddRowCellNumber(row, 2, Tuplas[j].importe);
                celda.setAttribute('id', 'oImporte'+j);
                celda.setAttribute('onclick', 'GetImporteCell(this.id);');
                tabla.AddRowCellNumber(row, 3, '');
                
            }
        else
            {
                tabla.AddRowCellNumber(row, 2, '');
                celda = tabla.AddRowCellNumber(row, 3, Tuplas[j].importe);
                celda.setAttribute('id', 'oImporte'+j);
                celda.setAttribute('onclick', 'GetImporteCell(this.id);');
            }
        

    }
    
    return diario;
    
}


/**
 * Poner un campo input dentro de la celda
 * @param {id de la celda} myID
 * @returns {undefined}
 */
function GetImporteCell(myID)
{
    //alert(myID);
    var oValor=document.getElementById(myID);
    var stringID=myID.toString();

    //alert(stringID);
    
    var campo='<input name="importe" type="text" id="importe" size="10" maxlength="10" onkeypress="CheckKeys(event, this.id,'+
            stringID+')" />';
    oValor.innerHTML=campo;
    document.getElementById('importe').focus();

}

/**
 * Pasar el valor del input a la celda de la tabla
 * @param {type} MyinputID
 * @param {type} MyrowID
 * @returns {undefined}
 */
function SaveImporteCell(MyinputID,MyrowID)
{
    var oValor=document.getElementById(MyinputID).value;
    
    //alert(MyinputID);
    //alert('el id de la fila'+MyrowID.getAttribute('id'));
    MyrowID=MyrowID.getAttribute('id');
    
    var oCelda=document.getElementById(MyrowID.toString());
    oCelda.innerHTML=oValor;

    // pasar el foco al campo importe siguiente
    
    var myString=MyrowID.toString();
    var numFila=myString.substring(8); // oImporte0 oImporte1 oImporte2 oImporte3 ...
    //alert(numFila);
    
    // si estamos en la ultima fila pasamos a la primera
    //numFila+=1;
    /*
    if (numFila > diario.NumCuentas )
        numFila=1;*/
    
    var oNextImporte=document.getElementById('oImporte'+numFila+1);
    
    var pID = oNextImporte.getAttribute('id');
    var campo='<input name="importe'+numFila+1+'" type="text" id="importe" size="10" maxlength="10" onkeypress="CheckKeys(event, this.id,'+pID+')" />';
    oNextImporte.innerHTML=campo;
    
    document.getElementById('importe'+numFila+1).focus();
            

        
    
}

/**
 * pulsación de las teclas, cuando se pulsa return se graba el valor
 * @param {evento} e
 * @param {ID del campo type input} MyinputID
 * @param {fila donde está} MyrowID
 * @returns {undefined}
 */
function CheckKeys(e, MyinputID, MyrowID){

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
	//QuitProvision();
	
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
	SaveImporteCell(MyinputID,MyrowID);
	
		
}

//alert(tecla);
}


