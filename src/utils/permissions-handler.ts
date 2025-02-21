import { components } from "@/libs/api/schema/uam"

/**
 * @function findPermission
 * @param permission 
 * @param module 
 * 
 * @description
 * this function will check object permission 
 * if user permission match the object app or module
 * user can access the specific application or module
 * 
 * @returns 'permission'
 */
const findPermission = (
    permission: components['schemas']['Permission'],
    module: string
  ) => {
    return permission.app
      .toLowerCase()
      .includes(module.toLowerCase()) ||
      permission.module
        .toLowerCase()
        .includes(module.toLowerCase())
}

/**
 * @function userCanAccessApplication
 * @param canAccessApp 
 * @param module 
 * 
 * @description
 * This function checks if the user has permission to access the application
 * which module user is trying to access.
 * and blocks the user from accessing the application if the user does not have permission.
 * 
 * @returns 'user permission'
 */
export const userCanAccessApplication = (
  canAccessApp: components['schemas']['Permission'][],
  module: string
) => {
  return canAccessApp
    .find((permission) => {
      return findPermission(permission, module)
    })
}