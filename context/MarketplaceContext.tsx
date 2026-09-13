"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  Product,
  UserLocation,
  Conversation,
  ChatMessage,
  FilterState,
  Seller,
} from "@/lib/types";
import {
  INITIAL_PRODUCTS,
  DEFAULT_LOCATIONS,
  CURRENT_USER,
  INITIAL_CONVERSATIONS,
  INITIAL_MESSAGES,
} from "@/lib/mock-data";

interface MarketplaceContextType {
  products: Product[];
  addProduct: (newProductData: {
    title: string;
    price: number;
    originalPrice?: number;
    category: Product["category"];
    condition: Product["condition"];
    description: string;
    photos: string[];
    district: string;
    city: string;
    meetUpPreference?: string;
  }) => Product;
  savedIds: string[];
  toggleSave: (productId: string) => void;
  isSaved: (productId: string) => boolean;
  currentLocation: UserLocation;
  setCurrentLocation: (location: UserLocation) => void;
  recentlyViewedIds: string[];
  addRecentlyViewed: (productId: string) => void;
  conversations: Conversation[];
  messages: Record<string, ChatMessage[]>;
  startOrGetConversation: (product: Product) => string;
  sendMessage: (
    conversationId: string,
    text: string,
    isOffer?: boolean,
    offerAmount?: number
  ) => void;
  respondToOffer: (
    conversationId: string,
    messageId: string,
    status: "accepted" | "declined"
  ) => void;
  filter: FilterState;
  setFilter: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilter: () => void;
  // Modals state
  isLocationModalOpen: boolean;
  setIsLocationModalOpen: (open: boolean) => void;
  offerModalData: { isOpen: boolean; product?: Product };
  openOfferModal: (product: Product) => void;
  closeOfferModal: () => void;
  reportModalData: { isOpen: boolean; itemTitle?: string; sellerName?: string };
  openReportModal: (itemTitle: string, sellerName?: string) => void;
  closeReportModal: () => void;
  unreadChatCount: number;
}

const defaultFilter: FilterState = {
  searchQuery: "",
  category: "All",
  condition: "All",
  minPrice: undefined,
  maxPrice: undefined,
  maxDistance: undefined,
  sortBy: "relevant",
};

const MarketplaceContext = createContext<MarketplaceContextType | undefined>(
  undefined
);

