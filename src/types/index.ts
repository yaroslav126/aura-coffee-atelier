export type TabType = 'menu' | 'customizer' | 'brew-guide' | 'story' | 'locations';

export type CoffeeOrigin = {
  id: string;
  name: string;
  country: string;
  region: string;
  elevation: string;
  process: string;
  flavorNotes: string[];
  roastLevel: 'Light' | 'Medium-Light' | 'Medium' | 'Dark';
  acidity: number; // 1 - 5
  body: number; // 1 - 5
  sweetness: number; // 1 - 5
  colorHex: string;
};

export type DrinkBase = {
  id: string;
  name: string;
  category: 'espresso' | 'filter' | 'cold' | 'specialty' | 'bakery';
  basePrice: number;
  description: string;
  defaultMilkRatio: number; // 0 - 100
  supportsIce: boolean;
  supportsMilk: boolean;
  supportsSyrup: boolean;
  image: string;
  tags: string[];
  calories: number;
  caffeineMg: number;
};

export type MilkOption = 'Whole' | 'Oat (Oatly Barista)' | 'Almond' | 'Coconut' | 'None (Black)';
export type TempOption = 'Steaming Hot (65°C)' | 'Gentle Warm (55°C)' | 'Over Hand-cut Ice' | 'Nitro Draft Chilled';
export type SyrupOption = 'None' | 'Bourbon Vanilla' | 'Salted Brown Demerara' | 'Cardamom Honey' | 'Spiced Lavender';

export type CustomDrinkState = {
  baseDrink: DrinkBase;
  origin: CoffeeOrigin;
  size: '8oz Small' | '12oz Standard' | '16oz Grand';
  milk: MilkOption;
  milkRatio: number; // 0 to 100 percentage
  temperature: TempOption;
  sweetness: '0% Unsweetened' | '25% Subtle' | '50% Balanced' | '100% Rich';
  syrup: SyrupOption;
  extraShot: boolean;
  foamLevel: 'None' | 'Velvet Microfoam' | 'Extra Cloud Foam';
};

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  details: string[];
  image?: string;
  customization?: Partial<CustomDrinkState>;
};

export type BrewMethod = {
  id: string;
  name: string;
  tagline: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Master';
  ratio: string;
  defaultCoffeeGrams: number;
  defaultWaterGrams: number;
  grindSize: string;
  waterTemp: string;
  totalTimeSeconds: number;
  steps: {
    title: string;
    description: string;
    durationSeconds: number;
    targetWaterGrams: number;
  }[];
};

export type LocationInfo = {
  id: string;
  name: string;
  tagline: string;
  address: string;
  neighborhood: string;
  hours: {
    weekdays: string;
    weekends: string;
  };
  phone?: string;
  telegram?: string;
  telegramUrl?: string;
  responseSla?: string;
  antiAiProtected?: boolean;
  features: string[];
  currentStatus: 'Open Now' | 'Closing Soon' | 'Closed';
  image: string;
};

export type ReservationPayload = {
  name: string;
  email: string;
  phone: string;
  locationId: string;
  date: string;
  time: string;
  guests: number;
  notes?: string;
};

export type OrderPayload = {
  items: CartItem[];
  orderType: 'dine-in' | 'pickup' | 'barista-counter';
  customerName: string;
  customerPhone: string;
  pickupTime: string;
  tipPercent: number;
  totalAmount: number;
  csrfToken?: string;
};
