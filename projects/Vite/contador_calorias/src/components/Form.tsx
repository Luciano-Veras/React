import { Dispatch, useEffect, useState } from "react"
import { v4 as uuidV4 } from 'uuid'
import { Activity } from "../types"
import { categories } from "../data/categories"
import { ActivityActions, ActiviyState } from "../reducers/activity-reducers"


type FormProps = {
    dispatch: Dispatch<ActivityActions>
    state: ActiviyState
}


export default function Form({ dispatch, state }: FormProps) {

    const initialState: Activity = {
        id: uuidV4(),
        category: 1,
        name: '',
        calories: 0
    }

    const [activity, setActivity] = useState<Activity>(initialState)

    useEffect(() => {
        if (state.activeId) {
            const selectActivity = state.activities.filter(stateActivity => stateActivity.id === state.activeId)[0]
            setActivity(selectActivity)
        }
    }, [state.activeId])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const isNumberField = ['category', 'calories'].includes(e.target.id)
        setActivity({
            ...activity,
            [e.target.id]: isNumberField ? +e.target.value : e.target.value
        })
    }

    const isValidActivity = () => {
        const { name, calories } = activity
        return name.trim() !== '' && calories > 0
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch({ type: 'save-activity', payload: { newActivity: activity } })
        setActivity({
            ...initialState,
            id: uuidV4()
        })

    }


    return (
        <div>
            <form
                className="space-y-5 bg-white shadow p-10 rounded-lg"
                onSubmit={handleSubmit}
            >
                <div className="grid grid-cols-1 gap-3">
                    <label
                        htmlFor="category"
                        className="font-bold"
                    >
                        Categoría:
                    </label>
                    <select
                        className="border border-slate-300 w-full p-2 rounded-lg bg-white"
                        name=""
                        id="category"
                        value={activity.category}
                        onChange={handleChange}
                    >
                        {categories.map(category => (
                            <option
                                key={category.id}
                                value={category.id}
                            >
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="grid grid-cols-1 gap-3">
                    <label
                        htmlFor="name"
                        className="font-bold"
                    >
                        Actividad:
                    </label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Ej. Jugo de naranja, Pastel de papas, Correr, Saltar soga... "
                        className="border border-s-teal-300 w-full p-2 rounded-lg bg-white"
                        value={activity.name}
                        onChange={handleChange}
                    />
                </div>

                <div className="grid grid-cols-1 gap-3">
                    <label
                        htmlFor="calories"
                        className="font-bold"
                    >
                        Calorias:
                    </label>
                    <input
                        id="calories"
                        type="number"
                        placeholder="Ej. 300 o 500... "
                        className="border border-s-teal-300 w-full p-2 rounded-lg bg-white"
                        value={activity.calories}
                        onChange={handleChange}
                    />
                </div>

                <input
                    type="submit"
                    value={activity.category === 1 ? 'Guardar Comida' : 'Guardar Ejercicio'}
                    className="border border-gray-600 w-full p-2 rounded-lg bg-black text-white font-serifs cursor-pointer hover:bg-opacity-95 shadow-lg disabled:opacity-30"
                    disabled={!isValidActivity()}
                />
            </form>
        </div>
    )
}
