import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useAppStore = create(
  persist(
    (set, get) => ({
      isDynamicAuth: false,
      isWorldCoinAuth: false,
      worldCoinData: {},
      setDynamicAuth: () => set({ isDynamicAuth: true }),
      setWorldCoinAuth: (value) => set({ isWorldCoinAuth: true, worldCoinData: value }),
      handleLogout: () => set({ isDynamicAuth: false, isWorldCoinAuth: false, worldCoinData: {} }),
    }),
    {
      name: 'hodlhabits-storage', 
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)