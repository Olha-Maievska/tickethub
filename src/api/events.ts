import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { GetEventsResponseDto } from './dto/get-event-respose.dto'
import { config } from '../core/config'
import { GetSingleEventResponseDto } from './dto/get-single-event-respose-dto'
import { Sector } from './dto/get-sectors-response-dto'

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
    getSectors: builder.query<Sector, number>({
      query: (id) => `/api/eventDate/${id}/sectors`,
    }),
  }),
})

export const {
  useGetEventsQuery,
  useGetSingleEventQuery,
  useLazyGetSectorsQuery,
} = eventsApi
