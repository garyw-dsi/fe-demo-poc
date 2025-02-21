import * as Yup from 'yup';
import { components } from '@/libs/api/schema/uam';
import { customerLegalTypes } from '@/constants/modules/crm';

export type OnboardingPlan = 'Individual' | 'Company';

export interface OnboardingOrganization {
  legal_type: components["schemas"]["OrganizationLegalType"];
  legal_name: string;
}

export interface Onboarding {
  plan: OnboardingPlan;
  organization: OnboardingOrganization;
}

export const onboardingSchema = Yup.object().shape({
  plan: Yup.string().required(),
  organization: Yup.object().shape({
    legal_name: Yup.string()
      .min(3, "Legal name must be at least 3 characters")
      .max(150, "Legal name must be at most 150 characters")
      .matches(/^[a-zA-Z0-9 ]*$/, 'Symbols are not allowed')
      .required("Legal name is required"),
    legal_type: Yup
    .string()
    .oneOf(
      customerLegalTypes.map((legalType) => legalType.values),
      'Invalid Legal Type'
    )
    .required("Legal Type is required!"),
  }),
});