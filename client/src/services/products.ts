import axios from "axios";
import { NewProduct } from "../types";
import { z } from "zod";

const productSchema = z.object({
  _id: z.string(),
  title: z.string(),
  price: z.number(),
  quantity: z.number(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  _v: z.number().optional(),
});

const cartItemSchema = z.object({
  _id: z.string(),
  title: z.string(),
  price: z.number(),
  quantity: z.number(),
  productId: z.string(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  _v: z.number().optional(),
});

const getProductsResponseSchema = z.array(productSchema);
const getCartItemResponseSchema = z.array(cartItemSchema);
const addToCartResponseSchema = z.object({ product: productSchema, item: cartItemSchema });

export const getProducts = async () => {
  const { data } = await axios.get('/api/products');
  return getProductsResponseSchema.parse(data);
}

export const addProduct = async (newProduct: NewProduct) => {
  const { data } = await axios.post('/api/products', { ...newProduct, });
  return data;
}

export const editProduct = async (_id: string, updatedProduct: NewProduct) => {
  const { data } = await axios.put(`/api/products/${_id}`, { ...updatedProduct, });
  return data;
}

export const deleteProduct = async (productId: string) => {
  const { data } = await axios.delete(`/api/products/${productId}`);
  return data;
}

export const getCartItems = async () => {
  const { data } = await axios.get('/api/cart');
  return getCartItemResponseSchema.parse(data);
}

export const checkout = async () => {
  const { data } = await axios.post('/api/checkout');
  return data;
}

export const addCartItem = async (productId: string) => {
  const { data } = await axios.post('/api/add-to-cart', { productId });
  return addToCartResponseSchema.parse(data);
}