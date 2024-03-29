import Paciente from "./Paciente"

function ListadoPacientes({ pacientes, setPaciente, eliminarPaciente }) {



    return (
        <div className="md:w-1/2 lg:w-3/5 h-screen overflow-y-scroll">

            {pacientes && pacientes.length ? (
                <>
                    <h2 className="font-black text-3xl text-center ">Listado de pacientes</h2>
                    <p className="text-center text-xl mt-5 mb-10">
                        Administra tus {""}
                        <span className="text-indigo-600 font-bold ">Pacientes y Citas</span>
                    </p>

                    {pacientes.map(paciente => (
                        <Paciente
                            key={paciente.id}
                            paciente={paciente}
                            setPaciente={setPaciente}
                            eliminarPaciente={eliminarPaciente}
                        />
                    ))}
                </>
            ) : (
                <>
                    <h2 className="font-black text-3xl text-center ">No hay pacientes</h2>
                    <p className="text-center text-xl mt-5 mb-10">
                        Agregar pacientes y los prodra  {""}
                        <span className="text-indigo-600 font-bold ">administrar aca</span>
                    </p>
                </>
            )
            }




        </div>

    )
}

export default ListadoPacientes