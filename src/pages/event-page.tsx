import { FC, useEffect } from 'react'
import { useGetSingleEventQuery } from '../modules/events/api/repository'
import { useParams } from 'react-router-dom'
import { Layout } from '../components/layout-component'
import { EventForm } from '../modules/events/components/event-form-component'
import { EventList } from '../components/event-list-components'
import { useDispatch, useSelector } from 'react-redux'
import { cleanEventOrderState, setEventID } from '../modules/events/slice'
import { getEventID } from '../modules/events/selectors'

interface EventPageProps {}

export const EventPage: FC<EventPageProps> = () => {
  const params = useParams()
  const dispatch = useDispatch()

  const { data, isLoading } = useGetSingleEventQuery(Number(params.id))
  const eventID = Number(params.id)
  const choosenEventID = useSelector(getEventID)

  useEffect(() => {
    const initEventPage = async () => {
      if (eventID !== choosenEventID) {
        await dispatch(cleanEventOrderState())
        dispatch(setEventID(eventID))
      }
    }

    initEventPage()
  }, [params.id, choosenEventID])

  if (isLoading) {
    return (
      <Layout>
        <div className="loading">Loading...</div>
      </Layout>
    )
  }

  return (
    <Layout>
      <h4>{data?.name}</h4>
      <hr />
      <img src={data?.image} width="100%" />
      <hr />
      <h5>
        <strong>Buy Tickets</strong>
      </h5>

      <EventForm />

      <hr />
      <div className="row">
        <div className="col-sm-7">
          <h4>
            <strong>Event Description</strong>
          </h4>
          <p>{data?.description}</p>
        </div>
        <div className="col-sm-offset-1 col-sm-4">
          <h4>
            <strong>Where</strong>
          </h4>
          <p>
            <strong>{data?.venue.name}</strong>
            <br />
            {data?.venue.address}
          </p>
        </div>
      </div>
      <hr />
      <h4>Similar Events</h4>
      <hr />
      <EventList events={data?.similarEvents || []} />
    </Layout>
  )
}
