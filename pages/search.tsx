import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Heading,
  Button,
  SimpleGrid,
  Center,
  Menu,
  MenuButton,
  MenuOptionGroup,
  MenuList,
  MenuItemOption,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { ProductCard } from "../components/ProductCard/ProductCard";
import { GetStaticProps } from "next";
import { ReactElement } from "react";
import { fetchSearchPageData } from "../api/product";
import { filter } from "../domain/product/filterProducts";
import { displayProduct } from "../domain/product/displayProducts";
import { Product, ProductCategories } from "../domain/product";

type SearchProps = {
  products: Product[];
  productCategories: ProductCategories[];
};

export const getStaticProps: GetStaticProps<SearchProps> = async () => {
  const { products, productCategories } = await fetchSearchPageData();
  return {
    props: { products, productCategories },
  };
};

export default function Search({ products, productCategories }: SearchProps): ReactElement {
  const black = useColorModeValue("black", "black");

  return (
    <>
      <Center>
        <Heading alignContent="center">Catalogue</Heading>
      </Center>
      <Box mt="50px">
        <Flex justifyContent="space-between" direction={{ base: "column", md: "row" }}>
          <Box margin={{ base: "auto", md: "0" }} overflowX="scroll" whiteSpace="nowrap">
            {productCategories.map((i: ProductCategories, index: number) => (
              <Button m="5px" key={index} onClick={() => filter({ category: i.name })}>
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
            marginTop={{ base: "30px", md: "0" }}
          >
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                backgroundColor="primary"
                textColor={black}
              >
                Trier
              </MenuButton>
              <MenuList minWidth="240px">
                <MenuOptionGroup title="Order" type="radio">
                  <MenuItemOption value="new" onClick={() => filter({ sort: "new" })}>
                    Nouveau
                  </MenuItemOption>
                  <MenuItemOption value="asc" onClick={() => filter({ sort: "price asc" })}>
                    Prix croissants
                  </MenuItemOption>
                  <MenuItemOption value="desc" onClick={() => filter({ sort: "price desc" })}>
                    Prix décroissants
                  </MenuItemOption>
                </MenuOptionGroup>
              </MenuList>
            </Menu>
          </Stack>
        </Flex>
      </Box>
      <Box my="50px">
        <SimpleGrid minChildWidth={{ base: "250px", md: "300px" }} spacing="20px">
          {displayProduct(products).map((p) => (
            <ProductCard product={p} key={p.id} />
          ))}
        </SimpleGrid>
      </Box>
    </>
  );
}
