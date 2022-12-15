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
import { ButtonBack } from "../../components/ButtonBack";
import { FocusableElement } from "@chakra-ui/utils";
import { useRouter } from "next/router";
import { ProductImage } from "../../components/ProductCard/ProductImage";
import {
  ProductBySlugDocument,
  ProductBySlugQuery,
  AllProductsNameDocument,
} from "./../../graphql/generated";

type Props = {
  result: ProductBySlugQuery;
};

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const result = await request<ProductBySlugQuery>(ProductBySlugDocument, {
    slug: context.params?.slug,
  });
  return { props: { result } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { allProducts } = await request(AllProductsNameDocument);
  return {
    paths: allProducts.map(({ name }: { name: string }) => `/product/${name}`),
    fallback: false,
  };
};

export default function ProductDetail({ result }: Props): ReactElement {
  const { product } = result;
  if (!product) return <div>Product not found</div>;
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
