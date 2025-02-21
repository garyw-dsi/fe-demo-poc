import { Flex, Text } from "@chakra-ui/react"
import ModuleHistory from "@/components/modules/history"

interface JournalItems {
  number: string;
  name: string;
  debit: number;
  credit: number;
}

interface History {
  pk: number;
  entry_id: string;
  type: string;
  reference: {
    pk: number;
    entry_id: string;
  };
  date: string;
  currency: string;
  items: JournalItems[];
  total_debit: number;
  total_credit: number;
  last_modified_at: string,
  last_modified_by: {
    pk: number,
    email: string,
    first_name: string,
    last_name: string
  },
  created_at: string,
  created_by: {
    pk: number,
    email: string,
    first_name: string,
    last_name: string
  }
}

export default function ModuleAccountingJournalDetailHistory({
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
          historyName={history.entry_id}
          historyTitle="Created journal "
          avatar={undefined}
        />
        {history.last_modified_by && (
          <ModuleHistory
            date={history.last_modified_at}
            name={`${history.last_modified_by?.first_name} ${history.last_modified_by?.last_name}`}
            historyName={history.entry_id}
            historyTitle="Updated journal "
            avatar={undefined}
          />
        )}
      </Flex>
    </Flex>
  )
}