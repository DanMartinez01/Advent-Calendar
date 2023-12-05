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

  const removeGift = (indexToRemove) => {
    const updatedGifts = gifts.filter((_, index) => index !== indexToRemove);
    setGifts(updatedGifts);
  };
  const removeAll=()=>{
    setGifts([])
  }
  return (
    <main className="flex min-h-screen  items-start justify-center" style={{ backgroundImage: "url('/christmas.avif')" }}>
      <div className="max-w-5xl w-full items-center justify-center font-mono text-sm lg:flex flex-col my-6">
        <h1 className='mb-10 text-2xl'>Lista de regalos:</h1>
        <div className='mb-6 px-20 flex flex-row justify-around'>
        <input
          type="text"
          placeholder="Anota tu regalo"
          value={newGift}
          onChange={(e) => setNewGift(e.target.value)}
          className='text-black px-2'
        />
         <button className='mx-4' onClick={addGift}>Agregar a la lista</button>  
        </div>
        
        <ul>
        {gifts.map((gift:string, index:number) => (
        <li className='flex flex-row items-center justify-around text-lg'
        key={index}>{gift}
           <button
                className="m-4 p-1 text-red-500 bg-transparent border border-solid border-red-500 rounded"
                onClick={() => removeGift(index)}
              >
                Quitar
              </button>
        </li>
        
        ))}
        </ul>
        <button
                className="m-8 p-2 text-white-500 bg-transparent border border-solid border-red-500 rounded"
                onClick={() => removeAll()}
              >
                Borrar todos
              </button>
      </div>
  </main>
  )
}
