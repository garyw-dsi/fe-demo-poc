"use server"

import { createCustomer, createContactCustomer } from "./create";
import { getCustomer, getAllCustomers, getCustomerOptions } from "./read";
import { deleteCustomer } from "./delete";

export {
  getCustomer,
  getAllCustomers,
  getCustomerOptions,

  createCustomer,
  
  deleteCustomer,
  
  createContactCustomer
};