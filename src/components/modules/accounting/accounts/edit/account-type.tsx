"use client"

import { accountLevelTypes, accountTypes } from "@/constants/modules/accounting/accounts";
import { components } from "@/libs/api/schema/accounting";
import { CreateAccount } from "@/libs/yup/accounting/accounts"
import { Flex, Radio, RadioGroup } from "@chakra-ui/react"
import { Field, useFormikContext } from "formik"

export default function ModuleAccountingAccountTypeEdit({
  parent
}: {
  parent: components['schemas']['AccountOpt'] | null;
}) {
  const { values, setFieldValue } = useFormikContext<CreateAccount>();

  if (values.parent_id) {
    const parentType = accountLevelTypes
      .find((type) => type.type === parent?.account_type);

    return (
      <RadioGroup
        onChange={(value) => {
          const name = parent?.name.includes(value)
            ? parent?.name
            : `${value} ${parent?.name}`
          setFieldValue("name", name)
        }}
      >
        <Flex align={'center'} gap={5} flexWrap={'wrap'}>
          {parentType?.level.map((level) => (
            <Radio key={level}
              value={level}
              size={'sm'}
            >
              {level}
            </Radio>
          ))}
        </Flex>
      </RadioGroup>
    )
  }

  return (
    <Field name="account_type">
      {() => (
        <RadioGroup
          name="account_type"
          value={values.account_type || ""}
          onChange={(value) => setFieldValue("account_type", value)}
          pb={3}
        >
          <Flex align={'center'} gap={5} flexWrap={'wrap'}>
            {accountTypes.map((type) => (
              <Radio key={type}
                value={type}
                size={'sm'}
              >
                {type}
              </Radio>
            ))}
          </Flex>
        </RadioGroup>
      )}
    </Field>
  )
}