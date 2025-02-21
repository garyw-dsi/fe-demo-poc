"use server"

import { getAllSalaryStructures, getSalaryStructure, getSalaryStructureOptions } from "./read"
import { deleteSalaryStructure } from "./delete"
import { createSalaryStructure } from "./create"

export {
  getAllSalaryStructures,
  getSalaryStructure,
  getSalaryStructureOptions,
  
  createSalaryStructure,
  deleteSalaryStructure
}