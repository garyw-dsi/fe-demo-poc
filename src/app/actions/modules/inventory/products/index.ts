"use server"

import { getDetailProduct, getAllProducts, getProductOptions } from "./read";
import { createProduct } from "./create";
import { deleteProduct } from "./delete";
import { editProduct, updateProductStock } from "./edit";

export {
  getDetailProduct,
  getAllProducts,
  getProductOptions,
  
  createProduct,
  deleteProduct,
  
  editProduct,
  updateProductStock
};