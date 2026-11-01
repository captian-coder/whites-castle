export const dessertFlavors = {
  pastry: [
    { name: "Caramel Pastry", price: 400 },
    { name: "Brownies Cheese Cake Pastry", price: 500 },
    { name: "Nutella Pastry", price: 500 },
    { name: "Carrot Pastry", price: 500 },
    { name: "Crunchy Brownie Pastry", price: 500 },
    { name: "Caramel Brownies Pastry", price: 500 },
    { name: "Lotus Milky Pastry", price: 500 },
    { name: "Ferrero Pastry", price: 600 },
  ],
  cakes: [
    { name: "Caramel Crunch Cake", price: 1700 },
    { name: "Chocolate Fudge Cake", price: 1700 },
    { name: "Red Velvet Cheese Cake", price: 1800 },
    { name: "Nutella Heaven Cake", price: 1900 },
    { name: "Lotus Biscoff Cake", price: 2000 },
    { name: "Ferrero Rocher Cake", price: 2200 },
  ],
  sundae: [
    { name: "Chocolate Sundae", price: 500 },
    { name: "Caramel Crunch Sundae", price: 500 },
    { name: "Strawberry Swirl Sundae", price: 500 },
    { name: "Nutella Sundae", price: 550 },
  ],
};

export type DessertFlavorKey = keyof typeof dessertFlavors;