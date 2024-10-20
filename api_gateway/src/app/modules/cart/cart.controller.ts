import { Request, Response } from 'express';
import { CartService } from './cart.service';

const addProductToCart = async (req: Request, res: Response) => {
  try {
    const products = req.body;

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: 'Invalid products list' });
    }

    //@ts-ignore
    const sessionId = req.sessionID;

    // Loop through products and add them to the cart
    for (const product of products) {
      const { productId, quantity } = product;
      const parsedQuantity = parseInt(quantity, 10);

      if (!productId || isNaN(parsedQuantity) || parsedQuantity <= 0) {
        return res.status(400).json({ error: 'Invalid product ID or quantity' });
      }

      await CartService.addToCart(sessionId, productId, parsedQuantity);
    }

    // Retrieve the updated cart after adding all products
    const updatedCart = await CartService.getCart(sessionId);

    res.json({ message: 'Products added to cart', cart: updatedCart });
  } catch (err) {
    console.error('Error interacting with Redis:', err);
    //@ts-ignore
    return res.status(500).json({ error: err.message });
  }
};

// Get cart
const getCart = async (req: Request, res: Response) => {
  //@ts-ignore
  const sessionId = req.sessionID;

  try {
    const cart = await CartService.getCart(sessionId);
    return res.json({ cart });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Remove a product from the cart
const removeProductFromCart = async (req: Request, res: Response) => {
  //@ts-ignore
  const sessionId = req.sessionID;
  const { productId, quantityToRemove } = req.body;

  try {
    if (!productId || !quantityToRemove || quantityToRemove <= 0) {
      return res.status(400).json({ error: 'Invalid product ID or quantity to remove' });
    }

    const updatedCart = await CartService.removeFromCart(sessionId, productId, quantityToRemove);
    return res.json({ message: 'Product removed from cart', cart: updatedCart });
  } catch (error) {
    console.error(error);
    //@ts-ignore
    return res.status(500).json({ message: error.message || 'Server error' });
  }
};

export const CartController = {
  addProductToCart,
  getCart,
  removeProductFromCart
};
