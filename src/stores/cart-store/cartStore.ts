import { create, SetState } from "zustand"
import { devtools } from "zustand/middleware"
import { CartStore } from "./types/cartStore.types"

const store = (set: SetState<CartStore>): CartStore => ({
  cartItems: [],
  totalAmount: 0,

  addItem: (item, quantity = 1) => {
    set((state) => {
      const newState = { ...state }
      const existingItemIndex = state.cartItems.findIndex((cartItem) => cartItem.id === item.id)
      if (existingItemIndex > -1) {
        newState.cartItems[existingItemIndex].quantity += quantity
      } else {
        newState.cartItems.push({ ...item, quantity })
      }
      newState.totalAmount += item.price * quantity

      return newState
    })
  },

  removeItem: (id: string) => {
    set((state) => {
      const newState = { ...state }
      const existingItemIndex = state.cartItems.findIndex((cartItem) => cartItem.id === id)
      if (existingItemIndex > -1) {
        newState.totalAmount -= state.cartItems[existingItemIndex].price * state.cartItems[existingItemIndex].quantity
        newState.cartItems.splice(existingItemIndex, 1)
      }
      return newState
    })
  },

  updateQuantity: (id: string, quantity: number) => {
    set((state) => {
      const newState = { ...state }
      const existingItemIndex = state.cartItems.findIndex((cartItem) => cartItem.id === id)
      if (existingItemIndex > -1 && quantity >= 0) {
        newState.totalAmount +=
          (quantity - newState.cartItems[existingItemIndex].quantity) * newState.cartItems[existingItemIndex].price
        newState.cartItems[existingItemIndex].quantity = quantity
      }
      return newState
    })
  },

  clearCart: () => {
    set(() => {
      return {
        cartItems: [],
        totalAmount: 0,
      }
    })
  },
})

export const useCartStore = create(process.env.NODE_ENV !== "production" ? devtools(store) : store)
