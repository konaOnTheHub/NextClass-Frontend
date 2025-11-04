import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: []
  }),
  getters: {
    getItem: (state) => state.items
    
  },
  actions: {
    addItem(item) {
      this.items.push(item)
      this.saveToLocalStorage()
    },
    removeItem(id) {
      this.items = this.items.filter(i => i.id !== id)
      this.saveToLocalStorage()
    },
    saveToLocalStorage() {
      localStorage.setItem('cart', JSON.stringify(this.items))
    },
    loadFromLocalStorage() {
      const data = localStorage.getItem('cart')
      if (data) this.items = JSON.parse(data)
    }
  }
})