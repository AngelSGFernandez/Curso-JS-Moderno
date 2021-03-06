(function () {

  let DB;

//   const listadoClientes = document.querySelector('#listado-clientes');

  document.addEventListener("DOMContentLoaded", () => {
    crearDB();

    if(window.indexedDB.open('crm', 1)) {
        obtenerCliente();
    }
  });

  // Crear la base de datos de IndexDB
  function crearDB() {
    // Se abre la conexión
    const crearDB = window.indexedDB.open("crm", 1);

    crearDB.onerror = function () {
      console.log("Hubo un error");
    };

    crearDB.onsuccess = function () {
      // Asignamos a la variable global
      DB = crearDB.result
        //Mostar clientes de la BD
        // mostrarClientes();
    };

    crearDB.onupgradeneeded = function (event) {
      const db = event.target.result;

      const objectStore = db.createObjectStore("crm", {
        keyPath: "id",
        autoIncrement: true,
      });

      objectStore.createIndex("nombre", "nombre", { unique: false });
      objectStore.createIndex("email", "email", { unique: true });
      objectStore.createIndex("telefono", "telefono", { unique: false });
      objectStore.createIndex("empresa", "empresa", { unique: false });
      objectStore.createIndex("id", "id", { unique: true });

      console.log("DB Lista y lista");
    };
  };

  function obtenerCliente() {
      const abrirConexion = window.indexedDB.open('crm', 1);

      abrirConexion.onerror = function() {
          console.log('Hubo un error');
      };

      abrirConexion.onsuccess = function() {
          DB = abrirConexion.result;

          const objectStore = DB.transaction("crm").objectStore('crm');

          objectStore.openCursor().onsuccess = function (event) {
              const cursor = event.target.result;

              if(cursor) {
                const { nombre, 
                    email, 
                    telefono, 
                    empresa, 
                    id } = cursor.value;

                    const listadoClientes = document.querySelector('#listado-clientes');
                    listadoClientes.innerHTML += ` <tr>
                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                        <p class="text-sm leading-5 font-medium text-gray-700 text-lg  font-bold"> ${nombre} </p>
                        <p class="text-sm leading-10 text-gray-700"> ${email} </p>
                    </td>
                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
                        <p class="text-gray-700">${telefono}</p>
                    </td>
                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200  leading-5 text-gray-700">    
                        <p class="text-gray-600">${empresa}</p>
                    </td>
                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
                        <a href="editar-cliente.html?id=${id}" class="text-teal-600 hover:text-teal-900 mr-5">Editar</a>
                        <a href="#" data-cliente="${id}" class="text-red-600 hover:text-red-900">Eliminar</a>
                    </td>
                </tr>
            `;

                  cursor.continue();
              } else {
                  console.log('No hay mas registros');
              };
          };
      };
  };

//   function mostrarClientes() {
//     // Leer el contenido de la base de datos
//     const objectStore = DB.transaction("crm").objectStore("crm");

//     // Ineramos sobre los registros con cursor
//     objectStore.openCursor().onsuccess = function (event) {
//       const cursor = event.target.result;

//       if(cursor) {
//           const {
//               nombre,
//               email,
//               telefono,
//               empresa,
//               id
//           } = cursor.value;console.log(true)
          
//           const trCliente = document.createElement("tr");
//         //   trCliente.dataset.id = id;

//           const nombreEmailTd = document.createElement("td");
//           nombreEmailTd.innerHTML = `
//           <p>${nombre}</p>
//           <p>${email}</p>
//           `;

//           const telefonoTd = document.createElement("td");
//           telefonoTd.innerHTML = `
//           <p>${telefono}</p>
//           `;

//           const empresaTd = document.createElement("td");
//           empresaTd.innerHTML = `
//           <p>${empresa}</p>
//           `;

//           const editarEliminaTd = document.createElement("td");
//           editarEliminaTd.innerHTML = `
//           <a>Editar</a>
//           <a>Eliminar</a>
//           `;

//           // Agregar al HTMl
//           trCliente.appendChild(nombreEmailTd)
//           trCliente.appendChild(telefonoTd)
//           trCliente.appendChild(empresaTd)
//           trCliente.appendChild(editarEliminaTd)
          
//           listadoClientes.appendChild(trCliente);

//           // Ir al siguiente elemento
//           cursor.continue();
//       };

//     };
//   };
})();
