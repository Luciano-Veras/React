import { useEffect, useState } from 'react'
import useSelectMonedas from '../hooks/useSelectMonedas'
import Error from './Error'
import { monedas } from '../data/monedas'
import styled from '@emotion/styled'




const InputSubmit = styled.input`
width: 100%;
background-color: #9497FF;
padding: 10px;
border-radius: 5px;
color: #FFF;
border: none;
font-weight: 700;
text-transform: uppercase;
font-size: 20px;
transition: background-color .3s ease;
margin-top: 30px;

&:hover{
    cursor: pointer;
    background-color: #66a2f6;
}
`

const Formulario = ({ setMonedas }) => {

    const [criptos, setCriptos] = useState([])
    const [error, setErorr] = useState(false)

    //no importa el nombre por que en los arreglos se devuelve por indice
    const [moneda, SelectMonedas] = useSelectMonedas('Elije tu moneda', monedas)
    const [criptomoneda, SelectCriptomoneda] = useSelectMonedas('Elije tu Criptomoneda', criptos)

    useEffect(() => {
        const consultarApi = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD'
            const respuesta = await fetch(url)
            const resultado = await respuesta.json()

            //.map devuelve un nuevo arreglo
            const arrayCriptos = resultado.Data.map(cripto => {
                const objeto = {
                    id: cripto.CoinInfo.Name,
                    nombre: cripto.CoinInfo.FullName
                }
                return objeto
            })
            setCriptos(arrayCriptos)
        }
        consultarApi()
    }, [])

    const handleSubmit = e => {
        e.preventDefault()
        if ([moneda, criptomoneda].includes('')) {
            setErorr(true)
            return
        }
        setErorr(false)
        setMonedas({
            moneda,
            criptomoneda
        })
    }

    return (
        <>
            {error && <Error>Todos los campos son obligatorios</Error>}
            <form
                onSubmit={handleSubmit}
            >
                <SelectMonedas />
                <SelectCriptomoneda />
                <InputSubmit type="submit" value="cotizar" />
            </form>
        </>
    )
}

export default Formulario
