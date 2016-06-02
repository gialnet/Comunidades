
/**
 * Editar una plantilla
 * @param {type} myID
 * @returns {undefined}
 */
function GetCellTemplate(myID)
{
    // Leer
    var oValor=document.getElementById(myID);
    var stringID=myID.toString();
    var campo;
    
    if (myID.toString().substring(0, 7) ==='oCuenta')
        {
            if (oValor.innerHTML.toString().substring(0,6) ==='<input')
                oValor.innerHTML=document.getElementById('cuenta').value;
            else
                {
                    campo='<input name="cuenta" onblur="TemplateInputToRowCellHtml(this.id,'+stringID+');" value="'+
                            oValor.innerHTML+'" type="text" id="cuenta" size="10" maxlength="10" onkeypress="TeclaTemplate(event, this.id,'+
                            stringID+')" />';
                    oValor.innerHTML=campo;
                }
            
            document.getElementById('cuenta').focus();
        }
}

/**
 * Poner el contenido VALUE de INPUT TEXT en el innerHTML de una celda de la tabla
 * @param {type} MyinputID
 * @param {type} MyrowID
 * @returns {undefined}
 */
function TemplateInputToRowCellHtml(MyinputID,MyrowID)
{
    var InputValor=document.getElementById(MyinputID).value;
    
    //alert(MyinputID);
    //alert('el id de la fila'+MyrowID.getAttribute('id'));
    MyrowID=MyrowID.getAttribute('id');
    
    if (MyinputID==='cuenta')
        {
            var oCelda=document.getElementById(MyrowID.toString());
            
            
            // pasar el foco al campo importe
            var myString=MyrowID.toString();
            var numFila=myString.substring(9);
            //alert(numFila);
            var oPrecio=document.getElementById('oPrecio'+numFila);
            var pID = oPrecio.getAttribute('id');

            if (oCelda.innerHTML.toString().substring(0,6) ==='<input')
                oCelda.innerHTML=InputValor;
            /*
            campo='<input name="precio" onblur="InputToRowCellHtml(this.id,'+pID+');" value="'+
            oPrecio.innerHTML+'" type="text" id="precio" size="10" maxlength="10" onkeypress="detectar_tecla(event, this.id,'+
            pID+')" />';

            oPrecio.innerHTML=campo;

            
            //oPrecio.focus();
            document.getElementById('precio').focus(); */
            
        }
        
    if (MyinputID==='Unidades')
        {
            var oCelda=document.getElementById(MyrowID.toString());
            oCelda.innerHTML=InputValor;
            
            
            var myString=MyrowID.toString();
            //alert(myString);
            var numFila=myString.substring(9);
            //alert('fila: '+numFila);
            
            var importe=parseFloat(InputValor);
            
            var oCeldaTotal=document.getElementById('oTotal'+numFila);
            var oPrecio=document.getElementById('oPrecio'+numFila);
            var String_precio = oPrecio.innerHTML;
            var precio=parseFloat(String_precio);
            var unidades=parseFloat(InputValor);
            //alert(unidades);
            var resultado = precio * unidades;
            
            resultado = resultado.toFixed(2);
            //alert(resultado);
            oCeldaTotal.innerHTML= resultado.toString();
            
        }
        
    if (MyinputID==='precio')
        {
            var oCelda=document.getElementById(MyrowID.toString());
            oCelda.innerHTML=InputValor;
            
            //oPrecio
            var myString=MyrowID.toString();
            //alert(myString);
            var numFila=myString.substring(7);
            //alert('fila: '+numFila);
            
            var oCeldaTotal=document.getElementById('oTotal'+numFila);
            var oCeldaUnidades=document.getElementById('oUnidades'+numFila);
            
            
            var importe=parseFloat(InputValor);
            //alert(importe);
            var vUnidades = oCeldaUnidades.innerHTML;
            //alert(oUnidades);
            var unidades=parseFloat(vUnidades);
            //alert(unidades);
            var resultado = importe * unidades;
            
            resultado = resultado.toFixed(2);
            //alert(resultado);
            oCeldaTotal.innerHTML= resultado.toString();
            
            
        }
    
}

/**
 * pulsación de las teclas, cuando se pulsa return se graba el valor
 * @param {type} e
 * @param {type} MyinputID
 * @param {type} MyrowID
 * @returns {undefined}
 */
function TeclaTemplate(e, MyinputID, MyrowID){

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
        TemplateInputToRowCellHtml(MyinputID,MyrowID);
	
	
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
	TemplateInputToRowCellHtml(MyinputID,MyrowID);
	
		
}

//alert(tecla);
}
