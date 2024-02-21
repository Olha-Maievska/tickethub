export type GetRatesResponseDto = Rate[]

interface Rate {
  id: number
  max: number
  price: number
  name: string
}
