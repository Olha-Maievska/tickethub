import { FC, useEffect, useState } from 'react'
import { useGetEventsQuery } from '../modules/events/api/repository'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Layout } from '../components/layout-component'
import { EventList } from '../components/event-list-components'
import { InternalEvent } from '../modules/events/domain/event'

interface HomeProps {}

export const Home: FC<HomeProps> = () => {
  const [page, setPage] = useState(0)
  const { data, isLoading } = useGetEventsQuery(page)
  const [allEvents, setAllEvents] = useState<InternalEvent[]>([])

  useEffect(() => {
    if (data) {
      setAllEvents((allEvents) => [...allEvents, ...(data || [])])
    }
  }, [data])

  const handleNextPage = () => {
    setPage((page) => page + 1)
  }

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
      <div className="container-fluid" id="scrollableDiv">
        <InfiniteScroll
          dataLength={allEvents.length}
          next={handleNextPage}
          hasMore={page < 10}
          loader={<h4 style={{ textAlign: 'center' }}>Loading...</h4>}
          className="container-fluid"
          style={{ overflow: 'visible' }}
        >
          <EventList events={allEvents} />
        </InfiniteScroll>
      </div>
    </Layout>
  )
}
