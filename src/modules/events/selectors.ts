import { RootState } from '../../store'

export const getSelectedDate = (state: RootState) =>
  state.eventOrderReducer.date

export const getSelectedSector = (state: RootState) =>
  state.eventOrderReducer.sector