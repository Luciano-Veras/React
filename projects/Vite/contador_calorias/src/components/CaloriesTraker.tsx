import { useMemo } from "react"
import { Activity } from "../types"
import CaloriesDisplay from "./CaloriesDisplay"

type CaloriesTrakerProps = {
    activities: Activity[]
}

export default function CaloriesTraker({ activities }: CaloriesTrakerProps) {

    const caloriesConsumed = useMemo(() => activities.reduce((total, activity) => activity.category === 1 ? total + activity.calories : total, 0), [activities])

    const caloriesQuemadas = useMemo(() => activities.reduce((total, activity) => activity.category === 2 ? total + activity.calories : total, 0), [activities])

    const netCalories = useMemo(() => caloriesConsumed - caloriesQuemadas, [activities])

    return (
        <div>
            <h2 className="text-4xl text-white text-center font-black">Resumen Calorías</h2>
            <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">

                <CaloriesDisplay
                    calories={caloriesConsumed}
                    text='Calorías consumidas'
                />

                <CaloriesDisplay
                    calories={caloriesQuemadas}
                    text='Calorías quemadas'
                />

                <CaloriesDisplay
                    calories={netCalories}
                    text='Diferencia'
                />
            </div>
        </div>
    )
}

