"use client";

import { Flex, FlexProps, Icon, Text, useColorModeValue } from "@chakra-ui/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface BottomNavigationLinkProps {
  route: string;
  label: string;
  icon: React.ElementType;
}

interface LayoutProps
  extends FlexProps {
  isActive: boolean;
  activeColor: string;
  defaultColor: string;
}

const Layout = ({
  isActive,
  activeColor,
  defaultColor,
  children,
  ...props
}: LayoutProps) => (
  <Flex
    direction="column"
    align="center"
    justify="center"
    gap={1}
    cursor="pointer"
    color={isActive ? activeColor : defaultColor}
    {...props}
  >
    {children}
  </Flex>
)

export default function BottomNavigationLinksHome({
  route,
  label,
  icon,
}: BottomNavigationLinkProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentRoute = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;
  const isActive = currentRoute === route;

  const handleNavigation = () => {
    router.push(route);
  };

  return (
    <Layout
      isActive={isActive}
      activeColor={useColorModeValue("gray.600", "gray.200")}
      defaultColor={useColorModeValue("gray.300", "gray.600")}
      onClick={handleNavigation}
    >
      <Icon as={icon} boxSize={5} />
      <Text fontSize="xs">{label}</Text>
    </Layout>
  )
}
