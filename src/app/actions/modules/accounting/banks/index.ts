"use server"

import { getAllBanks, getBank } from "./read"
import { deleteBank } from "./delete"
import { createBank } from "./create"

export { 
  getAllBanks,
  getBank,
  createBank,  
  deleteBank
}