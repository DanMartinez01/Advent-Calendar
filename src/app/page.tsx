/* eslint-disable react/no-unescaped-entities */
// @ts-nocheck
// @ts-ignore
'use client';
import { useState } from 'react'

export default function Home() {


  const [gifts, setGifts] = useState([{ name: "Viaje a Brasil", quantity: 1 }]);
  const [newGift, setNewGift] = useState('');

  const addGift = () => {
    if (newGift.trim() === "") {
      alert("Tienes que escribir un regalo");
    } else {
      const existingGiftIndex = gifts.findIndex(gift => gift.name === newGift);

      if (existingGiftIndex !== -1) {
        const updatedGifts = [...gifts];
        updatedGifts[existingGiftIndex].quantity += 1;
        setGifts(updatedGifts);
      } else {
        setGifts([...gifts, { name: newGift, quantity: 1 }]);
      }

      setNewGift('');
    }
  };
  const updateQuantity = (index, amount) => {
    const updatedGifts = [...gifts];
    updatedGifts[index].quantity += amount;

    if (updatedGifts[index].quantity <= 0) {
      updatedGifts.splice(index, 1);
    }

    setGifts(updatedGifts);
  };


  const removeGift = (indexToRemove) => {
    const updatedGifts = gifts.filter((_, index) => index !== indexToRemove);
    setGifts(updatedGifts);
  };
  const removeAll = () => {
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
          {gifts.map((gift: string, index: number) => (
            <li className='flex flex-row items-center justify-around text-lg'
              key={index}>{gift.name}
              <button
                className="m-2 p-1 rounded-sm text-sm bg-green-500 text-white"
                onClick={() => updateQuantity(index, -1)}
              >
                -
              </button>
              {gift.quantity}
              <button
                className="m-2 p-1 rounded-sm text-sm bg-red-500 text-white"
                onClick={() => updateQuantity(index, 1)}
              >
                +
              </button>
              <button
                className="m-4 p-1 text-red-500 bg-transparent border border-solid border-red-500 rounded"
                onClick={() => removeGift(index)}
              >
                Quitar
              </button>
            </li>
          ))}
        </ul>
        {gifts.length > 0 ?
          <button className="m-8 p-2 text-white-500 bg-transparent border border-solid border-red-500 rounded"
            onClick={() => removeAll()}>
            Borrar todos
          </button> :
          <h1>No hay regalos en la lista 🙁 Agrega uno!</h1>
        }
      </div>
    </main>
  )
}
