import { create } from "zustand"
import type { StateCreator } from "zustand"
import { devtools } from "zustand/middleware"
import type { DiscountStore, IssuedCoupon } from "./types/discountStore.types"

const store: StateCreator<DiscountStore> = (set) => ({
  issuedCoupons: [], // fetched from the server
  appliedCoupon: undefined,
  availablePoints: 0, // fetched from the server
  appliedPoints: 0,
  totalDiscountAmount: 0,

  applyCoupon: (id: string) => {
    set((state) => {
      const coupon = state.issuedCoupons.find((c) => c.id === id)
      const now = new Date()

      if (!coupon || now > coupon.validUntil || now < coupon.validFrom) {
        return state
      }

      return {
        ...state,
        appliedCoupon: coupon,
      }
    })
  },

  removeCoupon: () => {
    set((state) => ({
      ...state,
      appliedCoupon: undefined,
    }))
  },

  applyPoints: (points: number, totalPrice: number) => {
    set((state) => {
      return {
        ...state,
        appliedPoints: Math.min(points, state.availablePoints, totalPrice),
      }
    })
  },

  removePoints: () => {
    set((state) => ({
      ...state,
      appliedPoints: 0,
    }))
  },

  calculateDiscount: (totalPrice: number) => {
    set((state) => {
      let discount = 0

      // 1. 포인트 선적용
      if (state.appliedPoints > 0) {
        discount += state.appliedPoints
      }

      // 2. 쿠폰 적용
      if (state.appliedCoupon) {
        const upperBound = totalPrice - discount
        discount +=
          state.appliedCoupon.discountType === "fixed"
            ? Math.min(state.appliedCoupon.discountAmount, upperBound)
            : (upperBound * state.appliedCoupon.discountAmount) / 100
      }

      return { ...state, totalDiscountAmount: discount }
    })
  },

  setIssuedCoupons: (coupons: IssuedCoupon[]) => {
    set((state) => ({
      ...state,
      issuedCoupons: coupons,
    }))
  },

  setAvailablePoints: (points: number) => {
    set((state) => ({
      ...state,
      availablePoints: points,
    }))
  },
})

export const useDiscountStore =
  process.env.NODE_ENV !== "production" ? create<DiscountStore>()(devtools(store)) : create<DiscountStore>()(store)
