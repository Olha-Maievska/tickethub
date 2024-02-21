import { FC } from 'react'
import { Event } from '../modules/events/api/dto/get-event-respose.dto'
import { SimilarEvent } from '../modules/events/api/dto/get-single-event-respose-dto'
import { EventCard } from '../modules/events/components/event-cars.component'

interface EventListProps {
  events: Event[] | SimilarEvent[]
}

export const EventList: FC<EventListProps> = ({ events }) => {
  return (
    <div className="row">
      {events?.map((event) => (
        <EventCard
          eventId={event.id}
          thumb={event.thumb}
          key={`event-{${event.id}}`}
        />
      ))}
    </div>
  )
}
