import { defineStore } from 'pinia'
//Using pinia define the Cart store
//It works as a global variable  that I can import into any component
//Done this so that I don't have to emit or prop the value of cart from component to component
export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
    quantity: 1
  }),
  getters: {
    getItem: (state) => state.items,
    getQuantity: (state) => state.quantity
    
  },
  actions: {
    setQuantity(num) {
      this.quantity = num;
      this.saveToLocalStorage()
    },
    addItem(item) {
      this.items.push(item)
      this.saveToLocalStorage()
    },
    removeItem(id) {
      this.items = this.items.filter(i => i.id !== id)
      this.saveToLocalStorage()
    },
    clearAll() {
      this.items = [];
      this.saveToLocalStorage();
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