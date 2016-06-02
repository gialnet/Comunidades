

function sendPlantillaRecibo(){

    var rejilla = {};
    var myarray = [];
    
     for (j=1; j<myfila; j++)
        {
            mycel = document.getElementById('inConcepto'+j);
            rejilla.concepto = mycel.innerHTML;
            
           if ($( "#selTipo"+myFila+" option:selected" ).text()==='Fijo'){
               mycel = document.getElementById('inImporte'+j);
               rejilla.importe = mycel.innerHTML;
               rejilla.tipo = 'FI';//FIJO
               rejilla.origen = '';
           }
           else{
               rejilla.origen = $( "#selOrigen"+myFila+" option:selected" ).text();//Lectura o presupuesto
               rejilla.tipo = 'VA';//VARIABLE
               rejilla.importe = '';
           }
            
            myarray.push(rejilla);
            rejilla = {};

            //alert(mycel.innerHTML);
        }
        
        var myJsonString = JSON.stringify(myarray);
        
       
        
        
         var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", "myJson");
            hiddenField.setAttribute("value", myJsonString);

            var formulario = document.getElementById(newRecibo);
            formulario.appendChild(hiddenField);
            //alert(myJsonString);

            newRecibo.submit();  

}
/**
 * Borrar una línea de detalle
 * @param {type} myfila
 * @returns {undefined}
 */
function deleteRowDetalle(myfila)
{   
 
    var tbl = document.getElementById('oTabla');
    
    tbl.deleteRow(myfila);
    
    window.fila--;
    
}


/**
 * Añadir una celda a la tabla de nuevo recibo
 * @returns {undefined}
 */
function addRowNewBlankRecibo()
{
 var tabla = new grid("oTabla");
 var myfila = window.fila;
 var myVAT = "21";

        $('#oTabla').append(
                $('<tr id="tr'+window.fila+'">')
                .append($('<td>').append(window.fila))
                .append($('<td>').append('<input class="input-xxlarge" id="inConcepto'+window.fila+'" type=text>'))
                .append($('<td>').append('<select class="input-mini" id="selTipo'+window.fila+'" onchange="cambiarTipo('+window.fila+')"><option>Fijo</option><option>Variable</option></select>'))
                .append($('<td>').append('<select class="input-mini" style="display:none;" id="selOrigen'+window.fila+'" ><option>Presupuesto</option><option>Lectura</option></select>'))
                .append($('<td>').append('<input id="inImporte'+window.fila+'" type=text>'))
        .append($('<td>').append('<a onclick="deleteRowDetalle('+myfila+')" class="btn tip" title="Eliminar Concepto"> <i class="icon-trash"> </i> </a>'))
            
        );

       // tabla.AddRowCellText(row, 6, '<a onclick="deleteRowDetalle('+myfila+')" class="btn tip" title="Eliminar Concepto"> <i class="icon-trash"> </i> </a>');

        // variable global definida en el formulario
        // javascript las guarda en el objeto window
        window.fila++;
}

function cambiarTipo(myFila)
{
    //alert(sel.options[sel.selectedIndex].text);
    $( "#selTipo"+myFila+" option:selected" ).text();
    if($( "#selTipo"+myFila+" option:selected" ).text()==='Fijo'){
        //$('#tr'+myFila).append('<td><input type=text></td>');
        $( "#selOrigen"+myFila).hide();
        $( "#inImporte"+myFila).show();
    }
    else if($( "#selTipo"+myFila+" option:selected" ).text()==='Variable'){
        $( "#inImporte"+myFila).hide();
        $( "#selOrigen"+myFila).show();
        
    }
}