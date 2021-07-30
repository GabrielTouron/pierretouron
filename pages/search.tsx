import { request } from '../lib/datocms'
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
import { useRouter } from 'next/router'
import { Product } from '../components/molecules/Product'
import { ICategory, IProduct } from '../types'
import { GetStaticProps } from 'next'
import { ReactElement } from 'react'

const SEARCH_QUERY = `query MyQuery {
  allProducts {
    price
    name
    description
    id
    categories {
      name
    }
    image {
      url
    }
    state {
      name
    }
    createdAt
  }
  allProductCategories {
    name
    id
    order
  }
}`

type CategoryQueryParams = { category?: string; sort?: string }
type SearchRequest = {
  data: { allProducts: IProduct[]; allProductCategories: ICategory[] }
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await request({
    query: SEARCH_QUERY,
  })
  return {
    props: { data },
  }
}

export default function Search({ data }: SearchRequest): ReactElement {
  const router = useRouter()

  const filter = (query: CategoryQueryParams): void => {
    const { category: urlCategory } = router.query
    const { category: clickCategory } = query

    if (
      (urlCategory == clickCategory && !!urlCategory) ||
      clickCategory === 'Tout'
    ) {
      const { category, ...rest } = router.query
      router.push({ pathname: '/search', query: rest })
      return
    }

    if (clickCategory !== 'Tout') {
      router.push({ query: { ...router.query, ...query } })
    }
  }

  const displayProduct = (): IProduct[] => {
    const { category, sort } = router.query    

    let products = !!category
      ? data.allProducts.filter(
          (p: IProduct) => p.categories[0].name === category
        )
      : data.allProducts

    products =
      sort === 'price desc'
        ? products.sort((a: IProduct, b: IProduct) => a.price + b.price)
        : products
    products =
      sort === 'price asc'
        ? products.sort((a: IProduct, b: IProduct) => a.price - b.price)
        : products
    products =
      sort === 'new'
        ? products.sort(
            (a: IProduct, b: IProduct) => {
              return (new Date(a.createdAt) < new Date(b.createdAt)) ? 1 : -1
            }
          )
        : products

    return products
  }

  const sortCategories = (): ICategory[] => {
    const categories = data.allProductCategories.sort(
      (a: ICategory, b: ICategory) => a.order - b.order
    )
    return categories
  }

  return (
    <>
      <Center my="20px">
        <Heading alignContent="center">Catalogue</Heading>
      </Center>
      <Box mt="50px">
        <Flex justifyContent="space-between">
          <Box>
            {sortCategories().map((i) => (
              <Button
                m="5px"
                key={i.id}
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
        <Grid templateColumns="repeat(3, 1fr)" gap={1}>
          {displayProduct().map((p) => (
            <Product
              key={p.id}
              id={p.id}
              categories={p.categories}
              imageUrl={p.image.url}
              name={p.name}
              price={p.price}
              state={p.state.name}
            />
          ))}
        </Grid>
      </Box>
    </>
  )
}
