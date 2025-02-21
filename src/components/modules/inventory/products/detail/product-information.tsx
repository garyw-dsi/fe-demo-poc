"use client"

import { Avatar, Divider, Flex, IconButton, Image, Stack, Tag, Text, useColorModeValue } from "@chakra-ui/react";
import { components } from "@/libs/api/schema/inventory";
import { formatStdCurrency } from "@/utils/currency";
import ModuleInventoryProductFormLayout from "../layout";
import ModuleInventoryProductUpdateStock from "../stock-update";
import { RxOpenInNewWindow } from "react-icons/rx";
import { useRouter } from "next/navigation";

const DetailLabel = ({ label }: { label: string }) => {
  return (
    <Text
      fontSize={'xs'}
      color={useColorModeValue('gray.500', 'gray.300')}
    >
      {label}
    </Text>
  )
}

const NoImageFound = ({ name }: { name: string }) => {
  return (
    <Avatar
      size={'xl'}
      name={name}
      bg={useColorModeValue('gray.300', 'gray.700')}
      rounded={'md'}
    />
  )
}

const ProductImage = ({ url }: { url: string }) => {
  return (
    <Image
      src={url}
      alt={'Product Image'}
      boxSize={'100px'}
      objectFit={'cover'}
      rounded={'md'}
    />
  )
}

export default function ModuleInventoryProductInformationDetail({
  data
}: {
  data: components['schemas']['Product']
}) {
  const router = useRouter();
  return (
    <ModuleInventoryProductFormLayout title="Product Information">
      <Stack spacing={5}>
        <Flex direction={'column'} gap={5}>
          {data.image.url
            ? <ProductImage url={data.image.url} />
            : <NoImageFound name={data.name} />
          }
          <Stack spacing={0}>
            <DetailLabel label="Product Name" />
            <Text fontWeight={'bold'} fontSize={'lg'}>
              {data.name}
            </Text>
          </Stack>
        </Flex>

        <Divider />

        <Stack spacing={0}>
          <DetailLabel label="Product Type" />
          <Text>
            {data.product_type}
          </Text>
        </Stack>

        <Stack spacing={0}>
          <DetailLabel label="Product Unit" />
          <Text>
            {data.unit}
          </Text>
        </Stack>

        <Flex align={'center'} gap={8}>
          <Stack spacing={0}>
            <DetailLabel label="Stock" />
            <Text>
              {Number(data.stock)}
            </Text>
          </Stack>
          <ModuleInventoryProductUpdateStock
            initialStock={Number(data.stock)}
            productId={data.pk}
          />
        </Flex>

        <Stack spacing={0}>
          <DetailLabel label="Product Category" />
          <Flex align={'center'} gap={1}>
            <Text>
              {data.product_category.name}
            </Text>
            <IconButton
              aria-label="View Product Category"
              size={'md'}
              variant={'link'}
              colorScheme="blue"
              icon={<RxOpenInNewWindow />}
              onClick={() => {
                router.push(`/modules/inventory/products/category/detail/${data.product_category.pk}`)
              }}
            />
          </Flex>
        </Stack>

        <Stack spacing={0}>
          <DetailLabel label="Currency" />
          <Text>
            {data.currency.symbol} ({data.currency.name})
          </Text>
        </Stack>

        <Stack spacing={0}>
          <DetailLabel label="Price" />
          <Text>
            {formatStdCurrency({
              currencyISO: data.currency.iso,
              price: Number(data.price) || 0
            })}
          </Text>
        </Stack>

        <Stack spacing={1} w={'fit-content'}>
          <DetailLabel label="Product Tags" />
          {data.tags.length > 0
            ? (
              <Flex flexWrap={'wrap'} gap={2} align={'center'}>
                {data.tags.map((tag, index) => (
                  <Tag key={index}
                    colorScheme="teal"
                  >
                    {tag.name}
                  </Tag>
                ))}
              </Flex>
            )
            : (
              <Text>
                -
              </Text>
            )
          }
        </Stack>
      </Stack>
    </ModuleInventoryProductFormLayout>
  )
}