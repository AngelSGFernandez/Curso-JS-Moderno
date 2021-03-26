const aplicarDescuento = new Promise( (resolve, reject) => {
    const descuento = true

    if(descuento){
        resolve('Descuento aplicado')
    } else {
        reject('No se aplico el descuento')
    }
})

aplicarDescuento
.then( resultado => {
    descuento(resultado)
})
.catch( error => {
    console.log(error)
})

function descuento(mensaje){
    console.log(mensaje)
}
// console.log({aplicarDescuento})



// Hay 3 valores posibles...
// fullfilled - el promise se cumplio
// reject - El promise no se cumplio
// pending - No se ha cumplido y tampoco fue rechazado