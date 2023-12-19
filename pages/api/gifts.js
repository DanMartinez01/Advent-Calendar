export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const mockGifts = [
    {
      recipient: "Dani",
      name: "Viaje a Brasil",
      quantity: 1,
      imageUrl:
        "https://www.brasilplayas.com/sites/default/files/imagecache/col_der466px/sziliotti_sziliotti_3291975226_by-sa.jpg",
    },
  ];

  await new Promise((resolve) => setTimeout(resolve, 1000));

  res.status(200).json(mockGifts);
}
