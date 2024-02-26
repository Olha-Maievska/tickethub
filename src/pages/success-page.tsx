import { FC, useEffect } from 'react'
import { Layout } from '../components/layout-component'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  getEventConfirmationCode,
  getEventID,
  getSelectedDate,
  getSelectedQty,
  getSelectedSector,
} from '../modules/events/selectors'
import { useGetSingleEventQuery } from '../modules/events/api/repository'
import { cleanEventOrderState } from '../modules/events/slice'

interface SuccessPageProps {}

export const SuccessPage: FC<SuccessPageProps> = () => {
  const navigate = useNavigate()
  const selectedEventID = useSelector(getEventID)
  const selectedDate = useSelector(getSelectedDate)
  const selectedSector = useSelector(getSelectedSector)
  const selectedQty = useSelector(getSelectedQty)
  const selectedConfCode = useSelector(getEventConfirmationCode)
  const dispatch = useDispatch()

  const eventDate = new Date(selectedDate?.date || 0)
  const eventDateFormated = new Intl.DateTimeFormat().format(eventDate)

  useEffect(() => {
    if (
      !selectedEventID ||
      !selectedDate ||
      !selectedSector ||
      !selectedQty ||
      !selectedConfCode
    ) {
      navigate('/', { replace: true })
    }
  }, [])

  useEffect(() => {
    return () => {
      dispatch(cleanEventOrderState())
    }
  }, [])

  const event = useGetSingleEventQuery(selectedEventID || 0, {
    skip: !selectedEventID,
  })

  return (
    <Layout>
      <div className="jumbotron">
        <h3>
          <strong>Congratulations! Order successful</strong>
        </h3>
        <hr />
        <h5>
          <strong>Order Details</strong>
        </h5>
        <hr />
        <div className="media">
          <div className="media-left">
            {' '}
            <img
              src={event.data?.thubm}
              width="150"
              className="media-object"
            />{' '}
          </div>
          <div className="media-body">
            <h4 className="media-heading">
              <strong>{event.data?.name}</strong>
            </h4>
            <strong>Where:</strong> {event.data?.venue.name},
            {event.data?.venue.address}
            <br />
            <strong>When:</strong> {eventDateFormated}
            <br />
            <strong>Sector:</strong> {selectedSector?.name}
            <br />
            <strong>Quantity:</strong> {selectedQty}
            <br />
            <strong>Confirmation Code:</strong>
            {selectedConfCode}
          </div>
        </div>
        <hr />
        <div className="text-right">
          <Link className="btn btn-primary btn-lg" to="/">
            Back to home
          </Link>
        </div>
      </div>
    </Layout>
  )
}
