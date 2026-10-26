import { CoffeeOrigin, DrinkBase, BrewMethod, LocationInfo } from '../types';

export const COFFEE_ORIGINS: CoffeeOrigin[] = [
  {
    id: 'ethiopia-geisha',
    name: 'Guji Highland Geisha',
    country: 'Ethiopia',
    region: 'Oromia, Guji Zone',
    elevation: '2,150 MASL',
    process: 'Natural Anaerobic Fermentation (72h)',
    flavorNotes: ['Bergamot Blossom', 'White Peach', 'Wild Strawberry', 'Meyer Lemon'],
    roastLevel: 'Light',
    acidity: 5,
    body: 3,
    sweetness: 5,
    colorHex: '#C97D4B'
  },
  {
    id: 'colombia-pink-bourbon',
    name: 'Huila Pink Bourbon',
    country: 'Colombia',
    region: 'San Adolfo, Huila',
    elevation: '1,920 MASL',
    process: 'Washed Extended Maceration',
    flavorNotes: ['Pink Guava', 'Blood Orange', 'Cane Honey', 'Jasmine Tea'],
    roastLevel: 'Medium-Light',
    acidity: 4,
    body: 4,
    sweetness: 5,
    colorHex: '#B25D34'
  },
  {
    id: 'guatemala-antigua',
    name: 'Antigua Los Volcanes',
    country: 'Guatemala',
    region: 'Sacatepéquez Valley',
    elevation: '1,750 MASL',
    process: 'Traditional Patio Washed',
    flavorNotes: ['Dark Cocoa 85%', 'Toasted Macadamia', 'Nutmeg', 'Dried Fig'],
    roastLevel: 'Medium',
    acidity: 2,
    body: 5,
    sweetness: 4,
    colorHex: '#6E4129'
  },
  {
    id: 'sumatra-kerinci',
    name: 'Mount Kerinci Peaberry',
    country: 'Indonesia',
    region: 'West Sumatra',
    elevation: '1,600 MASL',
    process: 'Giling Basah (Wet Hulled)',
    flavorNotes: ['Cedar Wood', 'Dark Molasses', 'Smoked Black Cardamom', 'Earthy Herbal'],
    roastLevel: 'Dark',
    acidity: 1,
    body: 5,
    sweetness: 3,
    colorHex: '#42281D'
  }
];

