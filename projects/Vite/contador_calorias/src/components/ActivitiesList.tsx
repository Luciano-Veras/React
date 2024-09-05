import { Activity } from "../types"
import { categories } from "../data/categories"
import { useMemo } from "react"
import { PencilSquareIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { ActivityActions } from "../reducers/activity-reducers"

type ActivitiesListProps = {
    activities: Activity[]
    dispatch: React.Dispatch<ActivityActions>
}


export default function ActivitiesList({ activities, dispatch }: ActivitiesListProps) {

    const categoryName = useMemo(() => (category: Activity['category']) => categories.map(cat => cat.id === category ? cat.name : ' '), [activities])

    const isEmptyActivities = useMemo(() => activities.length === 0, [activities])
    return (
        <>
            {isEmptyActivities ?
                <h2 className="font-black text-4xl text-slate-500 text-center">
                    No hay actividades aún...
                </h2> :

                <h2 className="font-black text-4xl text-slate-500 text-center">
                    Actividades y Comidas
                </h2>
            }

            {activities.map(activity => (
                <div
                    key={activity.id}
                    className="px-5 py-10 bg-white rounded-xl mt-5 flex justify-between shadow-xl">
                    <div className="space-y-2 relative">
                        <p className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold rounded-sm ${activity.category === 1 ? 'bg-lime-500' : 'bg-orange-500'}`}>{categoryName(+activity.category)}</p>
                        <p className="text-2xl font-bold pt-5">{activity.name}</p>
                        <p className="font-bold text-4xl text-lime-500">
                            {activity.calories} {''}
                            <span>Calorias</span>
                        </p>
                    </div>
                    <div className="flex gap-5 items-center">
                        <button
                            onClick={() => dispatch({ type: 'set-activeId', payload: { id: activity.id } })}
                        >
                            <PencilSquareIcon
                                className="h-8 w-8 text-gray-500"
                            />
                        </button>
                        <button
                            onClick={() => dispatch({ type: 'delete-activeId', payload: { id: activity.id } })}
                        >
                            <XCircleIcon
                                className="h-8 w-8 text-red-500"
                            />
                        </button>

                    </div>
                </div>
            ))}
        </>
    )
}
