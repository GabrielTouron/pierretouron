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
  BreadcrumbItem,
  Breadcrumb,
  BreadcrumbLink,
  useColorModeValue,
} from "@chakra-ui/react";
import { ProductCard } from "../components/ProductCard/ProductCard";
import { GetStaticProps } from "next";
import { filter } from "../domain/product/filterProducts";
import { getFilteredProducts } from "../domain/product/displayProducts";
import {
  SearchPageQuery,
  SearchPageDocument,
  ProductCategoriesFragment,
} from "../graphql/generated";
import { request } from "../api";
import { useMemo } from "react";
import { useRouter } from "next/router";

type Props = {
  result: SearchPageQuery;
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const result = await request<SearchPageQuery>(SearchPageDocument);
  return { props: { result } };
};

export default function Search({ result }: Props) {
  const { allProducts, allProductCategories, productTechnique } = result;

  const black = useColorModeValue("black", "black");

  const { category, sort } = useRouter().query;

  const visibleProducts = useMemo(() => {
    return getFilteredProducts({
      products: allProducts,
      category,
      sort,
    });
  }, [allProducts]);

  const getNoProductMessage = () => {
    if (visibleProducts.length === 0) {
      return <Center>Bientôt !</Center>;
    }
  };

  const getProducts = () => {
    return (
      <SimpleGrid minChildWidth={{ base: "250px", md: "300px" }} spacing="20px">
        {visibleProducts.map((p) => (
          <ProductCard product={p} key={p.id} />
        ))}
      </SimpleGrid>
    );
  };

  return (
    <>
      <Breadcrumb mb="2">
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Acceuil</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="/search">Catalogue</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <Center>
        <Heading alignContent="center">Catalogue</Heading>
      </Center>
      <Center mt="20px">Technique utilisée : {productTechnique?.name}</Center>
      <Box mt="50px">
        <Flex justifyContent="space-between" direction={{ base: "column", md: "row" }}>
          <Box
            margin={{ base: "auto", md: "0" }}
            overflowX="auto"
            whiteSpace="nowrap"
            maxWidth="80%"
          >
            {allProductCategories.map((i: ProductCategoriesFragment, index: number) => (
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
      <Box my="50px">{visibleProducts.length == 0 ? getNoProductMessage() : getProducts()}</Box>
    </>
  );
}
