import { useEffect, useMemo, useReducer } from 'react';
import Form from './components/Form';
import { activityReducer, initialState } from './reducers/activity-reducers';
import ActivitiesList from './components/ActivitiesList';
import CaloriesTraker from './components/CaloriesTraker';


function App() {

  const [state, dispatch] = useReducer(activityReducer, initialState)

  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(state.activities))
  }, [state.activities])

  const canReset = () => useMemo(() =>
    state.activities.length, [state.activities]
  )

  return (
    <>
      <header className="bg-lime-600 py-3 ">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-center text-lg font-bold text-white uppercase">Contador de Calorías</h1>
          <button
            className="border p-3 rounded-lg bg-white hover:bg-lime-300 cursor-pointer disabled:opacity-10"
            disabled={!canReset()}
            onClick={() => dispatch({ type: 'reset-activities' })}
          >
            Resetear app
          </button>
        </div>
      </header >

      <section className="bg-lime-500 py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <Form
            dispatch={dispatch}
            state={state}
          />
        </div>
      </section>

      <section className='bg-gray-900 p-10'>
        <div className='max-w-4xl mx-auto'>
          <CaloriesTraker
            activities={state.activities}
          />
        </div>
      </section>

      <section className='p-10 mx-auto max-w-4xl'>
        <ActivitiesList
          activities={state.activities}
          dispatch={dispatch}
        />
      </section>
    </>
  )
}

export default App
