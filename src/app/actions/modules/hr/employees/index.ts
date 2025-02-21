"use server"

import { getAllEmployees, getEmployee } from "./read"
import { createEmployee } from "./create"
import { deleteEmployee } from "./delete"
import { updateEmployee } from "./edit"

export {
  getAllEmployees,
  getEmployee,

  createEmployee,
  updateEmployee,
  deleteEmployee
}