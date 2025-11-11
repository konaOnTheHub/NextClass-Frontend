<script setup>
import { useCartStore } from '@/stores/cart'
import { computed, ref } from 'vue';
import InfoBubble from './InfoBubble.vue';
import { API_CONFIG } from '@/apiConfig';


//Import pinia cart store
const cart = useCartStore()
//Reactively calculate the total price of lessons in cart
const total = computed(() => {
    return cart.getItem.reduce((sum, item) => (sum + item.price) * quantity.value, 0);
})

//Hide or show checkout modal
const showCheckoutModal = ref(false);

//Hide or show success message
const showInfoBubble = ref(false);

//These a reactively modelled to the forms
const formValues = ref({
    name: "",
    phone: ""
});
//Regex for validating phone number (must be 11 digits long and must start with 0)
const phoneRegex = /^0\d{4}\s?\d{6}$/;

//Reactively calculate validity of name input (must be longer than 3 chars)
const nameValid = computed(() => formValues.value.name.length >= 3);
//Reactively calculate validity of phone number
const phoneValid = computed(() => phoneRegex.test(formValues.value.phone));

//Remove item from cart
function removeLesson(lessonId) {
    cart.removeItem(lessonId);
    //If cart is emptied with remove reset cart quantity
    if (cart.getItem.length == 0) {
        cart.setQuantity(1);
    }
}


//Handle checkout function
function handleCheckout() {
    if (nameValid && phoneValid) {
        //PUT update spaces in database
        (async () => {
            for (let lesson of cart.getItem) {
                try {
                    const putRes = await fetch(`${API_CONFIG.API_URL}/lesson/${lesson.id}/spaces`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({"value": lesson.spaces - cart.getQuantity})
                    })
                    if (!putRes.ok) {
                        showCheckoutModal.value = false;
                        fireInfoBubble("Error occured when placing order");
                        return
                    }
                    
                } catch (error) {  
                    fireInfoBubble("Error occured when placing order:", err)
                    return
                }
            }
            try {
                const res = await fetch(`${API_CONFIG.API_URL}/order`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ "name": formValues.value.name, "phone": formValues.value.phone, "lessonIDs": cart.getItem.map(lesson => lesson.id), "quantity": cart.getQuantity })
                })
                if (res.ok) {
                    //Clear cart
                    cart.clearAll();
                    //Reset form values
                    formValues.value = {
                        name: "",
                        phone: ""
                    }
                    showCheckoutModal.value = false;
                    //Show info bubble letting the user know that their order has been processed
                    fireInfoBubble("Your order has been placed successfully!");
                } else {
                    fireInfoBubble("Error occured when placing order")
                }
            } catch (err) {
                fireInfoBubble("Error occured when placing order:", err)
            }
        })();
    }
}
//POST request for order
const infoBubbleMsg = ref("");
//Show info bubble with passed in message
function fireInfoBubble(msg) {
    showInfoBubble.value = true;
    infoBubbleMsg.value = msg;
    setTimeout(() => {
        showInfoBubble.value = false;
    }, 3000)
}

const quantity = ref(cart.getQuantity);
// Computed property for validity
const isQuantityValid = computed(() => {
    // Check if quantity is empty or invalid
    if (!quantity.value || quantity.value < 1) return false;

    // Check if quantity exceeds any lesson's availability
    if (cart.getItem.some(lesson => lesson.spaces < quantity.value)) {
        fireInfoBubble("The quantity would exceed one or more lesson's availabilty")
        return false;
    }
    return true;
});
//Called when increment button is pressed for quantity
function incrementQuantity() {
    quantity.value++;
    if (!isQuantityValid.value) {
        quantity.value--;
    }
    cart.setQuantity(quantity.value);
}
//Called when decrement button is pressed for quanaity
function decrementQuantity() {
    if (quantity.value > 1) {
        quantity.value--;
        cart.setQuantity(quantity.value);
    }
}
//Called when the user manually inserts a quantity
function insertQuantity() {
    if (!isQuantityValid.value) {
        quantity.value = 1;
    }
    cart.setQuantity(quantity.value);
}

</script>

