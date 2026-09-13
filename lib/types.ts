export type ItemCategory =
  | "Electronics"
  | "Fashion"
  | "Furniture"
  | "Books"
  | "Sports"
  | "Automotive"
  | "Home & Living"
  | "Hobbies"
  | "Others";

export type ItemCondition = "Like New" | "Good" | "Fair";

export interface Seller {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  reviewsCount: number;
  listingsCount: number;
  soldCount: number;
  responseRate: string; // e.g. "98%"
  responseTime: string; // e.g. "< 15 mins"
  memberSince: string;  // e.g. "Maret 2022"
  location: string;     // e.g. "Jakarta Selatan"
  verified: boolean;
  phone?: string;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice?: number; // for showing good deals or price drop comparison
  category: ItemCategory;
  condition: ItemCondition;
  description: string;
  photos: string[];
  district: string;        // e.g. "Kebayoran Baru"
  city: string;            // e.g. "Jakarta Selatan"
  distanceKm: number;      // relative to user's active simulated location
  seller: Seller;
  postedAt: string;        // e.g. "2 jam lalu", "1 hari lalu"
  isGoodDeal?: boolean;
  isPriceDrop?: boolean;
  isNewListing?: boolean;
  isNearby?: boolean;
  meetUpPreference?: string; // e.g. "Area MRT Blok M / Citos"
  status: "available" | "reserved" | "sold";
}

export interface Review {
  id: string;
  sellerId: string;
  reviewerName: string;
  reviewerAvatar: string;
  rating: number;
  comment: string;
  date: string;
  itemTitle: string;
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  text: string;
  timestamp: string;
  isOffer?: boolean;
  offerAmount?: number;
  offerStatus?: "pending" | "accepted" | "declined";
  isRead: boolean;
}

export interface Conversation {
  id: string;
  productId: string;
  product: Product;
  otherUser: Seller;
  lastMessage: string;
  updatedAt: string;
  unreadCount: number;
}

export interface UserLocation {
  id: string;
  name: string;
  district: string;
  city: string;
  lat: number;
  lng: number;
}

export type SortOption =
  | "relevant"
  | "newest"
  | "price_asc"
  | "price_desc"
  | "distance";

export interface FilterState {
  searchQuery: string;
  category: ItemCategory | "All";
  minPrice?: number;
  maxPrice?: number;
  condition?: ItemCondition | "All";
  maxDistance?: number; // in km: 1, 5, 10, or undefined (Anywhere)
  sortBy: SortOption;
}

export interface CategoryItem {
  name: ItemCategory;
  slug: string;
  iconName: string;
  color: string;
  itemCount: number;
}
