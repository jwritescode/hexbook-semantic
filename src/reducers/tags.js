import { combineReducers } from 'redux'
import { ADD_HEX } from '../actions/hexes'

function byId(state=null, action) {
  console.log(state)
  switch (action.type) {
    case ADD_HEX:
      return ({
        ...state,
        [action.payload.terrain]: {
          id: action.payload.terrain,
          text: action.payload.terrain
        },
        [action.payload.territory]: {
          id: action.payload.territory,
          text: action.payload.territory
        }
      })

    default:
      return state
  }
}

function allIds(state=null, action) {
  console.log(state)
  switch (action.type) {
    case ADD_HEX:
      // We want to avoid duplicates in the list, so doing some filtering here
      const newState = [...state.filter(item => item != action.payload.territory), action.payload.territory]
      return [...newState.filter(item => item != action.payload.terrain), action.payload.terrain].sort()

    default:
      return state
  }
}

export default combineReducers({byId: byId, allIds: allIds})