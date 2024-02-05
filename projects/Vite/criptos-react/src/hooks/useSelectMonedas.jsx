import styled from '@emotion/styled'
import { useState } from 'react'

const Label = styled.label`
color: #FFF;
display: block;
font-family: 'Lato', sans-serif;
font-size: 24px;
font-weight: 700;
margin: 15px 0;
`

const Select = styled.select`
width: 100%;
font-size: 18px;
padding: 14px;
border-radius: 10px;
`


const useSelectMonedas = (label, monedas) => {

    const [state, setState] = useState('')

    //Return de React con (), indica que vamos imprimir algo en la pantalla por lo tanto es un elemento <></> ect
    const SelectMonedas = () => (
        <>
            <Label htmlFor="moneda">{label}</Label>
            <Select
                name="moenda"
                id="moneda"
                value={state}
                onChange={e => setState(e.target.value)}
            >
                <option value="">Seleccione</option>
                {monedas.map((moneda) => (
                    <option
                        key={moneda.id}
                        value={moneda.id}
                    >
                        {moneda.nombre}
                    </option>
                ))}
            </Select>
        </>
    )


    //Retorna un objeto o un arreglo
    return [state, SelectMonedas]

}

export default useSelectMonedas
