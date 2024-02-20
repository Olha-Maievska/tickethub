import { FC } from 'react'
import { EventCard } from '../components/event-cars.component'
import { Link } from 'react-router-dom'
import { useGetEventsQuery } from '../api/events'

interface HomeProps {}

export const Home: FC<HomeProps> = () => {
  const { data, isLoading } = useGetEventsQuery({})

  if (isLoading) return <div>Loading...</div>

  return (
    <div className="container">
      <h3>
        <strong>
          <Link to="/">Challenge Tickets</Link>
        </strong>
      </h3>
      <hr />
      <h4>Select an event</h4>
      <hr />
      <div className="row">
        {data?.map((event) => (
          <EventCard eventId={event.id} thumb={event.thumb} />
        ))}
      </div>
    </div>
  )
}
