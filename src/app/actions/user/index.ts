"use server"

import { checkUserVerificationToken } from "@/app/actions/user/check-ctx-token";
import { requestChangePassword, userChangePassword } from "@/app/actions/user/change-password";
import { requestVerificationLink, checkUserVerification, verificationUser } from "@/app/actions/user/verification";
import { requestResetPassword, userResetPassword } from "@/app/actions/user/reset-password";
import { userRegistration } from "@/app/actions/user/registration";

export type Context = "Reset Password" |
  "Registration" |
  "Change Password" |
  "Verification" |
  "New User";

export {
  checkUserVerificationToken,

  requestVerificationLink,
  checkUserVerification,
  verificationUser,

  requestChangePassword,
  userChangePassword,

  requestResetPassword,
  userResetPassword,

  userRegistration
}