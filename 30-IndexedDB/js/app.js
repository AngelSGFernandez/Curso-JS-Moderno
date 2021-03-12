let DB

document.addEventListener('DOMContentLoaded', 
() => {
    crmDB()

    setTimeout(
        () =>{
            crearCliente()
        },
        5000
    )
})

function crmDB()
{
    // Crear base de datos version 1.0
    let crmDB = window.indexedDB.open('crm', 1)

    // Verificar si hay un error
    crmDB.onerror = function() 
    {
        console.log('Hubo un error a la hora de crear la BD')
    }

    // Verificar si se creo bien
    crmDB.onsuccess = function()
    {
        console.log('Base de datos Creada!')

        DB = crmDB.result
    }

    // Configuración de la base de datos
    crmDB.onupgradeneeded = function(event)
    {
        const db = event.target.result;

        // Variable que interactua mucho con la base de datos
        const objectStore = db.createObjectStore('crm',
        {
            keyPath: 'crm',
            autoIncrement: true
        })

        // Definir las columnas
        objectStore.createIndex(
            'nombre', 
            'nombre',
            { unique: false }
            )

        objectStore.createIndex( 
            'email', 
            'email',
            { unique: true}
            )

        objectStore.createIndex(
            'telefono',
            'telefono',
            { unique: false}
            )

        console.log('columnas creadas')
    }

}

function crearCliente()
{
    //DB.transaction(donde se crea la db, el modo)
    /*
    IDBDatabase.transaction
    (storeNames: string | string[], mode?: IDBTransactionMode): IDBTransaction
    Returns a new transaction with the given mode 
    ("readonly" or "readwrite") and scope 
    which can be a single object store name or an array of names. 
    */
    let transaction = DB.transaction(
        ['crm'],
        'readwrite'
        )

    transaction.oncomplete = function()
    {
        console.log('Transaccion completa')
    }

    transaction.onerror = function()
    {
        console.log('Hubo un error en la transacción')
    }

    // Objeto para hacer la transacción
    const objectStore = transaction.objectStore('crm')

    const nuevoCliente = 
    {
        telefono: 8181818181,
        nombre: 'Angel',
        email: 'prueba@prueba.com'
    }

    const peticion = objectStore.add(nuevoCliente);

    console.log(peticion)
}