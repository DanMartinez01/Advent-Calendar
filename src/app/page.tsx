// @ts-nocheck
// @ts-ignore
'use client';
import {useState} from 'react'

export default function Home() {

  const [gifts, setGifts] = useState(["Viaje a Brasil", "Bikini", "Ojotas"]); 
  const [newGift, setNewGift] = useState('');

  const addGift = () => {
    setGifts([...gifts, newGift]); 
    setNewGift(''); 
  };
  return (
    <main className="flex min-h-screen  items-center justify-between p-24" style={{ backgroundImage: "url('/christmas.avif')" }}>
      <div className="mb-10 max-w-5xl w-full items-center justify-center font-mono text-sm lg:flex flex-col">
        <h1 className='my-4'>Lista de regalos:</h1>
        <ul>
        {gifts.map((gift:string, index:number) => (
        <li key={index}>{gift}</li>
        ))}
        </ul>
          <input
          type="text"
          placeholder="Enter new element"
          value={newGift}
          onChange={(e) => setNewGift(e.target.value)}
        />
         <button onClick={addGift}>Add Element</button>
      </div>
  </main>
  )
}
