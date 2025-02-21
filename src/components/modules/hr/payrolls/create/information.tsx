import { Flex, FormControl, Stack } from "@chakra-ui/react";
import { Field, useFormikContext } from "formik";

import ModuleHRPayrollFormLayout from "../layout";
import { CreatePayroll } from "@/libs/yup/hr/payrolls";
import { ModuleInput, ModuleInputErrorMessage, ModuleInputLabel } from "@/components/modules/input";

export default function ModuleHRPayrollCreateInformation() {
  const { errors, touched } = useFormikContext<CreatePayroll>();

  return (
    <ModuleHRPayrollFormLayout
      title="Payroll Information"
    >
      <Stack spacing={5}>
        <Flex
          gap={5}
          w={'full'}
          direction={{ base: 'column', md: 'row' }}
        >
          <FormControl
            isRequired
            isInvalid={!!errors.batch_name && !!touched.batch_name}
          >
            <ModuleInputLabel label="Payroll Batch Name"/>
            <Field as={ModuleInput} name="batch_name" placeholder="Batch Name"/>
            <ModuleInputErrorMessage value={errors.batch_name}/>
          </FormControl>
        </Flex>
        <Flex
          gap={5}
          w={'full'}
          direction={{ base: 'column', md: 'row' }}
        >
          <FormControl
            isRequired
            isInvalid={!!errors.period_start && !!touched.period_start}
          >
            <ModuleInputLabel label="Period Start"/>
            <Field as={ModuleInput} type="date" name="period_start" />
            <ModuleInputErrorMessage value={errors.period_start}/>
          </FormControl>
          <FormControl
            isRequired
            isInvalid={!!errors.period_end && !!touched.period_end}
          >
            <ModuleInputLabel label="Period End"/>
            <Field as={ModuleInput} type="date" name="period_end" />
            <ModuleInputErrorMessage value={errors.period_end}/>
          </FormControl>
        </Flex>
      </Stack>
    </ModuleHRPayrollFormLayout>
  );
}