/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function() {
    
    //value del select en el evento change
    $("#xTipo").change(function() {
        
        alert($("#xTipo option:selected").val());
        
    });
            
});

function sendForm(){
    var idRRHH = $("#xTipo option:selected").val();
}