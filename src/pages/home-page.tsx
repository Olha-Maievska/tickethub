import { FC } from 'react'
import { useGetEventsQuery } from '../modules/events/api/repository'
import { Layout } from '../components/layout-component'
import { EventList } from '../components/event-list-components'

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
      <EventList events={data || []} />
    </Layout>
  )
}
