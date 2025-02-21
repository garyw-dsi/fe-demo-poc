"use server"

import { getAllDepartments, getDepartment} from "./read"
import { deleteDepartment } from "./delete"
import { createDepartment } from "./create"

export {
  getAllDepartments,
  getDepartment,

  deleteDepartment,
  createDepartment
}