export const DRINK_BASES: DrinkBase[] = [
  {
    id: 'pour-over-single',
    name: 'V60 Precision Pour-Over',
    category: 'filter',
    basePrice: 6.75,
    description: 'Slow-dripped single origin coffee extracted at 93°C to unlock delicate floral aromatics and high terroir fidelity.',
    defaultMilkRatio: 0,
    supportsIce: true,
    supportsMilk: false,
    supportsSyrup: false,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop',
    tags: ['Filter', 'Single-Origin', 'Clean Acidity', 'Zero Sugar'],
    calories: 5,
    caffeineMg: 145
  },
  {
    id: 'oat-flat-white',
    name: 'Silken Oat Flat White',
    category: 'espresso',
    basePrice: 5.85,
    description: 'Double ristretto espresso pulled at 9 bars, married with micro-textured steamed oat milk for velvety mouthfeel.',
    defaultMilkRatio: 70,
    supportsIce: true,
    supportsMilk: true,
    supportsSyrup: true,
    image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?q=80&w=800&auto=format&fit=crop',
    tags: ['Espresso', 'Velvet Foam', 'Customer Favorite', 'Plant-Based'],
    calories: 130,
    caffeineMg: 150
  },
  {
    id: 'kyoto-cold-drip',
    name: 'Kyoto 16-Hour Cold Drip',
    category: 'cold',
    basePrice: 7.25,
    description: 'Extracted drop-by-drop through handcrafted glass towers over 16 hours. Wine-like clarity with zero astringency.',
    defaultMilkRatio: 0,
    supportsIce: true,
    supportsMilk: true,
    supportsSyrup: true,
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?q=80&w=800&auto=format&fit=crop',
    tags: ['Cold Brew', '16h Tower', 'High Caffeine', 'Silky'],
    calories: 10,
    caffeineMg: 210
  },
  {
    id: 'cardamom-cortado',
    name: 'Valencia Orange Cortado',
    category: 'espresso',
    basePrice: 5.25,
    description: 'Equal parts dense ristretto and warm milk, kissed with expressed organic Valencia orange zest and cardamom mist.',
    defaultMilkRatio: 50,
    supportsIce: false,
    supportsMilk: true,
    supportsSyrup: true,
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?q=80&w=800&auto=format&fit=crop',
    tags: ['Signature', '1:1 Ratio', 'Aromatic Citrus'],
    calories: 75,
    caffeineMg: 140
  },
  {
    id: 'matcha-espresso-cloud',
    name: 'Kyoto Matcha Cloud & Tonic',
    category: 'specialty',
    basePrice: 7.50,
    description: 'Ceremonial grade Uji matcha whisked with fresh chilled tonic water, crowned with a floating espresso cream float.',
    defaultMilkRatio: 25,
    supportsIce: true,
    supportsMilk: true,
    supportsSyrup: true,
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?q=80&w=800&auto=format&fit=crop',
    tags: ['Layered', 'Ceremonial Matcha', 'Effervescent', 'Atelier Special'],
    calories: 110,
    caffeineMg: 125
  },
  {
    id: 'nitro-vanilla-draft',
    name: 'Nitro Sweet Crema Draft',
    category: 'cold',
    basePrice: 6.95,
    description: 'Infused with food-grade pure nitrogen for a cascading Guinness-like head, infused with Madagascar vanilla bean extract.',
    defaultMilkRatio: 30,
    supportsIce: true,
    supportsMilk: true,
    supportsSyrup: true,
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=800&auto=format&fit=crop',
    tags: ['Nitro Tap', 'Cascading Head', 'Vanilla Bean'],
    calories: 140,
    caffeineMg: 195
  },
  {
    id: 'croissant-kouign-amann',
    name: 'Breton Salted Butter Kouign-Amann',
    category: 'bakery',
    basePrice: 5.50,
    description: 'Laminated French butter pastry caramelized with Guérande flaky sea salt and raw demerara sugar.',
    defaultMilkRatio: 0,
    supportsIce: false,
    supportsMilk: false,
    supportsSyrup: false,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=800&auto=format&fit=crop',
    tags: ['Artisanal Bakery', 'Caramelized', 'Warm Baked Daily'],
    calories: 380,
    caffeineMg: 0
  },
  {
    id: 'cardamom-knot',
    name: 'Nordic Cardamom & Pistachio Braid',
    category: 'bakery',
    basePrice: 5.25,
    description: 'Slow-fermented sourdough brioche knotted with freshly crushed green cardamom pods and roasted Iranian pistachios.',
    defaultMilkRatio: 0,
    supportsIce: false,
    supportsMilk: false,
    supportsSyrup: false,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format&fit=crop',
    tags: ['Brioche', 'Green Cardamom', 'Nordic Heritage'],
    calories: 340,
    caffeineMg: 0
  },
  {
    id: 'chemex-gesha-reserve',
    name: 'Panama Geisha Reserve Chemex',
    category: 'filter',
    basePrice: 8.50,
    description: 'Rare high-altitude Geisha from Boquete, brewed on heavy bonded filters. Intensely floral with jasmine, bergamot, and white honey.',
    defaultMilkRatio: 0,
    supportsIce: true,
    supportsMilk: false,
    supportsSyrup: false,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop',
    tags: ['Filter', 'Single-Origin', 'Customer Favorite', 'Zero Sugar'],
    calories: 5,
    caffeineMg: 155
  },
  {
    id: 'batch-brew-daily',
    name: 'Convection Daily Batch Brew',
    category: 'filter',
    basePrice: 4.50,
    description: 'Fresh thermos brew of our rotating seasonal single-origin micro-lot. Notes of red apple crisp, milk chocolate, and clover honey.',
    defaultMilkRatio: 0,
    supportsIce: false,
    supportsMilk: true,
    supportsSyrup: true,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop',
    tags: ['Filter', 'Single-Origin', 'Zero Sugar'],
    calories: 5,
    caffeineMg: 160
  },
  {
    id: 'espresso-flight-duo',
    name: 'Terroir Espresso Flight Duo',
    category: 'espresso',
    basePrice: 6.50,
    description: 'Side-by-side sensory experience: one neat single-origin espresso shot paired with a 2oz velvety macchiato.',
    defaultMilkRatio: 30,
    supportsIce: false,
    supportsMilk: true,
    supportsSyrup: false,
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=800&auto=format&fit=crop',
    tags: ['Espresso', 'Single-Origin', 'Customer Favorite'],
    calories: 45,
    caffeineMg: 180
  },
  {
    id: 'tonic-espresso-spritz',
    name: 'Meyer Lemon Espresso Tonic',
    category: 'espresso',
    basePrice: 6.85,
    description: 'Crisp artisanal Mediterranean tonic on ice, layered with double Ethiopian espresso and an expressed Meyer lemon peel.',
    defaultMilkRatio: 0,
    supportsIce: true,
    supportsMilk: false,
    supportsSyrup: true,
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=800&auto=format&fit=crop',
    tags: ['Espresso', 'Plant-Based', 'Zero Sugar', 'Customer Favorite'],
    calories: 40,
    caffeineMg: 145
  },
  {
    id: 'cascara-sparkling-fizz',
    name: 'Cascara Botanical Spritz',
    category: 'cold',
    basePrice: 6.25,
    description: 'Brewed from sun-dried organic coffee fruit husk, sparkling botanical water, cold-pressed yuzu, and wild mint leaves.',
    defaultMilkRatio: 0,
    supportsIce: true,
    supportsMilk: false,
    supportsSyrup: false,
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=800&auto=format&fit=crop',
    tags: ['Cold Brew', 'Plant-Based', 'Zero Sugar'],
    calories: 25,
    caffeineMg: 75
  },
  {
    id: 'cold-brew-nitro-cloud',
    name: 'Smoked Sea Salt Cream Nitro',
    category: 'cold',
    basePrice: 7.25,
    description: 'Draft nitro cold brew crowned with aerated sweet cream cloud and a delicate pinch of Maldon smoked sea salt flakes.',
    defaultMilkRatio: 25,
    supportsIce: true,
    supportsMilk: true,
    supportsSyrup: true,
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?q=80&w=800&auto=format&fit=crop',
    tags: ['Cold Brew', 'Nitro Tap', 'Customer Favorite'],
    calories: 120,
    caffeineMg: 200
  },
  {
    id: 'himalayan-pink-latte',
    name: 'Spiced Cardamom Honey Latte',
    category: 'specialty',
    basePrice: 6.75,
    description: 'Raw mountain wildflower honey, crushed green cardamom, and double espresso swirled with steamed oat milk.',
    defaultMilkRatio: 70,
    supportsIce: true,
    supportsMilk: true,
    supportsSyrup: true,
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=800&auto=format&fit=crop',
    tags: ['Specialty', 'Plant-Based', 'Customer Favorite'],
    calories: 160,
    caffeineMg: 140
  },
  {
    id: 'valrhona-dark-mocha',
    name: 'Valrhona 72% Noir Mocha',
    category: 'specialty',
    basePrice: 7.00,
    description: 'Melted Ecuadorian single-estate dark chocolate, double espresso, whole milk, and dusted with roasted cocoa nibs.',
    defaultMilkRatio: 65,
    supportsIce: true,
    supportsMilk: true,
    supportsSyrup: true,
    image: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?q=80&w=800&auto=format&fit=crop',
    tags: ['Specialty', 'Customer Favorite'],
    calories: 280,
    caffeineMg: 155
  },
  {
    id: 'pistachio-croissant',
    name: 'Twice-Baked Pistachio Croissant',
    category: 'bakery',
    basePrice: 6.25,
    description: 'Flaky artisan butter croissant filled with velvety Bronte pistachio frangipane, toasted slices, and snow sugar.',
    defaultMilkRatio: 0,
    supportsIce: false,
    supportsMilk: false,
    supportsSyrup: false,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=800&auto=format&fit=crop',
    tags: ['Artisanal Bakery', 'Customer Favorite', 'Warm Baked Daily'],
    calories: 420,
    caffeineMg: 0
  },
  {
    id: 'cannele-de-bordeaux',
    name: 'Vanilla Bean Cannelé de Bordeaux',
    category: 'bakery',
    basePrice: 4.75,
    description: 'Traditional French pastry baked in copper molds with beeswax: thick caramelized crust with soft custard rum center.',
    defaultMilkRatio: 0,
    supportsIce: false,
    supportsMilk: false,
    supportsSyrup: false,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format&fit=crop',
    tags: ['Artisanal Bakery', 'Warm Baked Daily'],
    calories: 220,
    caffeineMg: 0
  }
];

