export interface InternalEvent {
  id: number
  thumb: string
}

interface Location {
  longitude: string
  latitude: string
}

interface Venue {
  id: number
  address: string
  location: Location
  name: string
}

interface EventDate {
  id: number
  name: string
  date: string
}

export interface SingleEvent {
  id: number
  name: string
  description: string
  image: string
  thumb: string
  similarEvents: InternalEvent[]
  dates: EventDate[]
  venue: Venue
}
