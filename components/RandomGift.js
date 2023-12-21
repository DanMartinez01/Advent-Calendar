import React from "react";
import { useState } from "react";
import Image from "next/image";

const RandomGift = () => {
  const GiftList = [
    {
      recipient: "Dani",
      name: "Viaje a Brasil",
      quantity: 1,
      imageUrl:
        "https://www.brasilplayas.com/sites/default/files/imagecache/col_der466px/sziliotti_sziliotti_3291975226_by-sa.jpg",
    },
    {
      recipient: "Dani",
      name: "Cámara Fotográfica Profesional",
      quantity: 1,
      imageUrl:
        "https://www.brasilplayas.com/sites/default/files/imagecache/col_der466px/sziliotti_sziliotti_3291975226_by-sa.jpg",
    },
    {
      recipient: "Dani",
      name: "Suscripción a Servicio de Streaming",
      quantity: 1,
      imageUrl:
        "https://www.brasilplayas.com/sites/default/files/imagecache/col_der466px/sziliotti_sziliotti_3291975226_by-sa.jpg",
    },
    {
      recipient: "Dani",
      name: "Curso de Cocina Internacional",
      quantity: 1,
      imageUrl:
        "https://www.brasilplayas.com/sites/default/files/imagecache/col_der466px/sziliotti_sziliotti_3291975226_by-sa.jpg",
    },
    {
      recipient: "Dani",
      name: "Pase para Parque de Aventuras",
      quantity: 2,
      imageUrl:
        "https://www.brasilplayas.com/sites/default/files/imagecache/col_der466px/sziliotti_sziliotti_3291975226_by-sa.jpg",
    },
    {
      recipient: "Dani",
      name: "Libro de Viajes",
      quantity: 1,
      imageUrl:
        "https://www.brasilplayas.com/sites/default/files/imagecache/col_der466px/sziliotti_sziliotti_3291975226_by-sa.jpg",
    },
    {
      recipient: "Dani",
      name: "Bono de Spa",
      quantity: 1,
      imageUrl:
        "https://www.brasilplayas.com/sites/default/files/imagecache/col_der466px/sziliotti_sziliotti_3291975226_by-sa.jpg",
    },
    {
      recipient: "Dani",
      name: "Concierto en Vivo",
      quantity: 2,
      imageUrl: "https://example.com/concert.jpg",
    },
    {
      recipient: "Dani",
      name: "Membresía de Gimnasio",
      quantity: 1,
      imageUrl:
        "https://www.brasilplayas.com/sites/default/files/imagecache/col_der466px/sziliotti_sziliotti_3291975226_by-sa.jpg",
    },
    {
      recipient: "Dani",
      name: "Experiencia de Paracaidismo",
      quantity: 1,
      imageUrl:
        "https://www.brasilplayas.com/sites/default/files/imagecache/col_der466px/sziliotti_sziliotti_3291975226_by-sa.jpg",
    },
  ];

  const [randomGift, setRandomGift] = useState(null);

  const generateRandomGift = () => {
    const randomIndex = Math.floor(Math.random() * GiftList.length);
    const selectedGift = GiftList[randomIndex];
    setRandomGift(selectedGift);
  };

  return (
    <div>
      {randomGift && (
        <div className="bg-white rounded overflow-hidden shadow-lg w-50 h-30 p-2 my-2 flex flex-row">
          {/* <p>Quantity: {randomGift.quantity}</p> */}
          <Image
            loader={() => randomGift.imageUrl}
            src={randomGift.imageUrl}
            alt={randomGift.name}
            width={30}
            height={20}
            className="mt-1 w-full w-12 h-12 object-cover rounded-full"
            onError={(e) => {
              console.error("Error loading image:", e);
              console.error("Image URL:", gift.imageUrl);
            }}
          />
          <div className="">
            <p className="text-gray-800 font-bold text-sm text-truncate flex w-30 bg-green-400">
              {randomGift.name}
            </p>
            <p className="text-gray-700 text-base">{randomGift.recipient}</p>
          </div>
        </div>
      )}
      <button
        className="m-8 p-2 text-black bg-white rounded focus:outline-none focus:ring focus:border-blue-300 transition duration-300 ease-in-out"
        onClick={generateRandomGift}
      >
        Generate Random Gift
      </button>
    </div>
  );
};

export default RandomGift;
