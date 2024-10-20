import config from '../../../config';
import { RedisClient } from '../../../shared/redis';

const CART_EXPIRATION_TIME: any = config.cart_expires;

// Fetch the cart for the session
const getCart = async (sessionId: string) => {
  const cartData = await RedisClient.get(sessionId);
  return cartData ? JSON.parse(cartData) : [];
};

const addToCart = async (sessionId: string, productId: string, quantity: number) => {
  // Validate input
  if (!productId || !quantity || quantity <= 0) {
    throw new Error('Invalid product ID or quantity');
  }

  try {
    // Retrieve the entire cart as a string from Redis
    const cart = await RedisClient.get(sessionId);
    let cartItems: Record<string, { productId: string; quantity: number }> = cart
      ? JSON.parse(cart)
      : {};

    // Remove entries with invalid keys
    for (const key in cartItems) {
      if (key === 'undefined' || cartItems[key] == null) {
        delete cartItems[key]; // Remove invalid entries
      }
    }

    if (!cartItems[productId]) {
      cartItems[productId] = { productId, quantity: 0 };
    }

    // Add/update the product in the cart
    cartItems[productId].quantity += quantity;

    console.log('seasonId, cartItems', sessionId, cartItems);

    await RedisClient.set(sessionId, JSON.stringify(cartItems));

    await RedisClient.expire(sessionId, CART_EXPIRATION_TIME);

    return cartItems;
  } catch (error) {
    console.error('Error while adding to cart:', error);
    throw new Error('Failed to add product to cart');
  }
};

// Remove product from the cart
const removeFromCart = async (sessionId: string, productId: string, quantityToRemove: number) => {
  // Retrieve the cart from Redis
  const cartData = await RedisClient.get(sessionId);
  if (!cartData) {
    return {};
  }

  const cart = JSON.parse(cartData);

  // Check if the product exists in the cart
  if (!cart[productId]) {
    throw new Error('Product not found in cart');
  }

  const currentQuantity = cart[productId].quantity;

  if (currentQuantity < quantityToRemove) {
    throw new Error('Quantity to remove exceeds current quantity in cart');
  }

  // Update the quantity
  cart[productId].quantity -= quantityToRemove;

  // Remove the product from the cart if the quantity is now zero
  if (cart[productId].quantity === 0) {
    delete cart[productId];
  }

  await RedisClient.set(sessionId, JSON.stringify(cart));
  await RedisClient.expire(sessionId, CART_EXPIRATION_TIME);

  return cart;
};

export const CartService = {
  getCart,
  addToCart,
  removeFromCart
};
