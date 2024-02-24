import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface SliceRate {
  id: number
  max: number
}

interface EventOrderState {
  date: number | null
  sector: number | null
  rate: SliceRate | null
  quantity: number | null
  eventID: number | null
}

const initialState: EventOrderState = {
  date: null,
  sector: null,
  rate: null,
  quantity: null,
  eventID: null,
}

export const eventOrderSlice = createSlice({
  name: 'eventOrder',
  initialState,
  reducers: {
    setEventDate: (state, action: PayloadAction<number | null>) => {
      state.date = action.payload
    },
    setSector: (state, action: PayloadAction<number | null>) => {
      state.sector = action.payload
    },
    setRate: (state, action: PayloadAction<SliceRate | null>) => {
      if (action.payload === null) {
        state.rate = null
        return
      }
      state.rate = { ...action.payload }
    },
    setQty: (state, action: PayloadAction<number | null>) => {
      state.quantity = action.payload
    },
    setEventID: (state, action: PayloadAction<number | null>) => {
      state.eventID = action.payload
    },
  },
})

export const { setEventDate, setSector, setRate, setQty, setEventID } =
  eventOrderSlice.actions

export const { reducer: eventOrderReducer } = eventOrderSlice