export const BREW_METHODS: BrewMethod[] = [
  {
    id: 'hario-v60',
    name: 'Hario V60 Ceramic Dripper',
    tagline: 'Precision 60-degree spiral ribs for bright, tea-like floral clarity.',
    difficulty: 'Intermediate',
    ratio: '1:16.6 (15g Coffee to 250g Water)',
    defaultCoffeeGrams: 15,
    defaultWaterGrams: 250,
    grindSize: 'Medium-Fine (Table Salt)',
    waterTemp: '93°C (200°F)',
    totalTimeSeconds: 180,
    steps: [
      {
        title: 'Bloom & Degas',
        description: 'Pour 45g water in gentle spirals from center outward. Let coffee release CO2 gases.',
        durationSeconds: 40,
        targetWaterGrams: 45
      },
      {
        title: 'Primary Extraction',
        description: 'Pour in steady concentric circles up to 150g. Keep stream vertical and continuous.',
        durationSeconds: 50,
        targetWaterGrams: 150
      },
      {
        title: 'Secondary Top-Up',
        description: 'Add final water volume to 250g with gentle turbulence to level the coffee bed.',
        durationSeconds: 45,
        targetWaterGrams: 250
      },
      {
        title: 'Drawdown & Swirl',
        description: 'Allow gravity extraction through filter. Give the carafe a light swirl to homogenize.',
        durationSeconds: 45,
        targetWaterGrams: 250
      }
    ]
  },
  {
    id: 'chemex-wood-collar',
    name: 'Chemex 6-Cup Glass Carafe',
    tagline: 'Heavy bonded triple-folded filters for exceptionally clean body and sweet finish.',
    difficulty: 'Intermediate',
    ratio: '1:15.5 (30g Coffee to 465g Water)',
    defaultCoffeeGrams: 30,
    defaultWaterGrams: 465,
    grindSize: 'Medium-Coarse (Kosher Salt)',
    waterTemp: '94°C (202°F)',
    totalTimeSeconds: 240,
    steps: [
      {
        title: 'Filter Rinse & Warm',
        description: 'Rinse heavy paper filter with 200g boiling water to eliminate paper taste. Discard rinse water.',
        durationSeconds: 30,
        targetWaterGrams: 0
      },
      {
        title: 'Initial Bloom',
        description: 'Saturate grounds with 80g water. Wait 45 seconds for aromatic ballooning.',
        durationSeconds: 45,
        targetWaterGrams: 80
      },
      {
        title: 'Center Pour Phase 1',
        description: 'Pour steadily without touching glass walls until scale reads 270g.',
        durationSeconds: 65,
        targetWaterGrams: 270
      },
      {
        title: 'Final Pulse & Drawdown',
        description: 'Complete pour to 465g. Allow even flat bed drawdown for crisp clarity.',
        durationSeconds: 100,
        targetWaterGrams: 465
      }
    ]
  },
  {
    id: 'aeropress-inverted',
    name: 'AeroPress Inverted Method',
    tagline: 'Immersion combined with pneumatic air pressure for intense syrup-like body.',
    difficulty: 'Beginner',
    ratio: '1:12 (18g Coffee to 216g Water)',
    defaultCoffeeGrams: 18,
    defaultWaterGrams: 216,
    grindSize: 'Medium-Fine',
    waterTemp: '88°C (190°F)',
    totalTimeSeconds: 120,
    steps: [
      {
        title: 'Setup & Pour',
        description: 'Set AeroPress in inverted position. Add 18g coffee and pour all 216g water within 20s.',
        durationSeconds: 20,
        targetWaterGrams: 216
      },
      {
        title: 'Submerged Agitation',
        description: 'Stir vigorously with paddle for 10 seconds back and forth. Attach rinsed cap.',
        durationSeconds: 20,
        targetWaterGrams: 216
      },
      {
        title: 'Immersion Steep',
        description: 'Let coffee extract under airtight vacuum seal for 50 seconds.',
        durationSeconds: 50,
        targetWaterGrams: 216
      },
      {
        title: 'Invert & Gentle Press',
        description: 'Flip onto server and press plunger slowly for 30 seconds until faint hiss.',
        durationSeconds: 30,
        targetWaterGrams: 216
      }
    ]
  },
  {
    id: 'french-press-immersion',
    name: 'French Press Immersion',
    tagline: 'Full immersion brew retaining all aromatic coffee oils for deep, creamy body.',
    difficulty: 'Beginner',
    ratio: '1:15 (20g Coffee to 300g Water)',
    defaultCoffeeGrams: 20,
    defaultWaterGrams: 300,
    grindSize: 'Coarse (Sea Salt)',
    waterTemp: '95°C (203°F)',
    totalTimeSeconds: 240,
    steps: [
      {
        title: 'Initial Pour & Saturation',
        description: 'Pour all 300g water rapidly over grounds, ensuring all particles are fully wetted.',
        durationSeconds: 30,
        targetWaterGrams: 300
      },
      {
        title: 'Crust Formation Steep',
        description: 'Place plunger lightly on top without pressing down. Allow crust to form for 3 minutes.',
        durationSeconds: 150,
        targetWaterGrams: 300
      },
      {
        title: 'Break Crust & Skim',
        description: 'Use spoon to stir top crust 3 times. Skim off white foam and floating grounds for clean cup.',
        durationSeconds: 30,
        targetWaterGrams: 300
      },
      {
        title: 'Gentle Press & Decant',
        description: 'Slowly press plunger down to filter mesh. Pour immediately to prevent over-steeping.',
        durationSeconds: 30,
        targetWaterGrams: 300
      }
    ]
  },
  {
    id: 'clever-dripper-hybrid',
    name: 'Clever Dripper Hybrid',
    tagline: 'Best of both worlds: full immersion sweetness with paper filter clarity.',
    difficulty: 'Beginner',
    ratio: '1:16 (16g Coffee to 256g Water)',
    defaultCoffeeGrams: 16,
    defaultWaterGrams: 256,
    grindSize: 'Medium (Sand)',
    waterTemp: '93°C (200°F)',
    totalTimeSeconds: 180,
    steps: [
      {
        title: 'Water First Addition',
        description: 'Pour 256g water into dripper first to maintain stable slurry temperature.',
        durationSeconds: 25,
        targetWaterGrams: 256
      },
      {
        title: 'Add Grounds & Gentle Stir',
        description: 'Add 16g grounds on top of water. Stir gently 4 times to submerge all grounds.',
        durationSeconds: 25,
        targetWaterGrams: 256
      },
      {
        title: 'Closed Valve Steep',
        description: 'Cover with lid and let steep untouched for 90 seconds for rich extraction.',
        durationSeconds: 90,
        targetWaterGrams: 256
      },
      {
        title: 'Release & Drawdown',
        description: 'Place onto your mug or server to activate drawdown valve. Clear cup in 40s.',
        durationSeconds: 40,
        targetWaterGrams: 256
      }
    ]
  }
];

