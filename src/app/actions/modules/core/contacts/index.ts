"use server"

import { getAllContacts, getContactOptions, getContact } from "./read"
import { createContact, importContact } from "./create"
import { updateContact } from "./edit"
import { deleteContact, softDeleteContact } from "./delete"

export {
  getAllContacts,
  getContactOptions,
  getContact,

  createContact,
  importContact,

  updateContact,
  
  softDeleteContact,
  deleteContact
}