"use server"

import { getAllLeads, getLead, getLeadOptions } from "./read"
import { createLead } from "./create"
import { editLead, changeLeadStatus } from "./edit"
import { deleteLead } from "./delete"

export {
  getAllLeads,
  getLead,
  getLeadOptions,
  
  createLead,
  editLead,
  changeLeadStatus,
  deleteLead
}