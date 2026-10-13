export interface ProductColor {
  name: string;
  code: string;
  image?: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  location: string;
  productVariant?: string;
  comment: string;
}

export interface Product {
  id: string;
  code: string;
  name: string;
  model: string;
  englishModel: string;
  category: 'lace' | 'sleepwear' | 'organic' | 'shapewear' | 'bridal';
  price: number;
  originalPrice?: number;
  badge?: string;
  rating: number;
  reviewCount: number;
  images: string[];
  colors: ProductColor[];
  sizes: string[];
  description: string;
  detailedDescription?: string;
  features?: string[];
  stockWarning?: string;
  cupOptions?: string[];
}

export interface CartItem {
  id: string; // product id + color + size
  product: Product;
  selectedColor: ProductColor;
  selectedSize: string;
  quantity: number;
}
