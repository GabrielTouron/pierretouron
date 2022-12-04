import {
  Heading,
  Button,
  Box,
  Image,
  Badge,
  Text,
  Divider,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  SimpleGrid,
} from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps } from "next";
import React, { ReactElement } from "react";
import { request } from "../../api/datocms";
import { fetchProductPageData, isLocalhost } from "../../api/product";
import { Product } from "../../domain/product";
import { ButtonBack } from "../../components/ButtonBack";
import { FocusableElement } from "@chakra-ui/utils";
import { useRouter } from "next/router";
import { ProductImage } from "../../components/ProductCard/ProductImage";
import productPage from "./../../api/product/query/searchPage.json";

type ProductDetailProps = {
  product: Product;
};

export const getStaticProps: GetStaticProps<ProductDetailProps> = async (context) => {
  if (!isLocalhost) {
    const product = await fetchProductPageData(context.params?.slug);
    return { props: { product } };
  }

  const { data } = productPage;
  const allProducts = data.allProducts as Product[];

  const product = allProducts.find((p: Product) => {
    return p.name == context.params?.slug;
  });

  return {
    props: { product },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  if (!isLocalhost) {
    const { allProducts } = await request({ query: `{ allProducts { name } }` });
    return {
      paths: allProducts.map((product: Product) => `/product/${product.name}`),
      fallback: false,
    };
  }
  const { data } = productPage;
  const allProducts = data.allProducts;

  return {
    paths: allProducts.map((product: Product) => `/product/${product.name}`),
    fallback: false,
  };
};

export default function ProductDetail({ product }: ProductDetailProps): ReactElement {
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef() as React.MutableRefObject<FocusableElement>;
  const router = useRouter();

  return (
    <>
      <ButtonBack />
      <SimpleGrid minChildWidth="45%" spacing="50px">
        <Box display={{ base: "none", md: "block" }}>
          <ProductImage
            src={product.image.url}
            alt="Segun Adebayo"
            onClick={() => setIsOpen(true)}
            hasHover={true}
          />
        </Box>
        <Box>
          <Heading>{product.name}</Heading>
          <Badge mt="3" fontSize="1.1em" colorScheme="green">
            {product.state.name}
          </Badge>
          <Divider my="5" />
          <Text fontWeight={800} fontSize={"2xl"} my="5">
            {product.price} €
          </Text>
          <Box my="5">
            {/* Change to size prop */}
            {product.productDetail.name} cm
          </Box>
          <Box display={{ md: "none" }}>
            <ProductImage
              src={product.image.url}
              alt="Segun Adebayo"
              onClick={() => setIsOpen(true)}
              hasHover={true}
            />
          </Box>

          {/* <Box marginY="30px">
            <Accordion allowMultiple>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      Livraison
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>fefef</AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Box> */}
          <Heading size={"md"}>
            Acheter directement sur place à l atelier en envoyant un mail à p.touron@pm.me
          </Heading>
          {/* todo: Ouvrir une pop up avec les informations */}
          <Button
            className="snipcart-add-item"
            my="10"
            data-item-id={product.id}
            data-item-name={product.name}
            data-item-price={product.price}
            data-item-url={router.pathname}
            data-item-image={product.image.url}
            data-item-description={product.productDetail.name}
          >
            Passer la commande en ligne
          </Button>
          {/* Todo: Faire un composant AlertProductDialog ? */}
          <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose} size="3xl">
            <AlertDialogOverlay>
              <AlertDialogContent w="1000">
                <Image objectFit="cover" src={product.image.url} alt="Segun Adebayo" />
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        </Box>
      </SimpleGrid>
    </>
  );
}
