import type { Product } from "../types";

export const products: Product[] = [
  // --- DESSERTS ---
  { id: "pastry", categoryId: "Dessert", name: "Pastry", description: "Freshly baked pastry.", price: 400, image:"https://g-cdn.blinkco.io/ordering-system/55379/logo/1785768136.png" },
  { id: "cakes", categoryId: "Dessert", name: "Cakes", description: "Freshly baked cakes.", price: 1700, image: "https://g-cdn.blinkco.io/ordering-system/55379/logo/1785768136.png" },
  { id: "sundae", categoryId: "Dessert", name: "Sundae", description: "Delicious ice cream sundae with various toppings.", price: 580, image: "https://g-cdn.blinkco.io/ordering-system/55379/logo/1785768136.png" },
  
  // --- PASTA ---
  { id: "crunchy-pasta-popular", categoryId: "Castle crunch pasta", name: "Crunchy Pasta", description: "Creamy pasta finished with a crisp White's Castle topping.", price: 580, image: "/images/food-pasta-2.svg" },
  { id: "chef-special-pasta", categoryId: "pasta", name: "Chef Special Pasta", description: "Saucy macaroni, chicken, vegetables, and jalapenos.", price: 580, image: "/images/food-pasta.svg" },
  { id: "flaming-pasta", categoryId: "pasta", name: "Flaming Pasta", description: "Hot and creamy pasta with White's Castle spice.", price: 580, image: "/images/food-pasta-2.svg" },

  // --- STARTERS ---
  { id: "cheese-stuffer-sticks", categoryId: "royal-starters", name: "Cheese Stuffer Sticks", description: "Four cheesy stuffed sticks with a hot baked finish.", price: 480, image: "/images/Cheese Stuffer Sticks.png", badge: "Popular" },
  { id: "kabab-stuffer-sticks", categoryId: "royal-starters", name: "Kabab Stuffer Sticks", description: "Four warm stuffed sticks filled with kabab spice and cheese.", price: 500, image: "/images/Kabab Stuffer Sticks.png" },
  { id: "cheezy-sticks", categoryId: "royal-starters", name: "Cheezy Sticks", description: "Juicy, cheezy sticks filled with mozzarella cheese and served with dip.", price: 320, image: "/images/Cheezy Sticks.png" },
  { id: "oven-baked-wings", categoryId: "royal-starters", name: "Oven Baked Wings", description: "Spicy baked wings served fresh with a house dip.", price: 380, variants: [{ label: "6 Pcs", price: 380 }, { label: "12 Pcs", price: 740 }], image: "/images/Oven Baked Wings.png" },
  { id: "buffalo-wings", categoryId: "royal-starters", name: "Buffalo Wings", description: "Crispy wings tossed in buffalo sauce and served hot.", price: 410, image: "/images/Buffalo Wings.png" },
  { id: "mexican-sandwich", categoryId: "royal-starters", name: "Mexican Sandwich", description: "Baked with chicken, veggies, cheese, and mayo mustard sauce.", price: 740, image: "/images/Mexican Sandwich.png" },
  { id: "tempeeli-roll", categoryId: "royal-starters", name: "Tempeeli Roll", description: "Crispy, hot roll with seasoned chicken filling.", price: 620, image: "/images/Tempeeli Roll.png" },
  { id: "behari-roll", categoryId: "royal-starters", name: "Behari Roll", description: "Four pieces with Behari-style spices and garlic mayo.", price: 620, image: "/images/Behari Roll.png" },
  { id: "special-white-platter", categoryId: "royal-starters", name: "Special White Platter", description: "Spring rolls, oven baked wings, and mayo dip sauce.", price: 780, variants: [{ label: "White's Special", price: 780 }, { label: "Malai Boti", price: 930 }], image: "/images/Special White Platter.png" },
  
  // --- PIZZA ---
  { id: "fajita-pizza", categoryId: "pizza", name: "Fajita Pizza", description: "Fajita chicken, onions, capsicum, and signature tomato sauce.", price: 370, variants: [{ label: "Small", price: 370 }, { label: "Regular", price: 880 }, { label: "Large", price: 1170 }], image: "/images/food-pizza-2.svg" },
  { id: "tikka-pizza", categoryId: "pizza", name: "Tikka Pizza", description: "Spiced tikka chicken, mozzarella, onions, and red sauce.", price: 370, variants: [{ label: "Small", price: 370 }, { label: "Regular", price: 880 }, { label: "Large", price: 1170 }], image: "/images/food-pizza.svg" },
  { id: "cheese-lover-pizza", categoryId: "pizza", name: "Cheese Lover Pizza", description: "A cheese-forward pizza with a light herb finish.", price: 370, variants: [{ label: "Small", price: 370 }, { label: "Regular", price: 880 }, { label: "Large", price: 1170 }], image: "/images/food-pizza-3.svg" },
  
  // --- SPECIAL PIZZA ---
  { id: "white-special-pizza", categoryId: "special-pizza", name: "White Special Pizza", description: "White sauce, grilled chicken, mushrooms, olives, and peppers.", price: 370, variants: [{ label: "Small", price: 370 }, { label: "Regular", price: 880 }, { label: "Large", price: 1170 }], image: "https://g-cdn.blinkco.io/ordering-system/55379/logo/1785768136.png", badge: "Signature" },
  { id: "crown-special-pizza", categoryId: "special-pizza", name: "Crown Special Pizza", description: "A rich special pizza with extra chicken, cheese, and sauce.", price: 430, variants: [{ label: "Small", price: 430 }, { label: "Regular", price: 950 }, { label: "Large", price: 1290 }], image: "https://g-cdn.blinkco.io/ordering-system/55379/logo/1785768136.png", badge: "Signature" },
  { id: "malai-boti-pizza", categoryId: "special-pizza", name: "Malai Boti Pizza", description: "Creamy malai boti chicken with cheese and mild spices.", price: 430, variants: [{ label: "Small", price: 430 }, { label: "Regular", price: 950 }, { label: "Large", price: 1290 }], image: "/images/food-pizza-3.svg" },
  
  // --- SQUARE & CRUST & CALZONE ---
  { id: "square-pizza", categoryId: "square-pizza", name: "Square Treat", description: "Flaky square-cut pizza finished with cheese, sauce, and chicken.", price: 585, variants: [{ label: "S", price: 585 }, { label: "M", price: 1280 }, { label: "L", price: 1940 }], image: "/images/food-square.svg" },
  { id: "chicken-calzone", categoryId: "calzone", name: "Chicken Calzone", description: "Folded baked pocket filled with chicken, sauce, and cheese.", price: 790, image: "/images/food-foldover.svg" },
  { id: "spicy-calzone", categoryId: "calzone", name: "Spicy Calzone", description: "A hotter folded crust with chilli garlic sauce and chicken.", price: 820, image: "/images/food-foldover.svg" },
  { id: "cheese-crust-pizza", categoryId: "crust-pizza", name: "Cheese Crust Pizza", description: "Stuffed crust with extra pull and a crisp baked base.", price: 1900, variants: [{ label: "Large", price: 1900 }], image: "/images/food-pizza-3.svg" },
  { id: "kabab-crust-pizza", categoryId: "crust-pizza", name: "Crown Crust Pizza", description: "Stuffed edge crown crust with kabab flavor and melted cheese.", price: 1900, variants: [{ label: "Large", price: 1900 }], image: "/images/food-pizza-2.svg" },

  // --- NEW: BURGERS ---
  { id: "zinger-burger", categoryId: "Burger", name: "Classic Zinger", description: "Crispy fried chicken breast with mayo and fresh lettuce.", price: 450, image: "/images/hero-1.png", badge: "Hot" },
  { id: "beef-burger", categoryId: "Burger", name: "Smash Beef Burger", description: "Juicy beef patty with melted cheese and signature sauce.", price: 650, image: "/images/hero-1.png" },

  // --- NEW: FRIED CHICKEN ---
  { id: "fried-chicken-1", categoryId: "Fried", name: "Crispy Fried Chicken", description: "Golden fried crunchy chicken piece.", price: 200, variants: [{ label: "1 Pc", price: 200 }, { label: "2 Pcs", price: 380 }, { label: "3 Pcs", price: 550 }], image: "/images/hero-2.png" },

  // --- NEW: DEALS ---
  { id: "deal-229", categoryId: "229 Deals", name: "Midnight 229 Deal", description: "1 Zinger Burger with regular fries.", price: 229, image: "/images/hero-3.png", badge: "Promo" },
  { id: "family-deal-1", categoryId: "Deals", name: "Castle Family Deal", description: "2 Large Pizzas, 1.5 Ltr Drink, and Oven Baked Wings.", price: 2499, image: "/images/hero-2.png" },

  // --- NEW: SPECIALTY & TRADITIONAL ---
  { id: "shawarma-platter", categoryId: "Specialty", name: "White's Special Shawarma", description: "Arabic style shawarma wrapped in fresh pita.", price: 350, image: "/images/Mexican Sandwich.png" },
  { id: "chicken-tikka", categoryId: "Traditonal", name: "Chicken Tikka Piece", description: "Authentic BBQ chicken tikka served with chutney.", price: 450, variants: [{ label: "Leg", price: 450 }, { label: "Breast", price: 500 }], image: "/images/Oven Baked Wings.png" },

  // --- BEVERAGES ---
  { id: "cola", categoryId: "beverages", name: "Cola 500 ml", description: "Chilled soft drink.", price: 110, image: "/images/food-drink.svg" },
  { id: "cola-one-liter", categoryId: "beverages", name: "Cola 1 Liter", description: "Chilled family-size soft drink.", price: 180, image: "/images/food-drink.svg" },
  { id: "cola-large", categoryId: "beverages", name: "Cola 1.5 Liter", description: "Large chilled drink for sharing.", price: 220, image: "/images/food-drink.svg" },
  { id: "water", categoryId: "beverages", name: "Mineral Water", description: "Bottled mineral water.", price: 80, variants: [{ label: "Small", price: 80 }, { label: "Large", price: 110 }], image: "/images/food-drink.svg" }
];