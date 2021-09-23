import {
  Heading,
  Button,
  Box,
  Center,
  Image,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
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
import { fetchProductPageData } from "../../api/product";
import { ProductImage } from "../../components/ProductImage/ProductImage";
import { Product } from "../../domain/product";
import { ButtonBack } from "../../components/ButtonBack";
import { FocusableElement } from "@chakra-ui/utils";

type ProductDetailProps = {
  product: Product;
};

export const getStaticProps: GetStaticProps<ProductDetailProps> = async (context) => {
  const product = await fetchProductPageData(context.params?.slug);

  return {
    props: { product },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { allProducts } = await request({ query: `{ allProducts { name } }` });

  return {
    paths: allProducts.map((product: Product) => `/product/${product.name}`),
    fallback: false,
  };
};

export default function ProductDetail({ product }: ProductDetailProps): ReactElement {
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef() as React.MutableRefObject<FocusableElement>;

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
        <Box pt="10">
          <Heading>{product.name}</Heading>
          <Badge mt="3" fontSize="1.1em" colorScheme="green">
            {product.state.name}
          </Badge>
          <Divider my="5" />
          <Text fontWeight={800} fontSize={"2xl"} my="5">
            {product.price} €
          </Text>
          <Box my="5">
            {product.productTechnique.name}
            <br />
            {product.productDetail.name}
          </Box>
          <Box display={{ md: "none" }}>
            <ProductImage
              src={product.image.url}
              alt="Segun Adebayo"
              onClick={() => setIsOpen(true)}
              hasHover={true}
            />
          </Box>

          <Box>
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
                <AccordionPanel pb={4}>{product.shipping}</AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Box>
          <Center>
            <Button onClick={() => console.log("ajouter au panier")} my="10">
              AJOUTER AU PANIER
            </Button>
          </Center>
          {/* Todo: Faire une composant AlertProductDialog ? */}
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
