(function() {

    // let DB
    // const formulario = document.querySelector('#formulario')
    let idCliente

    const nombreInput = document.querySelector('#nombre')
    const correoInput = document.querySelector('#email')
    const telefonoInput = document.querySelector('#telefono')
    const empresaInput = document.querySelector('#empresa')

    

    document.addEventListener('DOMContentLoaded', () => {
        conectarDB()

        // Actualizar el registro
        form.addEventListener('submit', actualizarCliente)

        // verificar el id de la url
        const parametrosURL = new URLSearchParams(window.location.search)
        idCliente = parametrosURL.get('id')

        if(idCliente){
            setTimeout(() => {
                obtenerCliente(idCliente)
            }, 100)
        }

      

    })

    function actualizarCliente(event){
        event.preventDefault()

        if(nombreInput.value === '' || correoInput === '' || empresaInput === '' || telefonoInput === ''){
            imprimirAlerta('Todos los campos son obligatorio', 'error')

            return
        }

          // Actualizar cliente
          const clienteActualizado = {
            nombre: nombreInput.value,
            email: correoInput.value,
            empresa: empresaInput.value,
            telefono: telefonoInput,
            id: Number(idCliente)
        }

        const transaction = DB.transaction(['crm'], 'readwrite')
        const objectStore = transaction.objectStore('crm')

        objectStore.put(clienteActualizado);

        transaction.oncomplete = function(){
            console.log('Editado correctamente')
        }

        transaction.onerror = function(){
            console.log('Hubo un error')
        }
    }

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