"use client"

import { ButtonGroup, Flex, Icon, IconButton, Text, Tooltip } from "@chakra-ui/react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { MdOutlineViewKanban } from "react-icons/md";
import { RiTableView } from "react-icons/ri";
import HeaderRefreshButton from "./refresh-button";

type View = 'kanban' | 'table';

interface MainModuleHeaderProps {
  actions?: React.ReactNode;
  title: string;
  filter?: React.ReactNode;
  search?: React.ReactNode;
  withViewHelper?: boolean;
  defaultView?: View;
}

interface ViewButtonProps {
  icon: React.ElementType;
  view: View;
  defaultView?: View;
}

const ViewButton = ({ icon, view, defaultView = "kanban" }: ViewButtonProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentView = searchParams.get('view') || defaultView;

  const onChangeView = () => {
    const params = new URLSearchParams(searchParams);
    params.set('view', view);

    const newUrl = `${pathname}?${params.toString()}`;
    router.push(newUrl);
  }

  return (
    <Tooltip
      label={view}
      hasArrow
      fontSize={'xs'}
      closeOnClick={false}
    >
      <IconButton
        size={'xs'}
        py={4}
        px={2}
        aria-label="render view"
        icon={<Icon as={icon} boxSize={4} />}
        colorScheme={currentView === view ? 'teal' : 'gray'}
        onClick={onChangeView}
      />
    </Tooltip>
  )
}

export default function MainModuleHeader({
  actions,
  title,
  filter,
  search,
  withViewHelper = true,
  defaultView = "kanban"
}: MainModuleHeaderProps) {
  return (
    <Flex w={'full'} direction={'column'} gap={4}>
      <Flex
        w={'full'}
        justify={'space-between'}
        align={'center'}
        flexWrap={'wrap'}
      >
        <Flex align={'center'} gap={3} flexWrap={'wrap-reverse'}>
          {actions}
          <Text fontSize={"sm"}>
            {title}
          </Text>
        </Flex>
        {withViewHelper && (
          <ButtonGroup isAttached gap={'0.1rem'}>
            <HeaderRefreshButton />
            <ViewButton icon={MdOutlineViewKanban} view="kanban" defaultView={defaultView} />
            <ViewButton icon={RiTableView} view="table" defaultView={defaultView} />
          </ButtonGroup>
        )}
      </Flex>
      <Flex
        w={'full'}
        align={{ base: 'stretch', md: 'center' }}
        flexWrap={'wrap'}
        gap={3}
      >
        {filter}
        {search}
      </Flex>
    </Flex>
  )
}