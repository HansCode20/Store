import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'sonner';  // Ensure the import path is correct

const initialState = {
  cartitems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const itemIndex = state.cartitems.findIndex((item) => item.id === action.payload.id);
      if (itemIndex >= 0) {
        state.cartitems[itemIndex] = {
          ...state.cartitems[itemIndex],
          cartQuantity: state.cartitems[itemIndex].cartQuantity + 1,
        };
        toast.info(`Increased ${state.cartitems[itemIndex].title} quantity`, {
          position: 'top-center',
          autoClose: 1000,
        });
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartitems.push(tempProduct);
        toast.success(`${action.payload.title} added to cart`, {
          position: 'top-center',
          autoClose: 1000,
        });
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartitems));

      state.cartTotalQuantity = state.cartitems.reduce(
        (total, item) => total + item.cartQuantity,
        0
      );
    },
    // Remove from cart
    removeFromCart(state, action) {
      const nextCartItems = state.cartitems.filter(
        (cartItem) => cartItem.id !== action.payload.id
      );

      state.cartitems = nextCartItems;
      localStorage.setItem('cartItems', JSON.stringify(state.cartitems));
      toast.success(`${action.payload.title} removed from cart`, {
        position: 'top-center',
        autoClose: 1000,
      });
    },
    // Decrease cart
    decreaseCart(state, action) {
      const itemIndex = state.cartitems.findIndex(
        (cartItem) => cartItem.id === action.payload.id
      );

      if (state.cartitems[itemIndex].cartQuantity > 1) {
        state.cartitems[itemIndex].cartQuantity -= 1;
        toast.info(`Decreased ${state.cartitems[itemIndex].title} quantity`, {
          position: 'top-center',
          autoClose: 1000,
        });
      } else if (state.cartitems[itemIndex].cartQuantity === 1) {
        const nextCartItems = state.cartitems.filter(
          (cartItem) => cartItem.id !== action.payload.id
        );
        state.cartitems = nextCartItems;
        localStorage.setItem('cartItems', JSON.stringify(state.cartitems));
        toast.success(`${action.payload.title} removed from cart`, {
          position: 'top-center',
          autoClose: 1000,
        });
      }
    },
    // Increase Cart
    increaseCart(state, action) {
      const itemIndex = state.cartitems.findIndex(
        (cartItem) => cartItem.id === action.payload.id
      );

      if (state.cartitems[itemIndex].cartQuantity >= 1) {
        state.cartitems[itemIndex].cartQuantity += 1;
        toast.info(`Increased ${state.cartitems[itemIndex].title} quantity`, {
          position: 'top-center',
          autoClose: 1000,
        });
      } else if (state.cartitems[itemIndex].cartQuantity === 1) {
        const nextCartItems = state.cartitems.filter(
          (cartItem) => cartItem.id !== action.payload.id
        );
        state.cartitems = nextCartItems;
        localStorage.setItem('cartItems', JSON.stringify(state.cartitems));
        toast.success(`${action.payload.title} removed from cart`, {
          position: 'top-center',
          autoClose: 1000,
        });
      }
    },
    clearCart(state, action) {
      state.cartitems = [];
      localStorage.setItem('cartItems', JSON.stringify(state.cartitems));
      toast.success(`Cart cleared`, {
        position: 'top-center',
        autoClose: 1000,
      });
    },

    // cartTotalQuantity(state, action) {
    //   const quantity = state.cartitems.reduce((acc, item) => acc + item.cartQuantity, 0);
    //   state.cartTotalQuantity = quantity;
    // },

    // cartTotalAmount(state, action) {
    //   const amount = state.cartitems.reduce((acc, item) => acc + item.price * item.cartQuantity, 0);
    //   state.cartTotalAmount = amount;
    // },
    

  },
});

export const { addToCart, clearCart, removeFromCart, decreaseCart, increaseCart } = cartSlice.actions;
export default cartSlice.reducer;
