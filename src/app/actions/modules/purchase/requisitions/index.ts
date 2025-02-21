"use server"

import { getAllRequisitions, getRequitions } from "./read"
import { deleteRequisition } from "./delete"
import { createPurchaseRequisition } from "./create"
export { 
  getAllRequisitions,
  getRequitions,

  createPurchaseRequisition,
  deleteRequisition
}