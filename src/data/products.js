export const categories = [
  {
    id: "all",
    name: "All Products",
    count: 8,
    icon: "Sparkles",
    tagline: "Explore the full pure bio collection"
  },
  {
    id: "floor-surface",
    name: "Floor & Surface Care",
    count: 2,
    icon: "Sparkles",
    tagline: "Streak-free, 99.9% germ-free floors",
    image: "/images/products/floor-cleaner-lime.jpg",
    accent: "#20593E"
  },
  {
    id: "toilet-bathroom",
    name: "Toilet & Bathroom",
    count: 2,
    icon: "ShieldCheck",
    tagline: "10X deep disinfectant power with mint",
    image: "/images/products/toilet-cleaner-mint.jpg",
    accent: "#006699"
  },
  {
    id: "personal-care",
    name: "Personal Care",
    count: 2,
    icon: "Heart",
    tagline: "pH-balanced, skin-loving botanical formulas",
    image: "/images/products/hand-wash-orange.jpg",
    accent: "#D35E35"
  },
  {
    id: "kitchen-utensils",
    name: "Kitchen & Utensils",
    count: 2,
    icon: "Utensils",
    tagline: "Cuts tough grease naturally with lime oils",
    image: "/images/products/dish-wash-lime.jpg",
    accent: "#DDA133"
  }
];

