const Formulario = ({ cliente }) => {
    return (
        <>
            <div className="mb-4">
                <label
                    htmlFor="nombre"
                    className="text-gray-800"
                >
                    Nombre:
                </label>
                <input
                    id="nombre"
                    type="text"
                    placeholder="Nombre del Cliente"
                    name="nombre"
                    className="mt-2 block w-full p-3 bg-gray-100"
                    defaultValue={cliente?.nombre}
                />
            </div>
            <div className="mb-4">
                <label
                    htmlFor="empresa"
                    className="text-gray-800"
                >
                    Empresa:
                </label>
                <input
                    id="empresa"
                    type="text"
                    placeholder="Empresa del Cliente"
                    name="empresa"
                    className="mt-2 block w-full p-3 bg-gray-100"
                    defaultValue={cliente?.empresa}
                />
            </div>
            <div className="mb-4">
                <label
                    htmlFor="email"
                    className="text-gray-800"
                >
                    Email:
                </label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email del Cliente"
                    className="bg-gray-100 block w-full p-3 mt-2"
                    defaultValue={cliente?.email}
                />
            </div>
            <div className="mb-4">
                <label
                    htmlFor="telefono"
                    className="text-gray-800"
                >
                    Telefono:
                </label>
                <input
                    type="tel"
                    name="telefono"
                    id="telefono"
                    placeholder="Telefono del Cliente"
                    className="bg-gray-100 block w-full p-3 mt-2"
                    defaultValue={cliente?.telefono}
                />
            </div>
            <div className="mb-4">
                <label
                    htmlFor="notas"
                    className="text-gray-800"
                >
                    Notas:
                </label>
                <textarea
                    as="textarea"
                    name="notas"
                    id="notas"
                    type="text"
                    placeholder="Notas del Cliente"
                    className="bg-gray-100 block mt-2 w-full p-3 h-40 aling-self"
                    defaultValue={cliente?.notas}
                />
            </div>
        </>
    )
}

export default Formulario
