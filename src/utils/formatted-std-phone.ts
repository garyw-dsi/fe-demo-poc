/**
 * This function is used to format the phone number
 * @param phone 
 * 
 * example: from the backend given the phone format like this
 * tel:+62-891-2341-234
 * 
 * it should formatted so frontend can easily managed it
 * 
 * @returns {
 *  phone_code: "+62",
 *  phone: "8912341234"
 * }
 * 
 * so the phone_code is the country code and the phone is the number
 */

export const formattedStdPhone = (phone: string) => {
  const formattedPhone = phone.replace("tel:", "");
  const countryPhoneCodes = formattedPhone.split("-")[0];
  const newPhoneNumber = formattedPhone.split("-").slice(1).join("");
  
  return {
    phone_code: countryPhoneCodes,
    phone: newPhoneNumber
  }
}

/**
 * 
 * @param phone 
 * example: from the backend given the phone format like this
 * tel:+62-891-2341-234
 * 
 * it should formatted so frontend can easily view it
 * 
 * @returns +628912341234
 */
export const viewFormattedStdPhone = (phone: string) => {
  const formattedPhone = phone.replace("tel:", "");
  const countryPhoneCodes = formattedPhone.split("-")[0];
  const newPhoneNumber = formattedPhone.split("-").slice(1).join("");
  
  return `${countryPhoneCodes}${newPhoneNumber}`
}

/**
 * 
 * @param phone 
 * example: from the backend given the phone format like this
 * tel:+62-891-2341-234
 * 
 * it should formatted so frontend can easily view it
 * 
 * @returns {
      phone_code: +62,
      phone: 8912341234
    }
 */
export const viewFormattedStdPhoneToObj = (phone: string) => {
  const formattedPhone = phone.replace("tel:", "");
  const countryPhoneCodes = formattedPhone.split("-")[0];
  const newPhoneNumber = formattedPhone.split("-").slice(1).join("");
  
  return (
    {
      phone_code: countryPhoneCodes,
      phone: newPhoneNumber
    }
  );
}