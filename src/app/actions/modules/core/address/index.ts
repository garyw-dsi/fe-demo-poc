import { AddressCreate, setContactAddress } from "./create";
import { getContactAddressById } from "./read";
import { updateContactAddress } from "./edit";
import { deleteContactAddress } from "./delete";

export const addressValidator = (
  addresses: AddressCreate[]
) => {
  return addresses.filter(address => 
    address.address ||
    address.address_type ||
    address.phone
  );
}

export interface ValidatorAddressEdit
  extends AddressCreate { 
  pk: number | null;
}

export const editAddressValidator = (
  addresses: ValidatorAddressEdit[]
) => {
  return addresses.filter(address => 
    address.address ||
    address.address_type ||
    address.phone
  );
}

export {
  getContactAddressById,
  setContactAddress,
  updateContactAddress, 
  deleteContactAddress
}