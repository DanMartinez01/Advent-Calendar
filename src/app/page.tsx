/* eslint-disable react/no-unescaped-entities */
// @ts-nocheck
// @ts-ignore
'use client';
import { useState, useEffect } from 'react'
import Image from 'next/image';

export default function Home() {
  const [gifts, setGifts] = useState(() => {
    const storedGifts = localStorage.getItem('gifts');
    return storedGifts ? JSON.parse(storedGifts) : [
      { recipient: "Dani", name: "Viaje a Brasil", quantity: 1, imageUrl: "https://dib.com.ar/wp-content/uploads/2022/10/rio-janeiro-696x870.jpg" }
    ];
  });
  const [newGift, setNewGift] = useState('');
  const [person, setPerson] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('gifts', JSON.stringify(gifts));
  }, [gifts]);

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
        setGifts([...gifts, { name: newGift, quantity: 1, imageUrl: newImageUrl, recipient: person }]);
      }

      setNewGift('');
      setNewImageUrl('');
      setIsModalOpen(false);
      setPerson('')
      console.log(gift);
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
    <main className="flex min-h-screen  items-start justify-center" style={{ backgroundImage: "url('/christmas.jpg')" }}>
      <div className="max-w-5xl w-full items-center justify-start font-mono text-sm lg:flex flex-col my-6">
        <h1 className='mb-10 text-2xl'>Lista de regalos:</h1>
        <div className='mb-6 flex flex-row '>
          {/* Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-8 rounded-md">
                <h2 className="text-lg mb-4">Agregar regalo</h2>
                <input
                  type="text"
                  placeholder="Para quien?"
                  value={person}
                  onChange={(e) => setPerson(e.target.value)}
                  className='text-black px-1 mb-2 w-full'
                />
                <input
                  type="text"
                  placeholder="Regalo"
                  value={newGift}
                  onChange={(e) => setNewGift(e.target.value)}
                  className='text-black px-1 mb-2 w-full'
                />
                <input
                  type="text"
                  placeholder="URLimagen"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  className='text-black px-1 mb-4 w-full'
                />
                <button className="bg-blue-500 text-white p-2 rounded" onClick={addGift}>
                  Agregar
                </button>
                <button className="ml-4 text-gray-600" onClick={() => setIsModalOpen(false)}>
                  Cancelar
                </button>
              </div>
            </div>
          )}
          <button className="m-8 p-2 text-black bg-white rounded" onClick={() => setIsModalOpen(true)}>
            Agregar a la lista 🎁</button>
        </div>

        <ul className=''>
          {gifts.map((gift: string, index: number) => (
            <li className='flex flex-row items-center justify-around text-lg '
              key={index}>
              <div className='flex flex-row items-center justify-around bg-white w-[150px] p-2 rounded'>
                <p className='flex w-1/2 text-semibold text-black text-sm text-start mx-2'>{gift.recipient}</p>
                <Image
                  loader={() => gift.imageUrl}
                  src={gift.imageUrl}
                  alt={gift.name}
                  width={40}
                  height={20}
                  className=' w-10 h-10 rounded-full'
                  onError={(e) => {
                    console.error("Error loading image:", e);
                    console.error("Image URL:", gift.imageUrl);
                  }}
                />
                <p className='flex w-1/2 text-semibold text-black text-sm text-start mx-2'> {gift.name}</p>
              </div>

              <button
                className="flex items-center justify-center p-2 w-4 h-2 m-2 rounded-full text-sm bg-white text-black"
                onClick={() => updateQuantity(index, -1)}
              >
                -
              </button>
              {gift.quantity}
              <button
                className="flex items-center justify-center p-2 w-4 h-2 m-2 rounded-full text-sm bg-white text-black"
                onClick={() => updateQuantity(index, 1)}
              >
                +
              </button>
              <button
                className="m-4 p-1 text-black bg-white  rounded"
                onClick={() => removeGift(index)}
              >
                Quitar
              </button>
            </li>
          ))}
        </ul>
        {gifts.length > 0 ?
          <button className="m-8 p-2 text-black bg-white rounded"
            onClick={() => removeAll()}>
            Borrar todos
          </button> :
          <h1>No hay regalos en la lista 🙁 Agrega uno!</h1>
        }
      </div>
    </main>
  )
}
