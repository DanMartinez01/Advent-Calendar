/* eslint-disable react/no-unescaped-entities */
// @ts-nocheck
// @ts-ignore
'use client';
import { useState, useEffect } from 'react'
import Image from 'next/image';
import axios from 'axios';
import RandomGift from '../../components/RandomGift'

export default function Home() {

  const [gifts, setGifts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newGift, setNewGift] = useState(''); //agregar regalo
  const [person, setPerson] = useState(''); //agregar persona
  const [newImageUrl, setNewImageUrl] = useState(''); //agregar imagen
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);//indice para editar regalos

  useEffect(() => {
    fetchGiftList();
  }, []);


  const fetchGiftList = async () => {
    try {
      const response = await axios.get('/api/gifts');
      console.log('Fetched data:', response.data);
      setGifts(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching gift list:', error);
      setIsLoading(false);
    }
  };

  const editGift = (index) => {
    const giftToEdit = gifts[index];//selecciona regalo segun indice
    setPerson(giftToEdit.recipient);
    setNewGift(giftToEdit.name);
    setNewImageUrl(giftToEdit.imageUrl);
    setEditIndex(index);
    setIsModalOpen(true);
  };

  const addGift = () => {
    if (newGift.trim() === "") {
      alert("Tienes que escribir un regalo");
      return;
    }

    if (editIndex !== null) {
      const updatedGifts = [...gifts];//copia de array de regalos
      updatedGifts[editIndex] = { name: newGift, quantity: updatedGifts[editIndex].quantity, imageUrl: newImageUrl, recipient: person }; //agregar cambios
      setGifts(updatedGifts);//setear regalo editado
      setEditIndex(null);
    }
    else {
      const existingGiftIndex = gifts.findIndex((gift) => gift.name === newGift);//busca regalo x index
      if (existingGiftIndex !== -1) {
        const updatedGifts = [...gifts];
        updatedGifts[existingGiftIndex].quantity += 1;//agrega cantidades a regalo existente
        setGifts(updatedGifts);
      } else {
        setGifts([...gifts, { name: newGift, quantity: 1, imageUrl: newImageUrl, recipient: person }]);
        //si el regalo no esta, lo agrega
      }
    }
    setNewGift('');
    setNewImageUrl('');
    setIsModalOpen(false);
    setPerson('');
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
    <main className="flex  flex-row min-h-screen  items-start justify-center"
      style={{ backgroundImage: "url('/christmas.jpg')" }}>
      <div className="max-w-5xl w-full items-center justify-start font-mono text-sm lg:flex flex-row my-10 ">

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className='flex flex-col justify-center mt-10'>
            <h1 className='text-center mb-10 text-2xl'>Lista de regalos:</h1>
            <ul className=''>
              {gifts.map((gift: string, index: number) => (
                <li className='flex flex-row items-center justify-around text-lg'
                  key={index}>
                  <div className="bg-white rounded overflow-hidden shadow-lg w-50 h-30 p-2 my-2 flex flex-row">
                    <Image
                      loader={() => gift.imageUrl}
                      src={gift.imageUrl}
                      alt={gift.name}
                      width={30}
                      height={20}
                      className="mt-1 w-full w-12 h-12 object-cover rounded-full"
                      onError={(e) => {
                        console.error("Error loading image:", e);
                        console.error("Image URL:", gift.imageUrl);
                      }}
                    />
                    <div className="px-1">
                      <p className="text-gray-800 font-bold text-sm ">{gift.name}</p>
                      <p className="text-gray-700 text-base">{gift.recipient}</p>
                      <div className="flex  items-center justify-between mt-2">
                        <div className="flex items-center space-x-2">
                          <button
                            className="text-sm bg-white text-black border border-gray-300  rounded-full focus:outline-none focus:ring focus:border-blue-300 transition duration-300 ease-in-out"
                            onClick={() => updateQuantity(index, -1)}
                          >
                            -
                          </button>
                          <span className="text-sm text-black">{gift.quantity}</span>
                          <button
                            className="text-sm bg-white text-black border border-gray-300 rounded-full focus:outline-none focus:ring focus:border-blue-300 transition duration-300 ease-in-out"
                            onClick={() => updateQuantity(index, 1)}
                          >
                            +
                          </button>
                        </div>
                        <div className="flex space-x-2 ml-2">
                          <button
                            className="bg-blue-500 text-white px-1 py-1 rounded focus:outline-none focus:ring focus:border-blue-300 transition duration-300 ease-in-out"
                            onClick={() => editGift(index)}
                          >
                            <p className="text-sm">Editar</p>
                          </button>
                          <button
                            className="px-1 py-1 text-black bg-white border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300 transition duration-300 ease-in-out"
                            onClick={() => removeGift(index)}
                          >
                            <p className="text-sm"> Quitar</p>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                </li>
              ))}
              <RandomGift />
            </ul>
          </div>
        )}
        <div className='mx-auto flex flex-col mt-10'>

          {/* Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-8 rounded-md">
                <h2 className="text-lg mb-4 text-black">{editIndex !== null ? 'Editar regalo' : 'Agregar regalo'}</h2>
                <input
                  type="text"
                  placeholder="Para quien?"
                  value={person}
                  onChange={(e) => setPerson(e.target.value)}
                  className='text-black px-1 mb-2 w-full focus:outline-none focus:ring focus:border-blue-300 transition duration-300 ease-in-out'
                />
                <input
                  type="text"
                  placeholder="Regalo"
                  value={newGift}
                  onChange={(e) => setNewGift(e.target.value)}
                  className='text-black px-1 mb-2 w-full focus:outline-none focus:ring focus:border-blue-300 transition duration-300 ease-in-out'
                />
                <input
                  type="text"
                  placeholder="URLimagen"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  className='text-black px-1 mb-4 w-full focus:outline-none focus:ring focus:border-blue-300 transition duration-300 ease-in-out'
                />
                <button className="bg-blue-500 text-white p-2 rounded focus:outline-none focus:ring focus:border-blue-300 transition duration-300 ease-in-out" onClick={addGift}>
                  {editIndex !== null ? 'Guardar cambios' : 'Agregar'}
                </button>
                <button className="ml-4 text-gray-600 focus:outline-none focus:ring focus:border-blue-300 transition duration-300 ease-in-out" onClick={() => { setIsModalOpen(false); setEditIndex(null); }}>
                  Cancelar
                </button>
              </div>
            </div>
          )}
          <button className="m-8 p-2 text-black bg-white rounded focus:outline-none focus:ring focus:border-blue-300 transition duration-300 ease-in-out" onClick={() => setIsModalOpen(true)}>
            Agregar a la lista 🎁</button>
          {gifts.length > 0 ?
            <button className="m-8 p-2 text-black bg-white rounded focus:outline-none focus:ring focus:border-blue-300 transition duration-300 ease-in-out"
              onClick={() => removeAll()}>
              Borrar todos
            </button> :
            <h1>No hay regalos en la lista 🙁 Agrega uno!</h1>
          }
        </div>
      </div>

    </main >
  )
}
