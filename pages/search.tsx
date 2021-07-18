import { request } from "../lib/datocms";
import { ChevronDownIcon } from "@chakra-ui/icons";
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
  Text,
  VStack,
  Image,
  Badge

} from "@chakra-ui/react"
import { useRouter } from "next/router";
import { Product } from "../components/molecules/Product";


const HOMEPAGE_QUERY = `query MyQuery {
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
}`;


export async function getStaticProps() {
  const data = await request({
    query: HOMEPAGE_QUERY,
    variables: { limit: 10 }
  });
  return {
    props: { data }
  };

}

export default function Search({data}) {
  const router = useRouter()

  const filter = (query: any) => {
     
    if ((router.query.category == query.category && !!router.query.category) || query.category === 'Tout' )  {
  
      const {category, ...rest} = router.query
      router.push({query: rest});
      return
    }

    const tata = router.query    
  
    router.push({query:{ ...tata, ...query}})
  }


  const displayProduct = () => {
    const {category, sort} = router.query
    
    let products = !!category ? data.allProducts.filter(p => p.categories[0].name === category) : data.allProducts
    
    products = sort === 'price desc' ? products.sort((a, b) => a.price + b.price) : products
    products = sort === 'price asc' ? products.sort((a, b) => a.price - b.price) : products
    products = sort === 'new' ? products.sort((a, b) => a.createdAt + b.createdAt) : products    

    return products
  }

  const sortCategories = () => {
    
    const categories =  data.allProductCategories.sort((a, b) => a.order - b.order)
    console.log(categories);
    return categories
  }


  return (
    <>
      <Center my="20px">
        <Heading alignContent='center'>Catalogue</Heading>
      </Center>
      <Box mt="50px">
        <Flex justifyContent="space-between">
          <Box>
            {sortCategories().map(i => (
              <Button m="5px" key={i.id} onClick={() => filter({category: i.name})}>{i.name}</Button>
              )
            )}
          </Box>
          <Stack
          spacing={8}
          justifyContent="center"
          flexDirection="row"
          alignItems="center"
          isInline>
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                Trier
              </MenuButton>
              <MenuList minWidth="240px">
                <MenuOptionGroup title="Order" type="radio">
                  <MenuItemOption value="new" onClick={() => filter({sort: 'new'})}>Nouveau</MenuItemOption>
                  <MenuItemOption value="asc" onClick={() => filter({sort: 'price asc'})}>Prix croissants</MenuItemOption>
                  <MenuItemOption value="desc" onClick={() => filter({sort: 'price desc'})}>Prix décroissants</MenuItemOption>
                </MenuOptionGroup>
              </MenuList>
            </Menu>
          </Stack>
        </Flex>
      </Box>
      <Box my="50px">
        <Grid templateColumns="repeat(3, 1fr)" gap={1} >
          {displayProduct().map(p => (
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
  );
}