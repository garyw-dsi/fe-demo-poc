import ModulesHomeApplication from "@/components/modules/home/apps";
import { Flex } from "@chakra-ui/react";
import { checkUserPermission } from "@/app/actions/modules";
import ModulesHomeApplicationFeed from "@/components/modules/home/feed";

export const dynamic = 'force-dynamic';

type View = "application" | "feed" | "all";

interface PageProps {
  searchParams: {
    view?: View;
  };
}

export default async function ApplicationPage({ searchParams }: PageProps) {
  const view = searchParams.view || "all";
  const permission = await checkUserPermission();

  const showApplication = (
    view === "application" ||
    view === "all"
  ) && permission;

  const showFeed = (
    view === "feed" || view === "all"
  );

  return (
    <Flex
      align="center"
      w="full"
      py={{ base: 0, md: 5 }}
      px={{ md: 8 }}
      direction="column"
      gap={10}
    >
      {showApplication && (
        <ModulesHomeApplication canAccessApp={permission} />
      )}

      {showFeed && (
        <ModulesHomeApplicationFeed />
      )}
    </Flex>
  )
}
