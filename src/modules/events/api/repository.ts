import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { GetEventsResponseDto } from './dto/get-event-respose.dto'
import { config } from '../../../core/config'
import { GetSingleEventResponseDto } from './dto/get-single-event-respose-dto'
import { GetSectorsResponseDto } from './dto/get-sectors-response-dto'
import { GetRatesResponseDto } from './dto/get-rate-respnse-dto'

export const eventsApi = createApi({
  reducerPath: 'eventsApi',
  baseQuery: fetchBaseQuery({ baseUrl: config.api.host }),
  endpoints: (builder) => ({
    getEvents: builder.query<GetEventsResponseDto, unknown>({
      query: () => '/api/event',
    }),
    getSingleEvent: builder.query<GetSingleEventResponseDto, number>({
      query: (id) => `/api/event/${id}`,
    }),
    getSectors: builder.query<GetSectorsResponseDto, number>({
      query: (id) => `/api/eventDate/${id}/sectors`,
    }),
    getRates: builder.query<GetRatesResponseDto, number>({
      query: (id) => `/api/sectors/${id}/rates`,
    }),
  }),
})

export const {
  useGetEventsQuery,
  useGetSingleEventQuery,
  useLazyGetSectorsQuery,
  useLazyGetRatesQuery,
} = eventsApi
