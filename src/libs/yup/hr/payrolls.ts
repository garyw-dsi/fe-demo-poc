import * as Yup from "yup";

export type CreatePayroll = Yup.InferType<typeof createPayrollSchema>

export const createPayrollSchema = Yup.object().shape({
  batch_name: Yup
    .string()
    .required("Payroll batch name is required"),
  
  period_start: Yup
    .string()
    .required("Period start is required"),
  
  period_end: Yup
    .string()
    .required("Period end is required"),
    // .min(
    //   Yup.ref('period_start'),
    //   "Period end must be after period start"
    // ),

  employees: Yup
    .array()
    .of(
      Yup
      .object()
      .shape({
        employee_id: Yup
          .string()
          .typeError("Employee is required")
          .required("Employee is required"),
        })
    )
    .required("Employee is required"),
});
