import { type ModuleLinks } from "@/constants/modules/links";
import { Flex, Icon, Text, Tooltip, useColorModeValue } from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";
import { Fragment, useTransition } from "react";
import ScreenTransitionLoading from "../screen-loading";

export default function SidebarLinks({ isOpen, link }: { isOpen: boolean; link: ModuleLinks }) {
  const router = useRouter();
  const pathname = usePathname();

  const [pending, screenTransition] = useTransition();

  const matchActiveRoute = (route: string) => {
    const regexRoute = route.replace(/\[.*?\]/g, '[^/]+');
    const regex = new RegExp(`^${regexRoute}$`);

    return regex.test(pathname);
  };

  const isActive = link.activeRoute.some(matchActiveRoute);

  const bg = isActive ? "blue.500" : "transparent";
  const color = useColorModeValue("gray.500", "gray.400");
  const hoverBg = useColorModeValue("gray.200", "gray.700");
  const hoverColor = useColorModeValue("black", "white");

  const onHref = (link: string) => {
    screenTransition(() => {
      router.push(link)
    })
  }

  return (
    <Fragment>
      <ScreenTransitionLoading pending={pending} />
      <Tooltip
        label={link.name}
        hasArrow
        fontSize={'xs'}
        closeOnClick={false}
        placement="right"
        isDisabled={isOpen}
      >
        <Flex
          align={'center'}
          justify={isOpen ? 'flex-start' : 'center'}
          cursor={'pointer'}
          gap={3}
          px={isOpen ? 4 : 2} py={2}
          w={'full'}
          rounded={'md'}
          bg={bg}
          color={isActive ? 'white' : color}
          _hover={{
            bg: isActive ? 'blue.500' : hoverBg,
            color: isActive ? 'white' : hoverColor
          }}
          onClick={() => onHref(link.route)}
        >
          <Icon as={link.icon} boxSize={4} />
          {isOpen && (
            <Text fontSize={'sm'}>
              {link.name}
            </Text>
          )}
        </Flex>
      </Tooltip>
    </Fragment>
  )
}