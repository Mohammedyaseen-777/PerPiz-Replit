export type Variant = { label: string; price: number };

export type MenuItem = {
  id: string;
  name: string;
  category: string;
  variants: Variant[];
  description?: string;
  badge?: 'BS' | 'FE';
  vegetarian?: boolean;
};

const sizes = (small: number, medium: number, large: number): Variant[] => [
  { label: 'S', price: small },
  { label: 'M', price: medium },
  { label: 'L', price: large },
];

const vegNonVeg = (veg: number, nonVeg: number): Variant[] => [
  { label: 'Veg', price: veg },
  { label: 'Non-Veg', price: nonVeg },
];

export const categories = [
  'ALL',
  'CHEESE PIZZA',
  'VEG PIZZA',
  'NON-VEG PIZZA',
  'TACO',
  'BURGER',
  'GARLIC BREAD',
  'PASTA',
  'FRENCH FRIES',
  'SLICE',
  'DIPS',
  'DESSERTS',
  'CRUST',
  'ADDONS',
] as const;

export const menuItems: MenuItem[] = [
  { id: 'butter-masala-taco', name: 'Butter Masala Taco', category: 'TACO', variants: vegNonVeg(185, 219) },
  { id: 'perpiz-special-taco', name: 'PerPiz Special Taco', category: 'TACO', variants: vegNonVeg(185, 219) },

  { id: 'salted-french-fries', name: 'Salted French Fries', category: 'FRENCH FRIES', variants: [{ label: 'Regular', price: 85 }] },
  { id: 'peri-peri-fries', name: 'Peri Peri Fries', category: 'FRENCH FRIES', variants: [{ label: 'Regular', price: 119 }] },
  { id: 'cheese-loaded-fries', name: 'Cheese Loaded Fries', category: 'FRENCH FRIES', variants: [{ label: 'Regular', price: 155 }] },
  { id: 'chicken-loaded-fries', name: 'Chicken Loaded Fries', category: 'FRENCH FRIES', variants: [{ label: 'Regular', price: 209 }], badge: 'BS' },

  { id: 'dynamite-chicken-burger', name: 'Dynamite Chicken Burger', category: 'BURGER', variants: [{ label: 'Regular', price: 209 }], badge: 'BS' },
  { id: 'korean-chicken-burger', name: 'Korean Chicken Burger', category: 'BURGER', variants: [{ label: 'Regular', price: 219 }], badge: 'FE' },
  { id: 'chicken-cheese-supreme-burger', name: 'Chicken Cheese Supreme Burger', category: 'BURGER', variants: [{ label: 'Regular', price: 229 }] },
  { id: 'up-and-down-chicken-burger', name: 'Up & Down Chicken Burger', category: 'BURGER', variants: [{ label: 'Regular', price: 359 }] },
  { id: 'american-meat-burger', name: 'American Meat Burger', category: 'BURGER', variants: [{ label: 'Regular', price: 229 }] },

  { id: 'garlic-sticks-dip', name: 'Garlic Sticks with Dip', category: 'GARLIC BREAD', variants: [{ label: 'Regular', price: 129 }], description: 'Fresh baked garlic sticks topped with inhouse seasoning with a creamy cheese dip' },
  { id: 'stuffed-garlic-bread-veg', name: 'Stuffed Garlic Bread Veg', category: 'GARLIC BREAD', variants: [{ label: 'Regular', price: 165 }], description: 'Cheese garlic bread packed with corn and a hint of jalapeno heat' },
  { id: 'stuffed-chicken-garlic-bread', name: 'Stuffed Chicken Garlic Bread', category: 'GARLIC BREAD', variants: [{ label: 'Regular', price: 185 }], description: 'Soft, cheesy garlic bread stuffed with juicy chicken and sweet corn' },
  { id: 'punjabi-garlic-bread', name: 'Punjabi Garlic Bread', category: 'GARLIC BREAD', variants: vegNonVeg(165, 185), description: 'Paneer/Chicken tossed in Makhni sauce with cheese' },

  { id: 'jalapeno-cream-cheesy', name: 'Jalapeno Cream Cheesy', category: 'PASTA', variants: vegNonVeg(165, 185), badge: 'BS', description: 'Chef-made jalapeno cheese sauce tossed with pasta, corn and jalapenos' },
  { id: 'spicy-herb-pasta', name: 'Spicy Herb Pasta', category: 'PASTA', variants: vegNonVeg(165, 185), description: 'Fiery herb sauce meets pasta, with sizzling onion and capsicum on top' },
  { id: 'cheesy-alfredo-pasta', name: 'Cheesy Alfredo Pasta', category: 'PASTA', variants: vegNonVeg(165, 185), description: 'Rich, creamy Alfredo sauce loaded with corn and capsicum goodness' },

  { id: 'cheese-dip', name: 'Cheese Dip', category: 'DIPS', variants: [{ label: 'Regular', price: 50 }] },
  { id: 'jalapeno-dip', name: 'Jalapeno Dip', category: 'DIPS', variants: [{ label: 'Regular', price: 50 }] },
  { id: 'chipotle-dip', name: 'Chipotle Dip', category: 'DIPS', variants: [{ label: 'Regular', price: 50 }] },
  { id: 'tandoori-dip', name: 'Tandoori Dip', category: 'DIPS', variants: [{ label: 'Regular', price: 50 }] },

  { id: 'choco-lava-cake', name: 'Choco Lava Cake', category: 'DESSERTS', variants: [{ label: 'Regular', price: 119 }] },
  { id: 'nutella-cheese-cake', name: 'Nutella Cheese Cake', category: 'DESSERTS', variants: [{ label: 'Regular', price: 195 }] },
  { id: 'biscoff-cheese-cake', name: 'Biscoff Cheese Cake', category: 'DESSERTS', variants: [{ label: 'Regular', price: 219 }], badge: 'BS' },

  { id: 'margherita-pizza', name: 'Margherita Pizza', category: 'CHEESE PIZZA', variants: sizes(129, 285, 399), description: 'An all time classic, featuring perfect aerated crust and fresh mozzarella cheese' },
  { id: 'double-cheese-margherita', name: 'Double Cheese Margherita Pizza', category: 'CHEESE PIZZA', variants: sizes(229, 339, 475), description: 'Crispy crust, tangy sauce, melty cheese, fresh capsicum' },
  { id: 'creamy-margherita', name: 'Creamy Margherita Pizza', category: 'CHEESE PIZZA', variants: sizes(229, 339, 475), description: 'A Margherita with added creamy sauce' },
  { id: 'four-cheese-pizza', name: 'Four Cheese Pizza', category: 'CHEESE PIZZA', variants: sizes(275, 405, 525), description: 'Treat your taste buds with a blend of four cheese' },
  { id: 'divine-margherita', name: 'Divine Margherita', category: 'CHEESE PIZZA', variants: sizes(295, 469, 595), badge: 'BS', description: 'Combination of 7 types of cheese — jalapeno cheese, mozzarella, cheddar, Monterey Jack, Colby, orange cheddar' },

  { id: 'capsicum-carnival', name: 'Capsicum Carnival Pizza', category: 'VEG PIZZA', variants: sizes(129, 285, 395), description: 'Crispy crust, tangy sauce, melty cheese, fresh capsicum' },
  { id: 'cheese-corn-pizza', name: 'Cheese & Corn Pizza', category: 'VEG PIZZA', variants: sizes(229, 339, 475), description: 'Golden corn and cheese' },
  { id: 'pep-and-spice', name: 'Pep & Spice Pizza', category: 'VEG PIZZA', variants: sizes(275, 405, 525), badge: 'BS', description: 'Trio of bell peppers with extra spice and red paprika' },
  { id: 'tandoori-paneer-pizza', name: 'Tandoori Paneer Pizza', category: 'VEG PIZZA', variants: sizes(275, 405, 525), description: 'Tandoori paneer, crisp onion and spicy jalapeno' },
  { id: 'makhni-paneer-pizza', name: 'Makhni Paneer Pizza', category: 'VEG PIZZA', variants: sizes(275, 405, 525), description: 'Creamy sauce with paneer, red and yellow capsicum' },
  { id: 'supreme-veg-pizza', name: 'Supreme Veg Pizza', category: 'VEG PIZZA', variants: sizes(295, 475, 595), description: 'Trio of bell peppers, jalapeno, olives, corn and red paprika' },
  { id: 'kadhai-paneer-pizza', name: 'Kadhai Paneer Pizza', category: 'VEG PIZZA', variants: sizes(295, 475, 595), badge: 'BS', description: 'Soft sautéed paneer in kadhai gravy, topped with onion and capsicum' },
  { id: 'chilli-paneer-pizza', name: 'Chilli Paneer Pizza', category: 'VEG PIZZA', variants: sizes(295, 475, 595), description: 'Paneer and red paprika with spicy sauce' },

  { id: 'tandoori-chicken-pizza', name: 'Tandoori Chicken Pizza', category: 'NON-VEG PIZZA', variants: sizes(275, 405, 529), description: 'Tandoori chicken, crisp onion and spicy jalapeno' },
  { id: 'makhni-chicken-pizza', name: 'Makhni Chicken Pizza', category: 'NON-VEG PIZZA', variants: sizes(275, 405, 529), badge: 'BS', description: 'Creamy sauce with chicken, red and yellow capsicum' },
  { id: 'barbeque-chicken-pizza', name: 'Barbeque Chicken Pizza', category: 'NON-VEG PIZZA', variants: sizes(275, 405, 529), description: 'Toasted chicken in barbeque sauce and olives' },
  { id: 'kadhai-chicken-pizza', name: 'Kadhai Chicken Pizza', category: 'NON-VEG PIZZA', variants: sizes(295, 475, 595), badge: 'BS', description: 'Soft sautéed chicken in kadhai gravy, topped with onion and capsicum' },
  { id: 'chicken-chilly-pizza', name: 'Chicken Chilly Pizza', category: 'NON-VEG PIZZA', variants: sizes(295, 475, 595), description: 'Chicken and red paprika with spicy sauce' },
  { id: 'perpiz-special-pizza', name: 'Perpiz Special Pizza', category: 'NON-VEG PIZZA', variants: sizes(295, 475, 595), badge: 'BS', description: 'Triple meat pizza with chicken, salami and seekh kebab on spicy base' },
  { id: 'korean-seekh-kabab-pizza', name: 'Korean Seekh Kabab Pizza', category: 'NON-VEG PIZZA', variants: sizes(295, 475, 595), description: 'Homemade chicken seekh with Korean sauce and red paprika' },

  { id: 'margherita-slice', name: 'Margherita Slice Cheese Burst', category: 'SLICE', variants: [{ label: 'Veg', price: 129 }] },
  { id: 'veggie-slice', name: 'Veggie Slice Cheese Burst', category: 'SLICE', variants: [{ label: 'Veg', price: 165 }] },
  { id: 'tandoori-slice', name: 'Tandoori Slice Cheese Burst', category: 'SLICE', variants: vegNonVeg(165, 185) },
  { id: 'chipotle-slice', name: 'Chipotle Slice Cheese Burst', category: 'SLICE', variants: vegNonVeg(165, 185) },
  { id: 'kadhai-slice', name: 'Kadhai Slice Cheese Burst', category: 'SLICE', variants: vegNonVeg(165, 185) },
  { id: 'divine-margherita-slice', name: 'Divine Margherita Slice Cheese Burst', category: 'SLICE', variants: [{ label: 'Veg', price: 219 }] },
  { id: 'perpiz-special-slice', name: 'Perpiz Special Slice Cheeseburst', category: 'SLICE', variants: [{ label: 'Non-Veg', price: 219 }] },

  { id: 'cheese-burst', name: 'Cheese Burst', category: 'CRUST', variants: sizes(65, 90, 120), badge: 'BS' },
  { id: 'thin-crust', name: 'Thin Crust', category: 'CRUST', variants: sizes(25, 35, 35) },

  { id: 'extra-cheese', name: 'Extra cheese', category: 'ADDONS', variants: [{ label: 'Slice', price: 15 }, { label: 'S', price: 45 }, { label: 'M', price: 65 }, { label: 'L', price: 99 }] },
  { id: 'extra-paneer', name: 'Extra paneer', category: 'ADDONS', variants: [{ label: 'Slice', price: 25 }, { label: 'S', price: 45 }, { label: 'M', price: 65 }, { label: 'L', price: 99 }] },
  { id: 'extra-chicken', name: 'Extra chicken', category: 'ADDONS', variants: [{ label: 'Slice', price: 25 }, { label: 'S', price: 45 }, { label: 'M', price: 65 }, { label: 'L', price: 99 }] },
  { id: 'extra-topping', name: 'Extra Topping', category: 'ADDONS', variants: [{ label: 'Slice', price: 25 }, { label: 'S', price: 25 }, { label: 'M', price: 35 }, { label: 'L', price: 44 }] },
];

export const menuByCategory = categories.slice(1).map((category) => ({
  category,
  items: menuItems.filter((item) => item.category === category),
}));