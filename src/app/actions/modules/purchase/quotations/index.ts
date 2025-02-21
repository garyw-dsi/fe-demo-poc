"use server"

import { getAllQuotations, getQuotations } from "./read"
import { deleteQuotation } from "./delete"
import { createPurchaseQuotation } from "./create"

export { 
  getAllQuotations,
  getQuotations,

  createPurchaseQuotation,
  deleteQuotation
}