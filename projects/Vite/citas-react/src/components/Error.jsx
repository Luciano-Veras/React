

function Error({ mensaje }) {
    return (
        <div className="bg-red-600 text-white font-bold text-center mb-3 p-3 uppercase rounded-md">
            <p>{mensaje}</p>
        </div>
    )
}

export default Error