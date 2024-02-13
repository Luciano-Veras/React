export async function obtenerClientes() {
    //para consumir Rest Api utilizamos en este caso una variable de entorno
    const respuesta = await fetch(import.meta.env.VITE_API_URL)

    const resultados = await respuesta.json()

    return resultados
}

export async function obtenerCliente(id) {
    //para consumir Rest Api utilizamos en este caso una variable de entorno
    const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`)

    const resultados = await respuesta.json()

    return resultados
}

export async function agregarCliente(datos) {

    try {
        //debemos indicar el metedo, si no ponemos nada por defecto es GET (por eso no lo hicimos en obtener clientes), tambien le pasamos un body, que son los datos que enviamos, y headers para avisar que es una peticion tipo JSON
        const respuesta = await fetch(import.meta.env.VITE_API_URL, {
            method: 'POST',
            body: JSON.stringify(datos),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        await respuesta.json()
    } catch (error) {
        console.log(error)
    }
}

export async function actualizarCliente(id, datos) {
    try {
        //debemos indicar el metedo, si no ponemos nada por defecto es GET (por eso no lo hicimos en obtener clientes), tambien le pasamos un body, que son los datos que enviamos, y headers para avisar que es una peticion tipo JSON
        const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(datos),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        await respuesta.json()
    } catch (error) {
        console.log(error)
    }
}

export async function eliminarCliente(id) {
    try {
        //debemos indicar el metedo, si no ponemos nada por defecto es GET (por eso no lo hicimos en obtener clientes), tambien le pasamos un body, que son los datos que enviamos, y headers para avisar que es una peticion tipo JSON
        const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
            method: 'DELETE',
        })

        await respuesta.json()
    } catch (error) {
        console.log(error)
    }
}