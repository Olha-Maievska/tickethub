import { FC, useEffect } from 'react'
import { Layout } from '../components/layout-component'
import { z } from 'zod'
import { useSelector } from 'react-redux'
import { getEventID } from '../modules/events/selectors'
import { useNavigate } from 'react-router-dom'
import { useGetSingleEventQuery } from '../modules/events/api/repository'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '../components/input-component'

interface OrderPageProps {}

const detailsShema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  phone: z.string().min(10),
  address: z.string().min(3),
  cardholderName: z.string().min(3),
  cardNumber: z.string().min(14).max(16),
  cardExpiration: z.string().min(5).max(5),
  cardCvv: z.string().min(3).max(3),
})

type DetailsShemValues = z.infer<typeof detailsShema>

export const OrderPage: FC<OrderPageProps> = () => {
  const navigate = useNavigate()
  const selectedEventID = useSelector(getEventID)

  useEffect(() => {
    if (!selectedEventID) {
      // navigate('/', { replace: true })
    }
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DetailsShemValues>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      cardCvv: '',
      cardExpiration: '',
      cardholderName: '',
      cardNumber: '',
    },
    resolver: zodResolver(detailsShema),
  })

  const event = useGetSingleEventQuery(selectedEventID || 0, {
    skip: !selectedEventID,
  })

  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })

  return (
    <Layout>
      <h4>Buying tickets for {event.data?.name}</h4>
      <hr />
      <form onSubmit={onSubmit} noValidate>
        <div className="row">
          <div className="col-sm-offset-1 col-sm-10">
            <h4>
              <strong>Your Details</strong>
            </h4>
            <hr />
            <div className="row">
              <div className="col-sm-6">
                <Input
                  label="Name"
                  {...register('name')}
                  error={errors.name?.message}
                />
              </div>
              <div className="col-sm-6">
                <Input
                  label="Email"
                  {...register('email')}
                  type="email"
                  error={errors.email?.message}
                />
              </div>
              <div className="col-sm-6">
                <Input
                  label="Phone"
                  {...register('phone')}
                  error={errors.phone?.message}
                />
              </div>
              <div className="col-sm-6">
                <Input
                  label="Address"
                  {...register('address')}
                  error={errors.address?.message}
                />
              </div>
            </div>
            <hr />
            <h4>
              <strong>Payment Details</strong>
            </h4>
            <hr />
            <div className="row">
              <div className="col-xs-12">
                <Input
                  label="Cardholder Name"
                  {...register('cardholderName')}
                  error={errors.cardholderName?.message}
                />
              </div>
              <div className="col-sm-6">
                <Input
                  label="Card Number"
                  {...register('cardNumber')}
                  error={errors.cardNumber?.message}
                />
              </div>

              <div className="col-sm-4">
                <Input
                  label="Card Expiration"
                  {...register('cardExpiration')}
                  error={errors.cardExpiration?.message}
                />
              </div>
              <div className="col-sm-2">
                <Input
                  label="CVV"
                  {...register('cardCvv')}
                  error={errors.cardCvv?.message}
                />
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-xs-6">
            <button
              className="btn btn-default btn-block btn-lg"
              onClick={() => navigate(-1)}
            >
              Back
            </button>
          </div>
          <div className="col-xs-6">
            <button className="btn btn-primary btn-block btn-lg" type="submit">
              Pay
            </button>
          </div>
        </div>
      </form>
    </Layout>
  )
}
