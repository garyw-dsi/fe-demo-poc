"use server"

import { getAllVendor, getVendor } from "./read"
import { createVendor } from "./create"
import { deleteVendor } from "./delete"

export {
  getAllVendor,
  getVendor,

  createVendor,
  deleteVendor
}