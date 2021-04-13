window.addEventListener('load', cargando);

function limpiarCampo(){
    
    document.getElementById('id').value = '';
    document.getElementById('nombre').value = '';
    document.getElementById('apellido').value = '';
    document.getElementById('tel').value = '';
    document.getElementById('correo').value = '';
    document.getElementById('art').value = '';
    document.getElementById('cantidad').value = '';
    document.getElementById('valor').value = '';

}
function carrega(){
    document.getElementById('nombre').addEventListener('blur', leave);
    document.getElementById('apellido').addEventListener('blur', leave);
    document.getElementById('tel').addEventListener('blur', leave);   
    document.getElementById('correo').addEventListener('blur', leave);   
    document.getElementById('art').addEventListener('blur', leave);   
    document.getElementById('cantidad').addEventListener('blur', leave);   
    document.getElementById('valor').addEventListener('blur', leave);   
}