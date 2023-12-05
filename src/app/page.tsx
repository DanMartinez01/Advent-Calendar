import Image from 'next/image'
import christmas from '../../public/christmas.avif'

export default function Home() {
  const gifts=["Viaje a Brasil", "Bikini", "Ojotas"]
  return (
    <main className="flex min-h-screen  items-center justify-between p-24" style={{ backgroundImage: "url('/christmas.avif')" }}>
      <div className="mb-10 max-w-5xl w-full items-center justify-center font-mono text-sm lg:flex flex-col">
        <h1 className='my-4'>Lista de regalos:</h1>
        <ul>
        {gifts.map((gift, index) => (
  <li key={index}>{gift}</li>
))}
        </ul>
   </div>
    </main>
  )
}
