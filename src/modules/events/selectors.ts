import { RootState } from '../../store'

export const getSelectedDate = (state: RootState) =>
  state.eventOrderReducer.date

export const getSelectedSector = (state: RootState) =>
  state.eventOrderReducer.sector

export const getSelectedRate = (state: RootState) =>
  state.eventOrderReducer.rate

export const getSelectedQty = (state: RootState) =>
  state.eventOrderReducer.quantity

export const getEventID = (state: RootState) => state.eventOrderReducer.eventID