export function MarketplaceProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [savedIds, setSavedIds] = useState<string[]>(["prod-1", "prod-4", "prod-9"]);
  const [currentLocation, setCurrentLocation] = useState<UserLocation>(
    DEFAULT_LOCATIONS[0]
  );
  const [recentlyViewedIds, setRecentlyViewedIds] = useState<string[]>([
    "prod-1",
    "prod-2",
    "prod-5",
  ]);
  const [conversations, setConversations] =
    useState<Conversation[]>(INITIAL_CONVERSATIONS);
  const [messages, setMessages] =
    useState<Record<string, ChatMessage[]>>(INITIAL_MESSAGES);
  const [filter, setFilter] = useState<FilterState>(defaultFilter);

  // Modals
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [offerModalData, setOfferModalData] = useState<{
    isOpen: boolean;
    product?: Product;
  }>({ isOpen: false });
  const [reportModalData, setReportModalData] = useState<{
    isOpen: boolean;
    itemTitle?: string;
    sellerName?: string;
  }>({ isOpen: false });

  // Load from localStorage on client mount
  useEffect(() => {
    try {
      const storedSaved = localStorage.getItem("seconda_saved_ids");
      if (storedSaved) setSavedIds(JSON.parse(storedSaved));

      const storedUserProducts = localStorage.getItem("seconda_custom_products");
      if (storedUserProducts) {
        const custom = JSON.parse(storedUserProducts);
        setProducts([...custom, ...INITIAL_PRODUCTS]);
      }

      const storedConversations = localStorage.getItem("seconda_conversations");
      if (storedConversations) setConversations(JSON.parse(storedConversations));

      const storedMessages = localStorage.getItem("seconda_messages");
      if (storedMessages) setMessages(JSON.parse(storedMessages));
    } catch (e) {
      console.error("Failed loading from localStorage", e);
    }
  }, []);

  const toggleSave = (productId: string) => {
    setSavedIds((prev) => {
      const next = prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId];
      try {
        localStorage.setItem("seconda_saved_ids", JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const isSaved = (productId: string) => savedIds.includes(productId);

  const addRecentlyViewed = (productId: string) => {
    setRecentlyViewedIds((prev) => {
      const filtered = prev.filter((id) => id !== productId);
      return [productId, ...filtered].slice(0, 10);
    });
  };

  const addProduct = (newProductData: {
    title: string;
    price: number;
    originalPrice?: number;
    category: Product["category"];
    condition: Product["condition"];
    description: string;
    photos: string[];
    district: string;
    city: string;
    meetUpPreference?: string;
  }): Product => {
    const newProduct: Product = {
      id: `prod-custom-${Date.now()}`,
      ...newProductData,
      distanceKm: 0.8,
      seller: CURRENT_USER,
      postedAt: "Baru saja",
      isNewListing: true,
      status: "available",
    };

    setProducts((prev) => {
      const updated = [newProduct, ...prev];
      try {
        const customOnly = updated.filter((p) => p.id.startsWith("prod-custom-"));
        localStorage.setItem("seconda_custom_products", JSON.stringify(customOnly));
      } catch {}
      return updated;
    });

    return newProduct;
  };

  const startOrGetConversation = (product: Product): string => {
    const existing = conversations.find((c) => c.productId === product.id);
    if (existing) {
      return existing.id;
    }

    const newConvId = `conv-${Date.now()}`;
    const newConv: Conversation = {
      id: newConvId,
      productId: product.id,
      product: product,
      otherUser: product.seller,
      lastMessage: `Halo, saya tertarik dengan ${product.title}`,
      updatedAt: "Baru saja",
      unreadCount: 0,
    };

    const initialMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      conversationId: newConvId,
      senderId: CURRENT_USER.id,
      text: `Halo ${product.seller.name}, apakah barang "${product.title}" ini masih tersedia?`,
      timestamp: "Baru saja",
      isRead: true,
    };

    const updatedConvs = [newConv, ...conversations];
    const updatedMsgs = { ...messages, [newConvId]: [initialMsg] };

    setConversations(updatedConvs);
    setMessages(updatedMsgs);

    try {
      localStorage.setItem("seconda_conversations", JSON.stringify(updatedConvs));
      localStorage.setItem("seconda_messages", JSON.stringify(updatedMsgs));
    } catch {}

    return newConvId;
  };

  const sendMessage = (
    conversationId: string,
    text: string,
    isOffer?: boolean,
    offerAmount?: number
  ) => {
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, "0")}:${now
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      conversationId,
      senderId: CURRENT_USER.id,
      text,
      timestamp: timeStr,
      isOffer,
      offerAmount,
      offerStatus: isOffer ? "pending" : undefined,
      isRead: true,
    };

    const targetConv = conversations.find((c) => c.id === conversationId);

    const updatedMsgs = {
      ...messages,
      [conversationId]: [...(messages[conversationId] || []), newMsg],
    };

    const updatedConvs = conversations.map((c) =>
      c.id === conversationId
        ? {
            ...c,
            lastMessage: isOffer ? `Menawar Rp${offerAmount?.toLocaleString("id-ID")}` : text,
            updatedAt: "Baru saja",
          }
        : c
    );

    setMessages(updatedMsgs);
    setConversations(updatedConvs);

    // Auto-reply simulation after 2 seconds from seller
    if (targetConv && targetConv.otherUser.id !== CURRENT_USER.id) {
      setTimeout(() => {
        let replyText = "Halo kak! Masih ready ya kak, siap COD di area yang sudah disepakati.";
        if (isOffer) {
          replyText = `Halo! Penawaran Rp${offerAmount?.toLocaleString(
            "id-ID"
          )} boleh kak, deal ya. Mau janjian COD hari apa?`;
        }

        const autoMsg: ChatMessage = {
          id: `msg-auto-${Date.now()}`,
          conversationId,
          senderId: targetConv.otherUser.id,
          text: replyText,
          timestamp: timeStr,
          isRead: false,
        };

        setMessages((prev) => {
          const currentList = prev[conversationId] || [];
          // If was offer, update the offer message status to accepted
          const modified = currentList.map((m) =>
            m.id === newMsg.id ? { ...m, offerStatus: "accepted" as const } : m
          );
          const nextState = {
            ...prev,
            [conversationId]: [...modified, autoMsg],
          };
          try {
            localStorage.setItem("seconda_messages", JSON.stringify(nextState));
          } catch {}
          return nextState;
        });

        setConversations((prev) => {
          const next = prev.map((c) =>
            c.id === conversationId
              ? {
                  ...c,
                  lastMessage: replyText,
                  updatedAt: "Baru saja",
                  unreadCount: c.unreadCount + 1,
                }
              : c
          );
          try {
            localStorage.setItem("seconda_conversations", JSON.stringify(next));
          } catch {}
          return next;
        });
      }, 1500);
    }

    try {
      localStorage.setItem("seconda_messages", JSON.stringify(updatedMsgs));
      localStorage.setItem("seconda_conversations", JSON.stringify(updatedConvs));
    } catch {}
  };

  const respondToOffer = (
    conversationId: string,
    messageId: string,
    status: "accepted" | "declined"
  ) => {
    setMessages((prev) => {
      const list = prev[conversationId] || [];
      const updated = list.map((m) =>
        m.id === messageId ? { ...m, offerStatus: status } : m
      );
      return { ...prev, [conversationId]: updated };
    });
  };

  const resetFilter = () => {
    setFilter(defaultFilter);
  };

  const openOfferModal = (product: Product) => {
    setOfferModalData({ isOpen: true, product });
  };

  const closeOfferModal = () => {
    setOfferModalData({ isOpen: false });
  };

  const openReportModal = (itemTitle: string, sellerName?: string) => {
    setReportModalData({ isOpen: true, itemTitle, sellerName });
  };

  const closeReportModal = () => {
    setReportModalData({ isOpen: false });
  };

  const unreadChatCount = conversations.reduce(
    (acc, curr) => acc + (curr.unreadCount || 0),
    0
  );

  return (
    <MarketplaceContext.Provider
      value={{
        products,
        addProduct,
        savedIds,
        toggleSave,
        isSaved,
        currentLocation,
        setCurrentLocation,
        recentlyViewedIds,
        addRecentlyViewed,
        conversations,
        messages,
        startOrGetConversation,
        sendMessage,
        respondToOffer,
        filter,
        setFilter,
        resetFilter,
        isLocationModalOpen,
        setIsLocationModalOpen,
        offerModalData,
        openOfferModal,
        closeOfferModal,
        reportModalData,
        openReportModal,
        closeReportModal,
        unreadChatCount,
      }}
    >
      {children}
    </MarketplaceContext.Provider>
  );
}

export function useMarketplace() {
  const context = useContext(MarketplaceContext);
  if (!context) {
    throw new Error("useMarketplace must be used within a MarketplaceProvider");
  }
  return context;
}
