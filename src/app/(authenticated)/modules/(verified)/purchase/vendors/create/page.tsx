import { Flex } from "@chakra-ui/react";
import MainModuleHeader from "@/components/modules/main/header";
import ModulePurchaseVendorsMenuActionBack from "@/components/modules/purchase/vendors/menu-action/action-back";
import ModulePurchaseVendorCreateForm from "@/components/modules/purchase/vendors/create/form";

export const dynamic = 'force-dynamic';

export default function ModulePurchaseVendorsCreatePage() {
  return (
    <Flex
      w={'full'}
      direction={'column'}
      p={5}
      gap={5}
      flex={1}
    >
      <MainModuleHeader
        title="Create Vendor"
        withViewHelper={false}
        actions={<ModulePurchaseVendorsMenuActionBack />}
      />
      <ModulePurchaseVendorCreateForm />
    </Flex>
  )
}