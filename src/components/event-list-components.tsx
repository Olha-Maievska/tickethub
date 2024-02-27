import { FC } from 'react'
import { EventCard } from '../modules/events/components/event-cars.component'
import { InternalEvent } from '../modules/events/domain/event'

interface EventListProps {
  events: InternalEvent[]
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
