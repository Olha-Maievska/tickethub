import { FC } from 'react'
import { EventCard } from '../modules/events/components/event-cars.component'
import { useGetEventsQuery } from '../modules/events/api/events'
import { Layout } from '../components/layout-component'

interface HomeProps {}

export const Home: FC<HomeProps> = () => {
  const { data, isLoading } = useGetEventsQuery({})

  if (isLoading) {
    return (
      <Layout>
        <div className="loading">Loading...</div>
      </Layout>
    )
  }

  return (
    <Layout>
      <h4>Select an event</h4>
      <hr />
      <div className="row">
        {data?.map((event) => (
          <EventCard
            eventId={event.id}
            thumb={event.thumb}
            key={`event-{${event.id}}`}
          />
        ))}
      </div>
    </Layout>
  )
}
