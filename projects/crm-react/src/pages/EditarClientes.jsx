import Formulario from "../components/Formulario"
import Error from "../components/Error"
import { Form, useNavigate, useLoaderData, useActionData, redirect } from "react-router-dom"
import { obtenerCliente, actualizarCliente } from "../data/clientes"






export async function loader({ params }) {
    const cliente = await obtenerCliente(params.clienteId)
    //validamos que sea un cliente con un id que exista
    if (Object.values(cliente).length === 0) {
        throw new Response('', {
            status: 404,
            statusText: 'No hay resultado'
        })
    }
    return cliente
}

export async function action({ request, params }) {

    //Recuperamos los datos del formulario
    const formData = await request.formData()
    const datos = Object.fromEntries(formData)

    //Validacion de datos del formulario
    const errores = []
    if (Object.values(datos).includes('')) {
        errores.push('Todos los campos son obligatorios')
    }
    //Validamos un capo en particular, en este caso el mail, y lo hacemos con expresion regular
    const email = formData.get('email')
    let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])")
    if (!regex.test(email)) {
        // .test una funcion para expresiones regulares, y valida si cumple con el formato de la expresion regular (regex) si no cumple la condicion evaluada da false por lo tanto para que se ejecute la linea 21 se debe negar dicha validacion
        errores.push('El email no es valido')
    }

    //Retornar si hay errores
    if (Object.keys(errores).length) {
        return errores
    }

    await actualizarCliente(params.clienteId, datos)

    //usamos el hooks redirect de RRD
    return redirect('/')
}




function EditarClientes() {

    const navigate = useNavigate()
    const cliente = useLoaderData()
    const errores = useActionData()



    return (
        <>
            <h1 className="font-bold text-4xl text-blue-900">Editar Cliente</h1>
            <p className="mt-3">Modifcar los datos del Cliente</p>

            <div className="flex justify-end">
                <button
                    className="bg-blue-800 text-white px-3 py-1 uppercase rounded-lg"
                    onClick={() => navigate('/')}
                >
                    Volver
                </button>
            </div>

            <div className="bg-white shadow rounded-md md:3/4 mx-auto px-5 py-10 mt-3">

                {errores?.length && errores.map((error, i) =>
                    <Error
                        key={i}
                    >
                        {error}
                    </Error>
                )}

                <Form
                    method="POST"
                    noValidate
                >
                    <Formulario
                        cliente={cliente}
                    />
                    <input
                        type="submit"
                        value="Guardar Cambios"
                        className="bg-blue-800 mt-5 w-full p-3 text-white font-bold uppercase text-lg cursor-pointer rounded-md hover:bg-blue-700"
                    />
                </Form>
            </div>
        </>
    )
}

export default EditarClientes
