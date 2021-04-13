window.addEventListener('load', cargando);
var db = openDatabase("myDB", "1.0", "Practica Final", 2 * 1024 *1024);



function cargando(){
document.getElementById('btn-agregar').addEventListener('click', agregar);
document.getElementById('btn-eliminar').addEventListener('click', borrar);
document.getElementById('exportar').addEventListener('click', CreatePDF);


db.transaction(function(tx){
    tx.executeSql("CREATE TABLE IF NOT EXISTS myTable (ID INTEGER PRIMARY KEY,NOMBRE TEXT , APELLIDO TEXT, TELEFONO TEXT , CORREO TEXT, ARTICULO TEXT, CANTIDAD NUMBER, VALOR NUMBER,SUBTOTAL NUMBER, ITBIS NUMBER, TOTAL NUMBER)" );

});

mostrar();

}

function agregar(){
   var id = document.getElementById('id').value;
   var nombre = document.getElementById('nombre').value;
   var apellido = document.getElementById('apellido').value;
   var telefono = document.getElementById('tel').value;
   var correo = document.getElementById('correo').value;
   var articulo = document.getElementById('art').value;
   var cantidad = document.getElementById('cantidad').value;
   var valor = document.getElementById('valor').value;
   var subtotal = Number(valor) * Number(cantidad);
   var itbis = 0.18;
   var total = "$"+(subtotal * itbis + subtotal);
   
   db.transaction(function(tx){
       if(id){
          tx.executeSql('UPDATE myTable SET NOMBRE=?,APELLIDO=?,TELEFONO=?, CORREO=?, ARTICULO=?, CANTIDAD=?, VALOR,SUBTOTAL=?, ITBIS=?, TOTAL=? WHERE ID=?',[nombre,apellido,telefono,correo,articulo,cantidad,valor,subtotal,itbis,total,id],null)
       }else{

        tx.executeSql("INSERT INTO myTable (NOMBRE, APELLIDO, TELEFONO, CORREO, ARTICULO, CANTIDAD, VALOR,SUBTOTAL, ITBIS, TOTAL) VALUES(?,?,?,?,?,?,?,?,?,?);",[nombre,apellido,telefono,correo,articulo,cantidad,valor,subtotal,itbis,total]);
       }
   });
   mostrar();
   limpiarCampo();
}

function mostrar(){
    var table = document.getElementById('tbody-register');
    db.transaction(function(tx){
        tx.executeSql('Select *from myTable', [], function(tx,resultado){
            var rows = resultado.rows;
            var tr = '';
            for(var i = 0; i < rows.length; i++){
                tr += '<tr>';
                tr += '<td onClick="actualizar('+ rows[i].ID+ ')">' + rows[i].NOMBRE + '</td>';
                tr += '<td>' + rows[i].APELLIDO + '</td>';
                tr += '<td>' + rows[i].TELEFONO + '</td>';
                tr += '<td>' + rows[i].CORREO + '</td>';
                tr += '<td>' + rows[i].ARTICULO + '</td>';
                tr += '<td>' + rows[i].CANTIDAD + '</td>';
                tr += '<td>' + rows[i].VALOR + '</td>';
                tr += '<td>' + rows[i].SUBTOTAL + '</td>';
                tr += '<td>' + rows[i].ITBIS + '</td>';
                tr += '<td>' + rows[i].TOTAL + '</td>';
                tr += '</tr>';
            }
            table.innerHTML = tr;
        });
    },null);
}

function actualizar(_id){
    var id = document.getElementById('id');
    var nombre = document.getElementById('nombre');
    var apellido = document.getElementById('apellido');
    var telefono = document.getElementById('tel');
    var correo = document.getElementById('correo');
    var articulo = document.getElementById('art');
    var cantidad = document.getElementById('cantidad');
    var valor = document.getElementById('valor');
    var subtotal = Number(valor) * Number(cantidad);
    var itbis = 0.18;
    var total = "$"+(subtotal * itbis + subtotal);

    id.value = _id;

    db.transaction(function(tx){
        tx.executeSql('SELECT * FROM myTable WHERE ID=?', [_id], function(tx, resultado) {
            var rows = resultado.rows[0];

            nombre.value = rows.NOMBRE ;
            apellido.value = rows.APELLIDO ;
            telefono.value = rows.TELEFONO ;
            correo.value = rows.CORREO ;
            articulo.value = rows.ARTICULO ;
            cantidad.value = rows.CANTIDAD ;
            valor.value = rows.VALOR ;
            subtotal.value = rows.SUBTOTAL ;
            itbis.value = rows.ITBIS ;
            total = rows.TOTAL ;
        });
    });
}

function borrar(){
    
    var id = document.getElementById('id').value;
    
    db.transaction(function(tx) {
        tx.executeSql("DELETE FROM myTable WHERE ID=?", [id]);
    });
    
    mostrar();
    limpiarCampo();
}


function CreatePDF(){
    var sTable = document.getElementById('tab').innerHTML;

    var style = "<style>";
        style = style + "table {width: 100%;font: 17px Calibri;}";
        style = style + "table, th, td {border: solid 1px #DDD; border-collapse: collapse;";
        style = style + "padding: 2px 3px;text-align: center;}";
        style = style + "</style>";

    var win = window.open('','','height=700, width=700');

    win.document.write('<html><head>');
    win.document.write('<title>Cotizacion</title>');
    win.document.write(style);
    win.document.write('</head>');
    win.document.write('<body>');
    win.document.write(sTable);
    win.document.write('</body></html>');

    win.document.close();

    win.print();
}
