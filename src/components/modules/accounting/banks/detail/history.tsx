import { Flex, Text } from "@chakra-ui/react"
import ModuleHistory from "@/components/modules/history"

interface History {
  pk: number,
  number: string,
  name: string,
  identifier_code: string,
  last_modified_at: string,
  last_modified_by: {
    pk: number,
    email: string,
    image: { url: string | null }
    first_name: string,
    last_name: string
  },
  created_at: string,
  created_by: {
    pk: number,
    email: string,
    image: { url: string | null }
    first_name: string,
    last_name: string
  }
}

export default function ModuleAccountingBankDetailHistory({
  history
}: {
  history: History
}) {
  return (
    <Flex direction={'column'} gap={5}>
      <Text>
        History Log
      </Text>

      <Flex
        direction={'column'}
        gap={5}
      >
        <ModuleHistory
          date={history.created_at}
          name={
            history.created_by
              ? `${history.created_by?.first_name} ${history.created_by?.last_name}`
              : "System"
          }
          historyName={history.name}
          historyTitle="Created bank "
          avatar={history.created_by.image.url || undefined}
        />
        {history.last_modified_by && (
          <ModuleHistory
            date={history.last_modified_at}
            name={`${history.last_modified_by?.first_name} ${history.last_modified_by?.last_name}`}
            historyName={history.name}
            historyTitle="Updated bank "
            avatar={history.last_modified_by.image.url || undefined}
          />
        )}
      </Flex>
    </Flex>
  )
}