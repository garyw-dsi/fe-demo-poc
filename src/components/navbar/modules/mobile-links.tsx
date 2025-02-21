"use client"

import { ModuleLinks } from "@/constants/modules/links";
import { Flex, Icon, Text } from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";

export default function MainModuleMobileSidebarLinks({
  link, onClose
}: {
  link: ModuleLinks;
  onClose: () => void;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const matchActiveRoute = (route: string) => {
    const regexRoute = route.replace(/\[.*?\]/g, '[^/]+');
    const regex = new RegExp(`^${regexRoute}$`);

    return regex.test(pathname);
  };

  const isActive = link.activeRoute.some(matchActiveRoute);

  return (
    <Flex
      align={'center'}
      gap={4}
      color={isActive ? 'blue.500' : 'gray.500'}
      cursor={'pointer'}
      fontWeight={isActive ? 'bold' : 'normal'}
      onClick={() => {
        router.push(link.route);
        onClose();
      }}
    >
      <Icon as={link.icon} />
      <Text fontSize={'sm'}>
        {link.name}
      </Text>
    </Flex>
  )
}
