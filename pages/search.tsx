import { ChevronDownIcon } from '@chakra-ui/icons'
import {
  Box,
  Flex,
  Heading,
  Button,
  Grid,
  Center,
  Menu,
  MenuButton,
  MenuOptionGroup,
  MenuList,
  MenuItemOption,
  Stack,
} from '@chakra-ui/react'
import { Product } from '../components/Product/Product'
import { GetStaticProps } from 'next'
import { ReactElement } from 'react'
import { fetchSearchPageData } from '../api/product'
import { filter } from '../domain/product/filterProducts'
import { displayProduct } from '../domain/product/displayProducts'
import { ProductCategories } from '../domain/product'

export const getStaticProps: GetStaticProps = async () => {
  const { products, productCategories } = await fetchSearchPageData()  
  return {
    props: { products, productCategories },
  }
}

export default function Search({ products, productCategories }: any): ReactElement {

  return (
    <>
      <Center my="20px">
        <Heading alignContent="center" mt="8">Catalogue</Heading>
      </Center>
      <Box mt="50px">
        <Flex justifyContent="space-between">
          <Box>
            {productCategories.map((i : ProductCategories, index: number) => (
              <Button
                m="5px"
                key={index}
                onClick={() => filter({ category: i.name })}
              >
                {i.name}
              </Button>
            ))}
          </Box>
          <Stack
            spacing={8}
            justifyContent="center"
            flexDirection="row"
            alignItems="center"
            isInline
          >
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                Trier
              </MenuButton>
              <MenuList minWidth="240px">
                <MenuOptionGroup title="Order" type="radio">
                  <MenuItemOption
                    value="new"
                    onClick={() => filter({ sort: 'new' })}
                  >
                    Nouveau
                  </MenuItemOption>
                  <MenuItemOption
                    value="asc"
                    onClick={() => filter({ sort: 'price asc' })}
                  >
                    Prix croissants
                  </MenuItemOption>
                  <MenuItemOption
                    value="desc"
                    onClick={() => filter({ sort: 'price desc' })}
                  >
                    Prix décroissants
                  </MenuItemOption>
                </MenuOptionGroup>
              </MenuList>
            </Menu>
          </Stack>
        </Flex>
      </Box>
      <Box my="50px">
        <Grid templateColumns="repeat(3, 1fr)" gap={10}>
          {displayProduct(products).map((p) => (
            <Product
              key={p.id}
              product={p}
            />
          ))}
        </Grid>
      </Box>
    </>
  )
}
