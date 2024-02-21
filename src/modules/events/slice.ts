import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface EventOrderState {
  date: number | null
  sector: number | null
  rate: number | null
  quantity: number | null
}

const initialState: EventOrderState = {
  date: null,
  sector: null,
  rate: null,
  quantity: null,
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
    setRate: (state, action: PayloadAction<number>) => {
      state.rate = action.payload
    },
    setQty: (state, action: PayloadAction<number>) => {
      state.quantity = action.payload
    },
  },
})

export const { setEventDate, setSector, setRate, setQty } =
  eventOrderSlice.actions

export const { reducer: eventOrderReducer } = eventOrderSlice
