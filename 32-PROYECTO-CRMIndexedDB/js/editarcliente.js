(function() {

    let DB

    const nombreInput = document.querySelector('#nombre')
    const correoInput = document.querySelector('#email')
    const telefonoInput = document.querySelector('#telefono')
    const empresaInput = document.querySelector('#empresa')

    document.addEventListener('DOMContentLoaded', () => {
        conectarDB()

        // verificar el id de la url
        const parametrosURL = new URLSearchParams(window.location.search)
        const idCliente = parametrosURL.get('id')

        if(idCliente){
            setTimeout(() => {
                obtenerCliente(idCliente)
            }, 1000)
        }

    });

    function obtenerCliente(id){
        const transaction = DB.transaction(['crm'], 'readwrite')
        const objectStore = transaction.objectStore('crm')

        const cliente = objectStore.openCursor()
        cliente.onsuccess = function(event){
            const cursor = event.target.result

            if(cursor){
                if(cursor.value.id === Number(id)){
                    llenarFormulario(cursor.value)
                }

                cursor.continue()
            }
        }
    }

    function llenarFormulario(datosCliente){
        console.log(datosCliente)
        const { nombre, email, telefono, empresa } = datosCliente

        nombreInput.value = nombre
        correoInput.value = email
        telefonoInput.value = telefono
        empresaInput.value = empresa
    }

    function conectarDB(){
        const abrirConexion = window.indexedDB.open('crm', 1)

        abrirConexion.onerror = function(){
            console.log('Hubo un error')
        }

        abrirConexion.onsuccess = function(){
            DB = abrirConexion.result
        }
    }
})();