export const LOCATIONS: LocationInfo[] = [
  {
    id: 'atelier-downtown',
    name: 'Aura Atelier & Tasting Lab',
    tagline: 'Flagship Micro-Roastery & 12-Seat Omakase Coffee Bar',
    address: 'Design & Tech Quarter, Creative Atelier',
    neighborhood: 'Downtown Arts Precinct',
    hours: {
      weekdays: '7:00 AM – 7:30 PM',
      weekends: '8:00 AM – 8:00 PM'
    },
    telegram: '@Slava_Dev_bot',
    telegramUrl: 'https://t.me/Slava_Dev_bot',
    responseSla: 'in 24 hours',
    antiAiProtected: true,
    features: ['Slayer Steam LP Espresso Bars', 'Kyoto Cold Drip Wall', 'Cupping Table & Workshops', 'High-Speed Fiber & Acoustic Booths'],
    currentStatus: 'Open Now',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'roastery-haven',
    name: 'The Greenhouse & Brew Garden',
    tagline: 'Botanical Glasshouse & Outdoor Tasting Terrace',
    address: 'Botanical Glasshouse & Garden Terrace',
    neighborhood: 'Harbor Park District',
    hours: {
      weekdays: '7:30 AM – 6:00 PM',
      weekends: '8:00 AM – 7:00 PM'
    },
    telegram: '@Slava_Dev_bot',
    telegramUrl: 'https://t.me/Slava_Dev_bot',
    responseSla: 'in 24 hours',
    antiAiProtected: true,
    features: ['Open-Air Skylight Patio', 'Dog Friendly Terrace', 'Nitro Tap Island', 'Weekend Live Jazz Sessions'],
    currentStatus: 'Open Now',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800&auto=format&fit=crop'
  }
];
