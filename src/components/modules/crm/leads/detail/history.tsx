import { Flex, Text } from "@chakra-ui/react"
import ModuleHistory from "@/components/modules/history"
import { components } from "@/libs/api/schema/crm"

export default function ModuleCRMLeadDetailHistory({
  history
}: {
  history: components["schemas"]["Lead"]
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
          historyTitle="Created Lead "
          avatar={history.created_by.image.url || undefined}
        />
        {history.last_modified_by && (
          <ModuleHistory
            date={history.last_modified_at}
            name={`${history.last_modified_by?.first_name} ${history.last_modified_by?.last_name}`}
            historyName={history.name}
            historyTitle="Updated Lead "
            avatar={history.last_modified_by.image.url || undefined}
          />
        )}
      </Flex>
    </Flex>
  )
}