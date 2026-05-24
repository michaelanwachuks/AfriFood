import jollof from "../assets/jollof.jpg";
import poundo from "../assets/poundo.jpg";
import amala from "../assets/amala.jpg";
import suya from "../assets/suya.jpg";
import suya2 from "../assets/suya_sallat.jpg";
import amalaewedu from "../assets/amala-and-ewedu-2.jpg";

const menuItems = [
  // Nigeria
  {
    id: 1,
    name: "Jollof Rice",
    country: "Nigeria",
    description: "Smoky tomato rice cooked with peppers, spices, and tender chicken.",
    price: 1299,
    image: jollof,
  },
  {
    id: 2,
    name: "Pounded Yam",
    country: "Nigeria",
    description: "Smooth pounded yam served with rich egusi or vegetable soup.",
    price: 1499,
    image: poundo,
  },
  {
    id: 3,
    name: "Amala",
    country: "Nigeria",
    description: "Soft yam flour swallow paired with classic Nigerian soup.",
    price: 1099,
    image: amala,
  },
  {
    id: 4,
    name: "Suya",
    country: "Nigeria",
    description: "Spicy grilled beef skewers with peanut spice rub and onions.",
    price: 1599,
    image: suya,
  },
  {
    id: 5,
    name: "Suya Special",
    country: "Nigeria",
    description: "Premium suya platter with salad, pepper sauce, and extra spice.",
    price: 2099,
    image: suya2,
  },
  {
    id: 6,
    name: "Amala and Ewedu",
    country: "Nigeria",
    description: "Amala with ewedu and stew — a beloved Yoruba classic.",
    price: 1299,
    image: amalaewedu,
  },

  // Ghana
  {
    id: 7,
    name: "Waakye",
    country: "Ghana",
    description: "Rice and beans cooked with millet leaves, served with shito and gari.",
    price: 1199,
    image: jollof,
  },
  {
    id: 8,
    name: "Banku with Tilapia",
    country: "Ghana",
    description: "Fermented corn and cassava dough with grilled tilapia and pepper sauce.",
    price: 1899,
    image: suya,
  },

  // Senegal
  {
    id: 9,
    name: "Thieboudienne",
    country: "Senegal",
    description: "Senegal's national dish — fish, rice, and vegetables in flavorful tomato broth.",
    price: 1699,
    image: jollof,
  },

  // Ethiopia
  {
    id: 10,
    name: "Doro Wat with Injera",
    country: "Ethiopia",
    description: "Spicy chicken stew slow-cooked with berbere, served on spongy injera.",
    price: 1799,
    image: amalaewedu,
  },

  // Kenya
  {
    id: 11,
    name: "Nyama Choma",
    country: "Kenya",
    description: "Charcoal-grilled goat or beef — Kenya's favourite barbecue feast.",
    price: 1999,
    image: suya,
  },
  {
    id: 12,
    name: "Ugali with Sukuma Wiki",
    country: "Kenya",
    description: "Maize meal staple with sautéed collard greens and optional stew.",
    price: 999,
    image: poundo,
  },

  // South Africa
  {
    id: 13,
    name: "Bobotie",
    country: "South Africa",
    description: "Baked curried mince topped with egg custard — Cape Malay heritage dish.",
    price: 1549,
    image: amala,
  },
  {
    id: 14,
    name: "Bunny Chow",
    country: "South Africa",
    description: "Hollow bread loaf filled with hearty Durban-style curry.",
    price: 1399,
    image: jollof,
  },

  // Morocco
  {
    id: 15,
    name: "Chicken Tagine",
    country: "Morocco",
    description: "Slow-braised chicken with olives, lemon, and warm North African spices.",
    price: 1749,
    image: amalaewedu,
  },

  // Egypt
  {
    id: 16,
    name: "Koshari",
    country: "Egypt",
    description: "Comfort bowl of rice, lentils, pasta, chickpeas, and tangy tomato sauce.",
    price: 1149,
    image: jollof,
  },

  // Cameroon
  {
    id: 17,
    name: "Ndolé",
    country: "Cameroon",
    description: "Bitterleaf stew with groundnuts, crayfish, and fish or beef.",
    price: 1649,
    image: amala,
  },

  // Tanzania
  {
    id: 18,
    name: "Pilau",
    country: "Tanzania",
    description: "Fragrant spiced rice with cardamom, cinnamon, and tender meat.",
    price: 1349,
    image: jollof,
  },

  // Côte d'Ivoire
  {
    id: 19,
    name: "Attiéké with Grilled Fish",
    country: "Côte d'Ivoire",
    description: "Fermented cassava couscous with grilled fish and fresh chilli sauce.",
    price: 1849,
    image: suya2,
  },

  // Tunisia
  {
    id: 20,
    name: "Couscous Royale",
    country: "Tunisia",
    description: "Steamed semolina with lamb, chicken, vegetables, and harissa broth.",
    price: 1899,
    image: poundo,
  },
];

export default menuItems;
