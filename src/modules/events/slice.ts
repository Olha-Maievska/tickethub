import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface EventOrderState {
  date: number | null
  sector: number | null
}

const initialState: EventOrderState = {
  date: null,
  sector: null,
}

export const eventOrderSlice = createSlice({
  name: 'eventOrder',
  initialState,
  reducers: {
    setEventDate: (state, action: PayloadAction<number>) => {
      state.date = action.payload
    },
    setSector: (state, action: PayloadAction<number>) => {
      state.sector = action.payload
    },
  },
})

export const { setEventDate, setSector } = eventOrderSlice.actions

export const { reducer: eventOrderReducer } = eventOrderSlice
