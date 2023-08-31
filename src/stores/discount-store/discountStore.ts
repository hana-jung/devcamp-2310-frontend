import { create, SetState } from "zustand"
import { devtools } from "zustand/middleware"
import { DiscountStore, IssuedCoupon } from "./types/discountStore.types"

const store = (set: SetState<DiscountStore>): DiscountStore => ({
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

  applyPoints: (points: number) => {
    set((state) => {
      return {
        ...state,
        appliedPoints: Math.min(points, state.availablePoints),
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

export const useDiscountStore = create(process.env.NODE_ENV !== "production" ? devtools(store) : store)
