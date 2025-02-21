export const MAX_UPLOAD_IMAGE_SIZE = 1024 * 1024; // 1MB
export const UPLOAD_IMAGE_ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg"];

type uamUser = "read_user" | "create_user" | "update_user" | "delete_user";
type uamOrganization = "read_organization" | "update_organization";
type uamGroup = "create_group" | "read_group" | "update_group" | "delete_group";
type actionUAM = uamUser | uamOrganization | uamGroup;

type actionTag = "update_tag" | "delete_tag";

type inventoryProduct = "create_product" | "read_product" | "update_product" | "delete_product";
type inventoryProductCategory = "create_product_category" | "read_product_category" | "update_product_category" | "delete_product_category"
type actionInventory = inventoryProduct | inventoryProductCategory;

type crmCustomer = "create_customer" | "read_customer" | "update_customer" | "delete_customer";
type crmLead = "create_lead" | "read_lead" | "update_lead" | "delete_lead";
type actionCRM = crmCustomer | crmLead;

type actionContact = "create_contact" | "read_contact" | "update_contact" | "delete_contact";

type accountingAccount = "create_account" | "read_account" | "update_account" | "delete_account";
type actionAccounting = accountingAccount;

type salesQuotation = "create_quotation" | "read_quotation" | "update_quotation" | "delete_quotation" | "send_quotation_email" | "approve_quotation" | "cancel_quotation";
type salesOrder = "create_order" | "read_order" | "update_order" | "delete_order" | "send_order_email" | "approve_order" | "cancel_order";
type salesInvoice = "create_invoice" | "read_invoice" | "update_invoice" | "delete_invoice" | "send_invoice_email" | "approve_invoice" | "cancel_invoice";
type actionSales = salesQuotation | salesOrder | salesInvoice;

export type ModuleAction = 
  actionUAM | 
  actionTag | 
  actionInventory | 
  actionCRM | 
  actionContact | 
  actionAccounting |
  actionSales;