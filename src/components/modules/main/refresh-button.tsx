"use client"

import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { Button, Icon, Tooltip } from "@chakra-ui/react"
import { RiRefreshLine } from "react-icons/ri"

export default function HeaderRefreshButton() {
  const router = useRouter();

  const [isPending, refreshData] = useTransition();

  const onRefresh = () => {
    refreshData(() => {
      router.refresh();
    });
  }

  return (
    <Tooltip
      label={"refresh data"}
      hasArrow
      fontSize={'xs'}
      closeOnClick={false}
    >
      <Button
        size={'xs'}
        py={4}
        px={2}
        isLoading={isPending}
        onClick={onRefresh}
        loadingText="Refreshing Data"
      >
        <Icon as={RiRefreshLine} boxSize={4} />
      </Button>
    </Tooltip>
  )
}