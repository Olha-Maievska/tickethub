import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { GetEventsResponseDto } from './dto/get-event-respose.dto'
import { config } from '../../../core/config'
import { GetSingleEventResponseDto } from './dto/get-single-event-respose-dto'
import { GetSectorsResponseDto } from './dto/get-sectors-response-dto'
import { GetRatesResponseDto } from './dto/get-rate-respnse-dto'
import { CreateOrderRequestDto } from './dto/create-order-request.dto copy'
import { CreateOrderResponseDto } from './dto/create-order-response.dto'
import { InternalEvent, SingleEvent } from '../domain/event'

export const eventsApi = createApi({
  reducerPath: 'eventsApi',
  baseQuery: fetchBaseQuery({ baseUrl: config.api.host }),
  endpoints: (builder) => ({
    getEvents: builder.query<InternalEvent[], number>({
      query: (page) => `/api/event?page=${page}`,
      transformResponse: (response: GetEventsResponseDto) => {
        return response.map<InternalEvent>((event) => ({
          id: event.id,
          thumb: event.thumb,
        }))
      },
    }),
    getSingleEvent: builder.query<SingleEvent, number>({
      query: (id) => `/api/event/${id}`,
      transformResponse: (response: GetSingleEventResponseDto) => {
        return {
          id: response.id,
          name: response.name,
          description: response.description,
          image: response.image,
          thumb: response.thumb,
          similarEvents: response.similarEvents.map<InternalEvent>((event) => ({
            id: event.id,
            thumb: event.thumb,
          })),
          dates: response.dates.map((date) => ({
            id: date.id,
            name: date.name,
            date: date.date,
          })),
          venue: {
            id: response.venue.id,
            address: response.venue.address,
            location: {
              longitude: response.venue.location.longitude,
              latitude: response.venue.location.latitude,
            },
            name: response.venue.name,
          },
        }
      },
    }),
    getSectors: builder.query<GetSectorsResponseDto, number>({
      query: (id) => `/api/eventDate/${id}/sectors`,
    }),
    getRates: builder.query<GetRatesResponseDto, number>({
      query: (id) => `/api/sectors/${id}/rates`,
    }),
    // prettier-ignore
    createOrder: builder.mutation<CreateOrderResponseDto, CreateOrderRequestDto>({
      query: (body: CreateOrderRequestDto) => ({
        url: '/api/order',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const {
  useGetEventsQuery,
  useGetSingleEventQuery,
  useLazyGetSectorsQuery,
  useLazyGetRatesQuery,
  useCreateOrderMutation,
} = eventsApi
