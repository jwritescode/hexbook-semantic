import {combineReducers} from 'redux'
import {DELETE_OTHER_TAG} from '../actions/tags'
import {UPDATE_TABLE_ENTRY, DELETE_TABLE_ENTRY} from '../actions/tableentries'
import {DELETE_TABLE} from '../actions/tables'
import {arrayWithItemRemoved} from './helpers'

function byId(state=null, action) {
  console.log(state)
  console.log(action)
  switch (action.type) {
    case DELETE_OTHER_TAG: return byIdDeleteOtherTag(state, action)
    case UPDATE_TABLE_ENTRY: return byIdUpdateTableEntry(state, action)
    case DELETE_TABLE_ENTRY: return byIdDeleteTableEntry(state, action)
    case DELETE_TABLE: return byIdDeleteTable(state, action)
    default: return state
  }
}

function allIds(state=null, action) {
  console.log(state)
  console.log(action)
  switch (action.type) {
    case UPDATE_TABLE_ENTRY: return allIdsUpdateTableEntry(state, action)
    case DELETE_TABLE_ENTRY: return allIdsDeleteTableEntry(state, action)
    case DELETE_TABLE: return allIdsDeleteTable(state, action)
    default: return state
  }
}

function byIdDeleteOtherTag(state, action) {
  /*
  Remove any tagWeights related to the deleted tag
  */
  const tag = action.payload.tag
  const newState = {...state}
  Object.values(newState).forEach(
    tw => {
      if (tw.tag === tag) {
        newState[tw.id] = {
          ...newState[tw.id],
          tag: undefined
        }
      }
    }
  )
  return newState
}

function byIdUpdateTableEntry(state, action) {
  /*
  1. Remove all tag weights found in prevTableEntry
  2. Add tag weights found in tableEntry
  */
  const prevTagWeightIds = action.payload.prevTableEntry.tagWeights.map(tw => tw.id)
  const tagWeights = action.payload.tableEntry.tagWeights
  //remove prev
  const newState = {
    ...state,
  }
  for (let i = 0; i < prevTagWeightIds.length; i++) {
    newState[prevTagWeightIds[i]] = undefined
  }
  //add new
  for (let i = 0; i < tagWeights.length; i++) {
    newState[tagWeights[i].id] = {id: tagWeights[i].id, tag: tagWeights[i].tag, weight: tagWeights[i].weight}
  }
  return newState
}

function byIdDeleteTableEntry(state, action) {
  // Remove all tag weights found in tableEntry
  const tableEntry = action.payload.tableEntry
  const newState = {...state}
  tableEntry.tagWeights.forEach(
    tw => {
      newState[tw.id] = undefined
    }
  )
  return newState
}

function byIdDeleteTable(state, action) {
  // Remove all tagWeights in all tableEntries in table
  const table = action.payload.table
  const newState = {...state}
  table.tableEntries.forEach(
    te => {
      te.tagWeights.forEach(
        tw => {
          newState[tw.id] = undefined
        }
      )
    }
  )
  return newState
}

function allIdsUpdateTableEntry(state, action) {
  /*
  1. Remove all tagWeight IDs found in prevTableEntry
  2. Add all tagWeight IDs found in tableEntry
  */
  const prevTagWeightIds = action.payload.prevTableEntry.tagWeights.map(tw => tw.id)
  const tagWeightIds = action.payload.tableEntry.tagWeights.map(tw => tw.id)
  return [
    ...state.filter(id => !(prevTagWeightIds.includes(id))), //remove prev
    ...tagWeightIds //add new
  ]
}

function allIdsDeleteTableEntry(state, action) {
  // Remove all tagWeight IDs found in tableEntry
  const tagWeightIds = action.payload.tableEntry.tagWeights.map(tw => tw.id)
  return [
    ...state.filter(id => !(tagWeightIds.includes(id)))
  ]
}

function allIdsDeleteTable(state, action) {
  // Remove all tagWeights in all tableEntries in table
  const table = action.payload.table
  let newState = [...state]
  table.tableEntries.forEach(
    te => {
      te.tagWeights.forEach(
        tw => {
          newState = arrayWithItemRemoved(newState, tw.id)
        }
      )
    }
  )
  return newState
}

export default combineReducers({byId: byId, allIds: allIds})