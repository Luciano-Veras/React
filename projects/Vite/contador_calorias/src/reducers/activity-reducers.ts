import { Activity } from "../types";


export type ActivityActions =
    { type: 'save-activity', payload: { newActivity: Activity } } |
    { type: 'set-activeId', payload: { id: Activity['id'] } } |
    { type: 'delete-activeId', payload: { id: Activity['id'] } } |
    { type: 'reset-activities' }

export type ActiviyState = {
    activities: Activity[]
    activeId: Activity['id']
}

const localStorageActivities = (): Activity[] => {
    const activities = localStorage.getItem('activities')
    return activities ? JSON.parse(activities) : []
}

export const initialState: ActiviyState = {
    activities: localStorageActivities(),
    activeId: ''
}

export const activityReducer = (
    state: ActiviyState = initialState,
    action: ActivityActions
) => {
    if (action.type === "save-activity") {

        let upDateActivities: Activity[] = []

        if (state.activeId) {
            upDateActivities = state.activities.map(activity => activity.id === state.activeId ? action.payload.newActivity : activity)
        } else {
            upDateActivities = [...state.activities, action.payload.newActivity]
        }

        return {
            ...state,
            activities: upDateActivities,
            activeId: ''
        }
    }
    if (action.type === 'set-activeId') {
        return {
            ...state,
            activeId: action.payload.id
        }
    }
    if (action.type === 'delete-activeId') {
        return {
            ...state,
            activities: state.activities.filter(activity => activity.id !== action.payload.id)
        }
    }

    if (action.type === 'reset-activities') {
        return {
            activities: [],
            activeId: ''
        }

    }
    return state
}