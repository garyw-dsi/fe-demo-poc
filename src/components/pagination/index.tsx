"use client"

import { Flex, Icon, Select, Text, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import ReactPaginate from 'react-paginate';

import './_pagination.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface PaginationProps {
  totalPages: number;
}

const ViewPagination = ({ totalPages }: PaginationProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { colorMode } = useColorMode();

  const currentPage = Number(searchParams.get('page')) || 1;
  const limit = Number(searchParams.get('page_size')) || 10;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());

    const newUrl = `${pathname}?${params.toString()}`;
    router.push(newUrl);
  };

  const onDisplayData = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    const params = new URLSearchParams(searchParams);

    params.set('page_size', value);
    params.set('page', '1');

    const newUrl = `${pathname}?${params.toString()}`;
    router.push(newUrl);
  };

  return (
    <Flex
      align={{ md: 'center' }}
      justify={'space-between'}
      w={"full"}
      flexWrap={'wrap'}
      direction={{ base: 'column', md: 'row' }}
      gap={{ base: 5, md: 0 }}
    >
      <Flex
        w={'fit-content'}
        align={'center'}
        gap={3}
        fontSize={{ base: 'sm', md: 'xs' }}
        color={useColorModeValue('gray.600', 'gray.400')}
      >
        <Select
          bg={useColorModeValue('white', 'gray.800')}
          value={limit}
          onChange={onDisplayData}
          fontSize={{ base: 'sm', md: 'xs' }}
          size={'sm'}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </Select>
        <Text
          whiteSpace={'nowrap'}
          fontWeight={'medium'}
        >
          Items per page
        </Text>
      </Flex>

      <ReactPaginate
        breakLabel={"..."}

        activeClassName={'item active'}
        breakClassName={'item break-me'}
        containerClassName={`pagination ${colorMode === 'dark' && 'pagination-dark'}`}
        pageClassName={'item pagination-page'}

        pageLinkClassName={`item link ${colorMode === 'dark' && 'item-dark link-dark'}`}
        nextLinkClassName={`item link ${colorMode === 'dark' && 'item-dark link-dark'}`}
        previousLinkClassName={`item link ${colorMode === 'dark' && 'item-dark link-dark'}`}

        nextClassName={`item next ${colorMode === 'dark' && 'item-dark'}`}
        nextLabel={<Icon as={FaChevronRight} boxSize={3} />}

        previousClassName={`item previous ${colorMode === 'dark' && 'item-dark'}`}
        previousLabel={<Icon as={FaChevronLeft} boxSize={3} />}

        forcePage={currentPage - 1}
        pageCount={totalPages}
        pageRangeDisplayed={1}
        renderOnZeroPageCount={null}
        onPageChange={(page) => createPageURL(page.selected + 1)}
        onPageActive={(page) => createPageURL(page.selected + 1)}
      />
    </Flex>
  )
}

export default function Pagination({ totalPages }: PaginationProps) {
  if (totalPages > 1) {
    return <ViewPagination totalPages={totalPages} />
  }

  return null;
}