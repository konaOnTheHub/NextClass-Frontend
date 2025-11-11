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
      this.quantity = 1;
      this.saveToLocalStorage();
    },
    saveToLocalStorage() {
      const data = {
        items: this.items,
        quantity: this.quantity
      };
      localStorage.setItem('cart', JSON.stringify(data));
    },
    loadFromLocalStorage() {
      const data = localStorage.getItem('cart');
      if (data) {
        const parsed = JSON.parse(data);
        this.items = parsed.items || [];
        this.quantity = parsed.quantity ?? 1;
      }
    }
  }
})