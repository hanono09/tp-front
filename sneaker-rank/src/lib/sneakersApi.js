const mockSneakers = [
  {
    id: "1",
    name: "Air Jordan 1 Retro High OG Chicago",
    brand: "Jordan",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    releaseDate: "2023-11-11",
    sku: "555088-101"
  },
  {
    id: "2",
    name: "Nike Dunk Low Retro White Black",
    brand: "Nike",
    image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&h=400&fit=crop",
    releaseDate: "2023-12-15",
    sku: "DD1391-100"
  },
  {
    id: "3",
    name: "Adidas Yeezy 350 Zebra",
    brand: "Adidas",
    image: "https://images.unsplash.com/photo-1547639532-430b63602d4b?w=400&h=400&fit=crop",
    releaseDate: "2024-01-20",
    sku: "BB6373-000"
  },
  {
    id: "4",
    name: "Nike Air Max 90 Bred",
    brand: "Nike",
    image: "https://images.unsplash.com/photo-1579928314433-cfb71a5bc5ed?w=400&h=400&fit=crop",
    releaseDate: "2024-02-10",
    sku: "CZ5895-001"
  },
  {
    id: "5",
    name: "New Balance 990v6 Grey",
    brand: "New Balance",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    releaseDate: "2024-03-01",
    sku: "M990GL6"
  },
  {
    id: "6",
    name: "Adidas Stan Smith White Green",
    brand: "Adidas",
    image: "https://images.unsplash.com/photo-1549298881-e37e3e8b46f9?w=400&h=400&fit=crop",
    releaseDate: "2024-03-15",
    sku: "M20324"
  },
  {
    id: "7",
    name: "Nike Blazer Mid Vintage",
    brand: "Nike",
    image: "https://images.unsplash.com/photo-1514989940723-e8d76fb4fa36?w=400&h=400&fit=crop",
    releaseDate: "2024-04-05",
    sku: "CI1044-101"
  },
  {
    id: "8",
    name: "Jordan 11 Retro Space Jam",
    brand: "Jordan",
    image: "https://images.unsplash.com/photo-1531378827394-efeed440dbee?w=400&h=400&fit=crop",
    releaseDate: "2024-04-20",
    sku: "378037-003"
  },
  {
    id: "9",
    name: "Puma RS-X Dreamer",
    brand: "Puma",
    image: "https://images.unsplash.com/photo-1449505278519-5ff94fb52033?w=400&h=400&fit=crop",
    releaseDate: "2024-05-10",
    sku: "387362-01"
  },
  {
    id: "10",
    name: "Nike SB Dunk Low Pro",
    brand: "Nike",
    image: "https://images.unsplash.com/photo-1463100054174-cd20edd4cd94?w=400&h=400&fit=crop",
    releaseDate: "2024-05-25",
    sku: "BQ6817-016"
  },
  {
    id: "11",
    name: "Reebok Classic Leather Legacy",
    brand: "Reebok",
    image: "https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=400&h=400&fit=crop",
    releaseDate: "2024-06-01",
    sku: "100007166"
  },
  {
    id: "12",
    name: "Converse Chuck 70 High Black",
    brand: "Converse",
    image: "https://images.unsplash.com/photo-1608889335941-33ac5f4ea9f9?w=400&h=400&fit=crop",
    releaseDate: "2024-06-15",
    sku: "162050C"
  }
];

export async function searchSneakers(query = "air jordan") {
  await new Promise(resolve => setTimeout(resolve, 300));
  const lowerQuery = query.toLowerCase();
  const filtered = mockSneakers.filter(sneaker =>
    sneaker.name.toLowerCase().includes(lowerQuery) ||
    sneaker.brand.toLowerCase().includes(lowerQuery)
  );
  return filtered.length > 0 ? filtered : mockSneakers.slice(0, 6);
}