<template>
    <div class="container mx-auto mt-20 p-6 z-0">
        <div class="text-center">
            <h1 class=" font-extrabold text-3xl mb-2 text-indigo-500">Your Cart</h1>
        </div>
        <div class="max-w-2xl mx-auto border-2 border-indigo-500 rounded-2xl shadow-md overflow-hidden">
            <div class="grid grid-cols-1 gap-1">
                <div v-for="lesson in cart.getItem" :key="lesson.id" :lesson="lesson" class="h-32 bg-gray-800 relative">
                    <h1 class="pl-5 pt-3 font-bold text-2xl text-white flex justify-between">
                        {{ lesson.subject }}
                    </h1>
                    <h3 class="text-gray-300 pl-5">{{ lesson.location }}</h3>
                    <h3 class="text-white absolute bottom-0 pb-3 right-0 pr-5 font-bold text-lg">£{{ lesson.price }}
                    </h3>
                    <button @click="removeLesson(lesson.id)"
                        class="text-blue-500 hover:underline cursor-pointer text-sm absolute bottom-0 left-0 pb-3 pl-5">Remove</button>
                </div>
            </div>
            <!--Only show when cart is empty-->
            <div v-if="cart.getItem.length === 0" class="h-32 flex items-center justify-center">
                <h3 class="text-gray-300 text-lg">Your cart is empty</h3>
            </div>

        </div>
        <!--Only show total and checkout if there is something in the cart-->
        <div v-if="cart.getItem.length > 0" class="max-w-2xl mx-auto relative mt-3">
            <div class="flex justify-end">
                <button @click="showCheckoutModal = !showCheckoutModal"
                    class="flex flex-row justify-between px-4 py-1 text-white border-2 border-indigo-500 hover:bg-indigo-500 transition cursor-pointer rounded-lg">
                    <span>Checkout</span>
                    <img class="h-6 w-6 ml-2" src="../assets/shoppingCart.svg">
                </button>
                <div
                    class="flex flex-row justify-between text-white border-2 border-indigo-500 rounded-lg ml-3 overflow-hidden">
                    <button
                        class="w-8 px-2 bg-gray-950 border-r-gray-600 border-gray-950 border-2 hover:bg-gray-600 hover:border-gray-600 transition"
                        @click="decrementQuantity()">-</button>
                    <input
                        class="w-10 text-center focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        type="number" v-model.number="quantity" @blur="insertQuantity()">
                    <button
                        class="w-8 px-2 bg-gray-950 border-l-gray-600 border-gray-950 border-2 hover:bg-gray-600 hover:border-gray-600 transition"
                        @click="incrementQuantity()">+</button>
                </div>
                <span class="text-white font-bold text-lg pr-5 pl-3 py-1">Total: £{{ total }}</span>
            </div>
        </div>
        <!--Checkout modal-->
        <div v-if="showCheckoutModal" class="fixed inset-0 bg-black/80 flex items-center justify-center z-1">
            <div class="relative bg-[#101828] p-8 w-96 rounded-2xl border-2 border-indigo-500">
                <div class="flex justify-center">
                    <button @click="showCheckoutModal = !showCheckoutModal">
                        <img src="../assets/xIcon.svg" alt="Close window"
                            class="w-4 h-4 absolute right-0 top-0 mt-4 mr-4 cursor-pointer">
                    </button>
                    <h2 class="text-2xl font-bold text-indigo-500 mb-4 text-center">Checkout</h2>
                </div>
                <form @submit.prevent class="space-y-4">
                    <!--Input for name-->
                    <div>
                        <label class=" font-semibold text-white">Name</label>
                        <input v-model="formValues.name" type="text" placeholder="Enter your name"
                            class="w-full border-2 text-gray-300 border-gray-600 rounded-lg p-2 focus:outline-none focus:border-indigo-500">
                        <!--Show only if name is invalid-->
                        <h3 v-if="!nameValid && formValues.name.length > 0" class="text-gray-300 text-xs pt-1">The name
                            must be longer than 3 letters
                        </h3>
                    </div>
                    <!--Input for phone number-->
                    <div>
                        <label class=" font-semibold text-white">Phone Number</label>
                        <input v-model="formValues.phone" type="tel" placeholder="Enter your phone number"
                            class="w-full border-2 text-gray-300 border-gray-600 rounded-lg p-2 focus:outline-none focus:border-indigo-500">
                        <!--Show only if phone is invalid-->
                        <h3 v-if="!phoneValid && formValues.phone.length > 0" class="text-gray-300 text-xs pt-1">The
                            phone number be 11
                            digits and start with 0</h3>
                    </div>
                    <div class="flex justify-end">
                        <!--Disabled until both inputs are valid-->
                        <!--On click call handle checkout function-->
                        <button :disabled="!(nameValid && phoneValid)" @click="handleCheckout()"
                            class="flex flex-row justify-between px-4 py-1 text-white border-2 border-indigo-500 hover:bg-indigo-500 transition cursor-pointer rounded-lg disabled:cursor-not-allowed disabled:border-gray-950 disabled:hover:bg-gray-800">
                            <span>Checkout</span>
                            <img class="h-6 w-6 ml-2" src="../assets/shoppingCart.svg">
                        </button>


                    </div>
                </form>
            </div>
        </div>
        <InfoBubble :info-message="infoBubbleMsg" :show="showInfoBubble" />
    </div>
</template>