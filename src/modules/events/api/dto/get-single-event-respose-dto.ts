export type GetSingleEventResponseDto = Event

interface Event {
  id: number
  name: string
  description: string
  image: string
  thumb: string
  similarEvents: SimilarEvent[]
  dates: Date[]
  venue: Venue2
}

interface Venue2 {
  id: number
  address: string
  location: Location
  name: string
}

interface Location {
  longitude: string
  latitude: string
}

interface Date {
  id: number
  name: string
  date: string
}

export interface SimilarEvent {
  id: number
  name: string
  thumb: string
  venue: Venue
}

interface Venue {
  id: number
  name: string
}
