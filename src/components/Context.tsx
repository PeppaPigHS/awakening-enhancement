import React, { useReducer, useContext, useEffect } from 'react'

export interface IState {
  level: number
  valkType: number
  useRestore: boolean
  restoreCount: number
  crystalCount: number
  enhanceList: string[]
  selectedLevel: string
  history: string[]
}

const historyLimit: number = 5

export const chance: number[] = [
  75,
  60,
  40,
  20,
  10,
  5,
  2.5,
  1.25,
  0.625,
  0.3125,
]
export const valkRate: number[] = [1, 1.1, 1.5]
export const displayLevel: string[] = [
  '+40',
  'I',
  'II',
  'III',
  'IV',
  'V',
  'VI',
  'VII',
  'VIII',
  'IX',
  'X',
]

const initialState: IState = {
  level: 0,
  valkType: 0,
  useRestore: false,
  restoreCount: 0,
  crystalCount: 0,
  enhanceList: displayLevel.slice(1, displayLevel.length),
  selectedLevel: null,
  history: [],
}

type StateAction =
  | {
      type: 'SET_STATE'
      payload: IState
    }
  | {
      type: 'SET_LEVEL'
      payload: number
    }
  | {
      type: 'SET_ENHANCELIST'
      payload: string[]
    }
  | {
      type: 'SET_SELECTEDLEVEL'
      payload: string
    }
  | {
      type: 'SET_USERESTORE'
      payload: boolean
    }
  | {
      type: 'SET_VALKTYPE'
      payload: number
    }
  | {
      type: 'SET_HISTORY'
      payload: string[]
    }
  | {
      type: 'RESET'
    }

const reducerState = (state: IState, action: StateAction) => {
  switch (action.type) {
    case 'SET_STATE':
      return Object.assign({}, action.payload, {})
    case 'SET_LEVEL':
      return Object.assign({}, state, {
        level: action.payload,
      })
    case 'SET_SELECTEDLEVEL':
      return Object.assign({}, state, {
        selectedLevel: action.payload,
      })
    case 'SET_ENHANCELIST':
      return Object.assign({}, state, {
        enhanceList: action.payload,
      })
    case 'SET_USERESTORE':
      return Object.assign({}, state, {
        useRestore: action.payload,
      })
    case 'SET_VALKTYPE':
      return Object.assign({}, state, {
        valkType: action.payload,
      })
    case 'SET_HISTORY':
      return Object.assign({}, state, {
        history: [...action.payload],
      })
    case 'RESET':
      return Object.assign({}, initialState, {})
    default:
      return state
  }
}

const GlobalContext = React.createContext<IState>(initialState)

export const useGlobalState = () => useContext(GlobalContext)

const GlobalDispatch = React.createContext<React.Dispatch<StateAction>>(null)

export const useGlobalDispatch = () => useContext(GlobalDispatch)

const Context = ({ children }) => {
  const [state, dispatch] = useReducer<React.Reducer<IState, StateAction>>(
    reducerState,
    initialState
  )

  useEffect(() => {
    dispatch({
      type: 'SET_ENHANCELIST',
      payload: displayLevel.slice(state.level + 1, displayLevel.length + 1),
    })
  }, [state.level])

  useEffect(() => {
    if (state.history.length > historyLimit)
      dispatch({
        type: 'SET_HISTORY',
        payload: state.history.slice(
          state.history.length - historyLimit,
          state.history.length
        ),
      })
  }, [state.history.length])

  return (
    <GlobalDispatch.Provider value={dispatch}>
      <GlobalContext.Provider value={state}>{children}</GlobalContext.Provider>
    </GlobalDispatch.Provider>
  )
}

export default Context
