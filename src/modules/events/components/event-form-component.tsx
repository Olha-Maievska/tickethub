import { FC } from 'react'
import {
  useGetSingleEventQuery,
  useLazyGetRatesQuery,
  useLazyGetSectorsQuery,
} from '../api/repository'
import { useDispatch, useSelector } from 'react-redux'
import {
  getSelectedDate,
  getSelectedQty,
  getSelectedRate,
  getSelectedSector,
} from '../selectors'
import { setEventDate, setQty, setRate, setSector } from '../slice'
import { useParams } from 'react-router-dom'

interface EventFormProps {}

export const EventForm: FC<EventFormProps> = () => {
  const [triggerSectorsQuery, sectors] = useLazyGetSectorsQuery()
  const [triggerRatesQuery, rates] = useLazyGetRatesQuery()
  const params = useParams()
  const { data } = useGetSingleEventQuery(Number(params.id))

  const disptach = useDispatch()
  const selectedDate = useSelector(getSelectedDate)
  const selectedSector = useSelector(getSelectedSector)
  const selectedRate = useSelector(getSelectedRate)
  const selectedQty = useSelector(getSelectedQty)

  const handleDateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const eventId = Number(e.target.value)
    disptach(setEventDate(eventId))

    if (!eventId) return

    triggerSectorsQuery(eventId)
  }

  const handleSectorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const eventId = Number(e.target.value)
    disptach(setSector(eventId))

    if (!eventId) return
    triggerRatesQuery(eventId)
  }

  const handleRateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const eventId = Number(e.target.value)
    disptach(setRate(eventId))
  }

  const handleQtyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const qty = Number(e.target.value)
    disptach(setQty(qty))
  }

  return (
    <div className="row">
      <div className="col-sm-3">
        <div className="form-group">
          <select
            value={String(selectedDate)}
            className="form-control"
            onChange={handleDateChange}
          >
            <option value="">Date</option>
            {data?.dates.map((d) => (
              <option key={`event-date-${d.id}`} value={d.id}>
                {d.date}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="col-sm-3">
        <div className="form-group">
          <select
            value={String(selectedSector)}
            className="form-control"
            disabled={!selectedDate}
            onChange={handleSectorChange}
          >
            <option value="">Sector</option>
            {sectors.data?.map((s) => (
              <option key={`sector-${s.id}`} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="col-sm-2">
        <div className="form-group">
          <select
            value={String(selectedRate)}
            className="form-control"
            disabled={!selectedSector}
            onChange={handleRateChange}
          >
            <option value="">Rate</option>
            {rates.data?.map((r) => (
              <option key={`rates-${r.id}`} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="col-sm-2">
        <div className="form-group">
          <select
            value={String(selectedQty)}
            className="form-control"
            disabled={!selectedRate}
            onChange={handleQtyChange}
          >
            <option value="">Quantity</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
      </div>
      <div className="col-sm-2">
        {' '}
        <button
          className="btn btn-primary btn-block"
          disabled={
            !selectedDate || !selectedSector || !selectedRate || !selectedQty
          }
        >
          BUY
        </button>{' '}
      </div>
    </div>
  )
}