export const products = [
  {
    id: "floor-cleaner-lime",
    name: "BioCleanup Floor Cleaner",
    subtitle: "Lime Flavour • Pure & Powerful",
    category: "Floor & Surface Care",
    categoryId: "floor-surface",
    price: 90,
    originalPrice: 110,
    discount: 18,
    netVol: "200ml",
    rating: 4.8,
    reviewsCount: 342,
    image: "/images/products/floor-cleaner-lime.jpg",
    images: [
      "/images/products/floor-cleaner-lime.jpg",
      "/images/products/biocleanup-labels-full.jpg"
    ],
    inStock: true,
    stock: 48,
    isBestSeller: true,
    isEcoPick: true,
    isFeatured: true,
    tag: "Best Seller",
    headline: "DEEP CLEAN | SHINE | FRESHNESS",
    shortDesc: "BioCleanup Floor Cleaner with Lime powerfully cleans tough stains, removes dirt and grime, and leaves your floors sparkling clean with a refreshing lime fragrance.",
    keyPoints: [
      "Kills 99.9% germs and household pathogens",
      "Cleans tough mud, oil, and sticky kitchen spills",
      "Safe on marble, vitrified tiles, granite & wooden floors",
      "No sticky residue or harsh chemical pungent odor"
    ],
    directions: [
      "Add 2 capfuls in half bucket of water.",
      "Mop the floor with a clean cloth or mop.",
      "No need to rinse. Dries streak-free."
    ],
    ingredients: [
      "Water",
      "Sodium Laureth Sulfate",
      "Cocamidopropyl Betaine",
      "Disodium EDTA",
      "Lime Oil",
      "Perfume",
      "Color",
      "Preservative"
    ],
    caution: "Keep out of reach of children. Avoid contact with eyes. If irritation occurs, discontinue use. Do not ingest. Store in a cool & dry place.",
    certifications: ["Powerful Cleaning", "Kills Germs", "Fresh Fragrance", "Safe on Floors", "Made in India"],
    mrpText: "MRP ₹90/- (Inclusive of all taxes)",
    barcode: "8 906123 456857"
  },
  {
    id: "floor-cleaner-lavender-1l",
    name: "BioCleanup Floor Cleaner (Lavender 1L)",
    subtitle: "Lavender Shine • 1 Litre Mega Pack",
    category: "Floor & Surface Care",
    categoryId: "floor-surface",
    price: 180,
    originalPrice: 220,
    discount: 18,
    netVol: "1L",
    rating: 4.9,
    reviewsCount: 295,
    image: "/images/products/biocleanup-labels-full.jpg",
    images: [
      "/images/products/biocleanup-labels-full.jpg",
      "/images/products/floor-cleaner-lime.jpg"
    ],
    inStock: true,
    stock: 60,
    isBestSeller: true,
    isEcoPick: true,
    isFeatured: true,
    tag: "1L Value Pack",
    headline: "LONG LASTING FRESHNESS & SHINE",
    shortDesc: "BioCleanup 1L Lavender Floor Cleaner removes dirt, stubborn stains and germs while infusing living spaces with soothing lavender aroma.",
    keyPoints: [
      "Safe • Effective • Shiny finish on all types of floors",
      "Removes deep grime without stripping natural shine",
      "Soothing lavender essential aroma lasts all day",
      "Economical 1 Litre family value pack"
    ],
    directions: [
      "Add 2 capfuls in half a bucket of water.",
      "Mop the floor with solution.",
      "No need to rinse. Streak-free drying."
    ],
    ingredients: [
      "Aqua",
      "Non-Ionic Surfactant",
      "Diethylene Glycol Monobutyl Ether",
      "Fragrance (Lavender)",
      "Color",
      "Preservative"
    ],
    caution: "Keep out of reach of children. Avoid contact with eyes. Do not ingest. Store in a cool & dry place.",
    certifications: ["Eco Friendly", "Safe on All Floors", "Long Lasting Freshness", "Recycle Pack", "Made in India"],
    mrpText: "MRP ₹180/- (Inclusive of all taxes)",
    barcode: "8 906123 456319"
  },
  {
    id: "toilet-cleaner-mint",
    name: "BioCleanup Toilet Cleaner",
    subtitle: "Fresh Mint • 10X Protection",
    category: "Toilet & Bathroom",
    categoryId: "toilet-bathroom",
    price: 90,
    originalPrice: 110,
    discount: 18,
    netVol: "500ml",
    rating: 4.9,
    reviewsCount: 489,
    image: "/images/products/toilet-cleaner-mint.jpg",
    images: [
      "/images/products/toilet-cleaner-mint.jpg",
      "/images/products/biocleanup-labels-full.jpg"
    ],
    inStock: true,
    stock: 65,
    isBestSeller: true,
    isEcoPick: true,
    isFeatured: true,
    tag: "Germ Shield",
    headline: "DEEP CLEAN | REMOVES STAINS | FRESH FRAGRANCE",
    shortDesc: "BioCleanup Toilet Cleaner is specially formulated to remove tough stains, kill 99.9% germs, and leave your toilet sparkling clean and fresh with crisp mint botanicals.",
    keyPoints: [
      "10X better cleaning & deep germ protection",
      "Thick formula clings to curved bowl walls for better coverage",
      "Removes yellow limescale and hard water mineral deposits",
      "Fresh & long-lasting natural mint fragrance"
    ],
    directions: [
      "Squeeze under the rim and around the bowl.",
      "Let it sit for 10 minutes.",
      "Brush if needed and flush."
    ],
    ingredients: [
      "Water",
      "Hydrochloric Acid (Buffered Active)",
      "Surfactant",
      "Thickener",
      "Fragrance",
      "Color"
    ],
    caution: "Keep out of reach of children. Avoid contact with eyes and skin. Do not mix with other cleaners. Wear gloves for sensitive skin.",
    certifications: ["Eco Friendly", "Thick Formula", "Disinfects Deep", "Fresh Fragrance", "Recycle Pack", "Made in India"],
    mrpText: "MRP ₹90/- (Inclusive of all taxes)",
    barcode: "8 906123 456789"
  },
  {
    id: "toilet-cleaner-10x",
    name: "BioCleanup Toilet Cleaner (Max 10X)",
    subtitle: "Heavy Duty • 500ml Value Pack",
    category: "Toilet & Bathroom",
    categoryId: "toilet-bathroom",
    price: 120,
    originalPrice: 150,
    discount: 20,
    netVol: "500ml",
    rating: 5.0,
    reviewsCount: 612,
    image: "/images/products/toilet-cleaner-10x.jpg",
    images: [
      "/images/products/toilet-cleaner-10x.jpg",
      "/images/products/toilet-cleaner-mint.jpg"
    ],
    inStock: true,
    stock: 55,
    isBestSeller: true,
    isEcoPick: true,
    isFeatured: true,
    tag: "Max Power",
    headline: "10X BETTER CLEANING & GERM PROTECTION",
    shortDesc: "BioCleanup Max 10X Toilet Cleaner is formulated for high-traffic and stubborn hard-water areas. Provides 10X stronger antimicrobial shield with extended cling action.",
    keyPoints: [
      "10X active cleaning strength with concentrated formula",
      "Eliminates 99.9% bacteria, mold, and scale build-up",
      "Curved nozzle bottle for 360-degree rim coverage",
      "Eco-conscious bottle crafted with recyclable polymers"
    ],
    directions: [
      "Squeeze under the rim and around the bowl evenly.",
      "Let it sit for 10-15 minutes for maximum action.",
      "Brush if needed and flush."
    ],
    ingredients: [
      "Water",
      "Hydrochloric Acid (Optimized Buffer)",
      "Surfactant",
      "High-Viscosity Thickener",
      "Mint Essential Oil",
      "Fragrance",
      "Color"
    ],
    caution: "Keep out of reach of children. Avoid contact with eyes and skin. Do not mix with other cleaners. Wear gloves for sensitive skin.",
    certifications: ["10X Germ Protection", "Thick Formula", "Disinfects Deep", "Recycle Pack", "Made in India"],
    mrpText: "MRP ₹120/- (Inclusive of all taxes)",
    barcode: "8 906123 456789"
  },
  {
    id: "hand-wash-lime",
    name: "BioCleanup Hand Wash (Lime Flavour)",
    subtitle: "Zesty Lime • Gentle Yet Effective",
    category: "Personal Care",
    categoryId: "personal-care",
    price: 110,
    originalPrice: 135,
    discount: 19,
    netVol: "250ml",
    rating: 4.9,
    reviewsCount: 412,
    image: "/images/products/biocleanup-labels-full.jpg",
    images: [
      "/images/products/biocleanup-labels-full.jpg",
      "/images/products/hand-wash-orange.jpg"
    ],
    inStock: true,
    stock: 75,
    isBestSeller: true,
    isEcoPick: true,
    isFeatured: true,
    tag: "Gentle Active",
    headline: "SOFT ON HANDS | TOUGH ON GERMS",
    shortDesc: "BioCleanup Hand Wash with Lime is gentle on hands and tough on germs. Its refreshing lime fragrance leaves your hands feeling fresh, squeaky clean, and hydrated.",
    keyPoints: [
      "Gentle yet effective botanical formula",
      "pH balanced 5.5 to safeguard hand skin barrier",
      "Real cold-pressed lime oils provide natural germ defense",
      "Dermatologically tested and hypoallergenic"
    ],
    directions: [
      "Pump a small amount on wet hands.",
      "Rub thoroughly for 20 seconds.",
      "Rinse well and dry."
    ],
    ingredients: [
      "Aqua",
      "Sodium Laureth Sulfate",
      "Cocamidopropyl Betaine",
      "Glycerin",
      "Fragrance",
      "Lime Oil",
      "Color",
      "Sodium Chloride",
      "Preservative"
    ],
    caution: "For external use only. Avoid contact with eyes. If irritation occurs, discontinue use.",
    certifications: ["Eco Friendly", "pH Balanced", "Dermatologically Tested", "Made in India"],
    mrpText: "MRP ₹110/- (Inclusive of all taxes)",
    barcode: "8 906123 456766"
  },
  {
    id: "hand-wash-orange",
    name: "BioCleanup Hand Wash (Orange)",
    subtitle: "Sweet Orange • pH Balanced",
    category: "Personal Care",
    categoryId: "personal-care",
    price: 110,
    originalPrice: 135,
    discount: 19,
    netVol: "200ml",
    rating: 4.9,
    reviewsCount: 524,
    image: "/images/products/hand-wash-orange.jpg",
    images: [
      "/images/products/hand-wash-orange.jpg",
      "/images/products/biocleanup-labels-full.jpg"
    ],
    inStock: true,
    stock: 82,
    isBestSeller: true,
    isEcoPick: true,
    isFeatured: true,
    tag: "Skin Gentle",
    headline: "GENTLE ON HANDS | TOUGH ON GERMS",
    shortDesc: "BioCleanup Hand Wash with Orange is gentle on hands and tough on germs. Its refreshing orange fragrance leaves your hands feeling fresh, clean, and protected.",
    keyPoints: [
      "Dermatologically tested and moisture-protective",
      "Balanced pH formulation prevents dry, cracked knuckles",
      "Enriched with natural orange and lime botanical oils",
      "Biodegradable plant-derived surfactants"
    ],
    directions: [
      "Pump a small amount onto damp hands.",
      "Rub thoroughly for 20 seconds covering wrists and cuticles.",
      "Rinse well and dry."
    ],
    ingredients: [
      "Aqua",
      "Sodium Laureth Sulfate",
      "Cocamidopropyl Betaine",
      "Glycerin",
      "Fragrance (Orange)",
      "Lime Oil",
      "Color",
      "Sodium Chloride",
      "Citric Acid",
      "Preservative"
    ],
    caution: "For external use only. Avoid contact with eyes. If irritation occurs, discontinue use. Keep out of reach of children.",
    certifications: ["Eco Friendly", "pH Balanced", "Dermatologically Tested", "Recycle Pack", "Made in India"],
    mrpText: "MRP ₹110/- (Inclusive of all taxes)",
    barcode: "8 906123 456826"
  },
  {
    id: "dish-wash-lime",
    name: "BioCleanup Dish Wash (200ml)",
    subtitle: "Lime Flavour • Grease Cutting",
    category: "Kitchen & Utensils",
    categoryId: "kitchen-utensils",
    price: 80,
    originalPrice: 95,
    discount: 16,
    netVol: "200ml",
    rating: 4.8,
    reviewsCount: 390,
    image: "/images/products/dish-wash-lime.jpg",
    images: [
      "/images/products/dish-wash-lime.jpg",
      "/images/products/biocleanup-labels-full.jpg"
    ],
    inStock: true,
    stock: 70,
    isBestSeller: true,
    isEcoPick: true,
    isFeatured: true,
    tag: "Sparkle Clean",
    headline: "POWERFUL GREASE CUTTING FORMULA",
    shortDesc: "BioCleanup Dish Wash with Lime powerfully cuts tough grease and removes oil effortlessly. Leaves your utensils sparkling clean and fresh without white residues.",
    keyPoints: [
      "Tough on grease, gentle and soft on hands",
      "Removes burnt ghee, curry stains, and food odors easily",
      "Rich foaming formula — a few drops go a long way",
      "100% rinsable without leaving chemical taste or film"
    ],
    directions: [
      "Take a few drops on a wet sponge.",
      "Wash the utensils to produce rich cleaning foam.",
      "Rinse well with water."
    ],
    ingredients: [
      "Aqua",
      "Linear Alkyl Benzene Sulphonic Acid",
      "Sodium Laureth Sulfate",
      "Cocamide DEA",
      "Cocamidopropyl Betaine",
      "Glycerin",
      "Lime Oil",
      "Color",
      "Fragrance",
      "Sodium Chloride",
      "Methylisothiazolinone",
      "Preservative"
    ],
    caution: "For external use only. Avoid contact with eyes. If irritation occurs, discontinue use. Keep out of reach of children.",
    certifications: ["Eco Friendly", "pH Balanced", "Dermatologically Tested", "Recycle Pack", "Made in India"],
    mrpText: "MRP ₹80/- (Inclusive of all taxes)",
    barcode: "8 906123 456819"
  },
  {
    id: "dish-wash-500ml",
    name: "BioCleanup Dish Wash (500ml Value Pack)",
    subtitle: "Powerful Grease Cutting • Sparkling Clean",
    category: "Kitchen & Utensils",
    categoryId: "kitchen-utensils",
    price: 140,
    originalPrice: 170,
    discount: 18,
    netVol: "500ml",
    rating: 4.9,
    reviewsCount: 468,
    image: "/images/products/biocleanup-labels-full.jpg",
    images: [
      "/images/products/biocleanup-labels-full.jpg",
      "/images/products/dish-wash-lime.jpg"
    ],
    inStock: true,
    stock: 50,
    isBestSeller: true,
    isEcoPick: true,
    isFeatured: true,
    tag: "500ml Value",
    headline: "SPARKLING CLEAN EVERY TIME",
    shortDesc: "BioCleanup Dish Wash 500ml cuts tough grease and removes oil effortlessly. Leaves your utensils sparkling clean with a fresh citrus note.",
    keyPoints: [
      "Cuts tough grease instantly",
      "Sparkling clean glassware and stainless steel",
      "Safe and soft on hands during prolonged dishwashing",
      "Value 500ml kitchen refill dispenser size"
    ],
    directions: [
      "Take a few drops on a damp sponge.",
      "Wash the utensils thoroughly.",
      "Rinse with clean water."
    ],
    ingredients: [
      "Aqua",
      "Linear Alkyl Benzene Sulphonic Acid",
      "Sodium Laureth Sulfate",
      "Cocamide DEA",
      "Fragrance",
      "Color",
      "Salt",
      "Preservative"
    ],
    caution: "Keep out of reach of children. Avoid contact with eyes. Do not ingest.",
    certifications: ["Eco Friendly", "Recycle Pack", "Made in India"],
    mrpText: "MRP ₹140/- (Inclusive of all taxes)",
    barcode: "8 906123 456802"
  }
];
