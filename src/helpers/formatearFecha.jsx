  

export const formatearFecha = fecha => {
    //si se pasa la fecha normal aparece un dia antes, si se cambia a esta forma
    // la fecha se corrige
    
 const nuevaFecha = new Date(fecha.split('T')[0].split('-'))
 const opciones = {
    weekday:'long',
    year:'numeric',
    month:'long',
    day:'numeric'
 }
 return nuevaFecha.toLocaleDateString('es-ES', opciones)
}

 
