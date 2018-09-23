import {combineReducers } from 'redux'
import {ADD_HEX, ADD_HEX_DEFINITION, DELETE_HEX_DEFINITION} from '../actions/hexes'
import {UPDATE_TABLE_ENTRY} from '../actions/tabledetails'
import {arrayWithPush, arrayWithItemRemoved} from './helpers'

function byId(state=null, action) {
  console.log(state)
  console.log(action)
  switch (action.type) {
    case ADD_HEX_DEFINITION: return byIdAddHexDefinition(state, action)
    case DELETE_HEX_DEFINITION: return byIdDeleteHexDefinition(state, action)
    case UPDATE_TABLE_ENTRY: return byIdUpdateTableEntry(state, action)
    default: return state
  }
}

function allIds(state=null, action) {
  console.log(state)
  console.log(action)
  switch (action.type) {
    case ADD_HEX_DEFINITION: return allIdsAddHexDefinition(state, action)
    case DELETE_HEX_DEFINITION: return allIdsDeleteHexDefinition(state, action)
    case UPDATE_TABLE_ENTRY: return allIdsUpdateTableEntry(state, action)
    default: return state
  }
}

function byIdAddHexDefinition(state, action) {
  return ({
    ...state,
    [action.payload.newEntryDetailId]: {id: action.payload.newEntryDetailId, text: action.payload.newEntryDetailText}
  })
}

function byIdDeleteHexDefinition(state, action) {
  return ({
    ...state,
    [action.payload.entryDetailId]: undefined
  })
}

function byIdUpdateTableEntry(state, action) {
  /*
  1. Remove all entryDetails found in prevTableEntry
  2. Add all entryDetails found in tableEntry
  */
  const newState = {
    ...state
  }
  action.payload.prevTableEntry.entryDetails.map(
    ed => newState[ed.id] = undefined
  )
  action.payload.tableEntry.entryDetails.map(
    ed => newState[ed.id] = {id: ed.id, text: ed.text}
  )
  return newState
}

function allIdsAddHexDefinition(state, action) {
  return ([...state, action.payload.newEntryDetailId])
}

function allIdsDeleteHexDefinition(state, action) {
  return state.filter(item => item !== action.payload.entryDetailId)
}

function allIdsUpdateTableEntry(state, action) {
  /*
  1. Remove all entryDetails found in prevTableEntry
  2. Add all entryDetails found in tableEntry
  */
  let newState = [
    ...state
  ]
  for (let i; i < action.payload.prevTableEntry.entryDetails.length; i++) {
    newState = arrayWithItemRemoved(newState, action.payload.prevTableEntry.entryDetails[i].id)
  }
  for (let i; i < action.payload.tableEntry.entryDetails.length; i++) {
    newState = arrayWithPush(newState, action.payload.tableEntry.entryDetails[i].id)
  }
}

export default combineReducers({byId: byId, allIds: allIds})
