"use server"

import { getAllPayrolls, getPayroll } from "./read";
import { deletePayroll } from "./delete";
import { createHRPayroll } from "./create";

export {
  getAllPayrolls,
  getPayroll,

  deletePayroll,

  createHRPayroll,
};