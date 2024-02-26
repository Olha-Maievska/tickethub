import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface SliceRate {
  id: number
  max: number
}

interface SliceSector {
  id: number
  name: string
}

interface SliceDate {
  id: number
  date: string
}

interface EventOrderState {
  date: SliceDate | null
  sector: SliceSector | null
  rate: SliceRate | null
  quantity: number | null
  eventID: number | null
  eventConfirmation: string | null
}

const initialState: EventOrderState = {
  date: null,
  sector: null,
  rate: null,
  quantity: null,
  eventID: null,
  eventConfirmation: null,
}

export const eventOrderSlice = createSlice({
  name: 'eventOrder',
  initialState,
  reducers: {
    setEventDate: (state, action: PayloadAction<SliceDate | null>) => {
      if (action.payload === null) {
        state.date = null
        return
      }
      state.date = { ...action.payload }
    },
    setSector: (state, action: PayloadAction<SliceSector | null>) => {
      if (action.payload === null) {
        state.sector = null
        return
      }
      state.sector = { ...action.payload }
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
    setConfirmationCode: (state, action: PayloadAction<string | null>) => {
      state.eventConfirmation = action.payload
    },
    cleanEventOrderState: () => initialState,
  },
})

export const {
  setEventDate,
  setSector,
  setRate,
  setQty,
  setEventID,
  setConfirmationCode,
  cleanEventOrderState,
} = eventOrderSlice.actions

export const { reducer: eventOrderReducer } = eventOrderSlice
