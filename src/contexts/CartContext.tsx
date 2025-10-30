import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { createCheckout, addToCheckout, updateCheckoutLineItems, removeFromCheckout } from '@/lib/shopify';

interface CartItem {
  id: string;
  variantId: string;
  productId: string;
  title: string;
  variant: {
    id: string;
    title: string;
    price: {
      amount: string;
      currencyCode: string;
    };
    image?: {
      url: string;
      altText: string;
    };
  };
  quantity: number;
}

interface CartState {
  items: CartItem[];
  checkoutId: string | null;
  checkoutUrl: string | null;
  totalPrice: string;
  totalQuantity: number;
  isLoading: boolean;
  error: string | null;
}

type CartAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_CHECKOUT'; payload: { checkoutId: string; checkoutUrl: string; items: CartItem[]; totalPrice: string } }
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'UPDATE_ITEM'; payload: { id: string; quantity: number } }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'CLEAR_CART' };

const initialState: CartState = {
  items: [],
  checkoutId: null,
  checkoutUrl: null,
  totalPrice: '0.00',
  totalQuantity: 0,
  isLoading: false,
  error: null,
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    
    case 'SET_CHECKOUT':
      return {
        ...state,
        checkoutId: action.payload.checkoutId,
        checkoutUrl: action.payload.checkoutUrl,
        items: action.payload.items,
        totalPrice: action.payload.totalPrice,
        totalQuantity: action.payload.items.reduce((sum, item) => sum + item.quantity, 0),
        isLoading: false,
        error: null,
      };
    
    case 'ADD_ITEM':
      const existingItemIndex = state.items.findIndex(item => item.variantId === action.payload.variantId);
      let newItems;
      
      if (existingItemIndex >= 0) {
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        newItems = [...state.items, action.payload];
      }
      
      return {
        ...state,
        items: newItems,
        totalQuantity: newItems.reduce((sum, item) => sum + item.quantity, 0),
      };
    
    case 'UPDATE_ITEM':
      const updatedItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      
      return {
        ...state,
        items: updatedItems,
        totalQuantity: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
      };
    
    case 'REMOVE_ITEM':
      const filteredItems = state.items.filter(item => item.id !== action.payload);
      
      return {
        ...state,
        items: filteredItems,
        totalQuantity: filteredItems.reduce((sum, item) => sum + item.quantity, 0),
      };
    
    case 'CLEAR_CART':
      return initialState;
    
    default:
      return state;
  }
}

interface CartContextType extends CartState {
  addToCart: (product: any, variant: any, quantity?: number) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  clearCart: () => void;
  goToCheckout: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCheckoutId = localStorage.getItem('shopify_checkout_id');
    if (savedCheckoutId) {
      // In a real implementation, you'd fetch the checkout from Shopify
      // For now, we'll just set the checkoutId
      dispatch({
        type: 'SET_CHECKOUT',
        payload: {
          checkoutId: savedCheckoutId,
          checkoutUrl: '',
          items: [],
          totalPrice: '0.00'
        }
      });
    }
  }, []);

  const addToCart = async (product: any, variant: any, quantity = 1) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      const cartItem: CartItem = {
        id: `${product.id}-${variant.id}`,
        variantId: variant.id,
        productId: product.id,
        title: product.title,
        variant: {
          id: variant.id,
          title: variant.title,
          price: variant.price,
          image: product.images?.edges?.[0]?.node,
        },
        quantity,
      };

      if (state.checkoutId) {
        // Add to existing checkout
        const checkout = await addToCheckout(state.checkoutId, [{ variantId: variant.id, quantity }]);
        if (checkout) {
          const items = checkout.lineItems.edges.map((edge: any) => ({
            id: edge.node.id,
            variantId: edge.node.variant.id,
            productId: edge.node.variant.id, // This would need to be mapped properly
            title: edge.node.title,
            variant: edge.node.variant,
            quantity: edge.node.quantity,
          }));
          
          dispatch({
            type: 'SET_CHECKOUT',
            payload: {
              checkoutId: checkout.id,
              checkoutUrl: checkout.webUrl,
              items,
              totalPrice: checkout.totalPrice.amount,
            }
          });
        }
      } else {
        // Create new checkout
        const checkout = await createCheckout([{ variantId: variant.id, quantity }]);
        if (checkout) {
          localStorage.setItem('shopify_checkout_id', checkout.id);
          
          const items = checkout.lineItems.edges.map((edge: any) => ({
            id: edge.node.id,
            variantId: edge.node.variant.id,
            productId: edge.node.variant.id,
            title: edge.node.title,
            variant: edge.node.variant,
            quantity: edge.node.quantity,
          }));
          
          dispatch({
            type: 'SET_CHECKOUT',
            payload: {
              checkoutId: checkout.id,
              checkoutUrl: checkout.webUrl,
              items,
              totalPrice: checkout.totalPrice.amount,
            }
          });
        }
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to add item to cart' });
      console.error('Error adding to cart:', error);
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (!state.checkoutId) return;
    
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      const checkout = await updateCheckoutLineItems(state.checkoutId, [{ id: itemId, quantity }]);
      if (checkout) {
        const items = checkout.lineItems.edges.map((edge: any) => ({
          id: edge.node.id,
          variantId: edge.node.variant.id,
          productId: edge.node.variant.id,
          title: edge.node.title,
          variant: edge.node.variant,
          quantity: edge.node.quantity,
        }));
        
        dispatch({
          type: 'SET_CHECKOUT',
          payload: {
            checkoutId: checkout.id,
            checkoutUrl: checkout.webUrl,
            items,
            totalPrice: checkout.totalPrice.amount,
          }
        });
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to update item quantity' });
      console.error('Error updating quantity:', error);
    }
  };

  const removeFromCart = async (itemId: string) => {
    if (!state.checkoutId) return;
    
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      const checkout = await removeFromCheckout(state.checkoutId, [itemId]);
      if (checkout) {
        const items = checkout.lineItems.edges.map((edge: any) => ({
          id: edge.node.id,
          variantId: edge.node.variant.id,
          productId: edge.node.variant.id,
          title: edge.node.title,
          variant: edge.node.variant,
          quantity: edge.node.quantity,
        }));
        
        dispatch({
          type: 'SET_CHECKOUT',
          payload: {
            checkoutId: checkout.id,
            checkoutUrl: checkout.webUrl,
            items,
            totalPrice: checkout.totalPrice.amount,
          }
        });
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to remove item from cart' });
      console.error('Error removing from cart:', error);
    }
  };

  const clearCart = () => {
    localStorage.removeItem('shopify_checkout_id');
    dispatch({ type: 'CLEAR_CART' });
  };

  const goToCheckout = () => {
    if (state.checkoutUrl) {
      window.open(state.checkoutUrl, '_blank');
    }
  };

  const value: CartContextType = {
    ...state,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    goToCheckout,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}