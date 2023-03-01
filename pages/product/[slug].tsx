import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
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
import { FocusableElement } from "@chakra-ui/utils";
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
  const snipcartUrl = `${process.env.NEXT_PUBLIC_URL}/product/${product.name}/`;

  return (
    <>
      <Breadcrumb mb={4}>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Acceuil</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href="/search">Catalogue</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="#">{product.name}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
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
            {product.price.toFixed(2)} €
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
              hasHover={false}
            />
          </Box>
          <Heading size={"md"}>
            Acheter directement sur place à l atelier en envoyant un mail à p.touron@pm.me
          </Heading>

          {product.state.name === "Disponible" ? (
            <Button
              className="snipcart-add-item"
              my="10"
              data-item-id={product.name}
              data-item-name={product.name}
              data-item-price={product.price.toFixed(2)}
              data-item-url={snipcartUrl}
              data-item-image={product.image.url}
              data-item-description={product.productDetail.name}
            >
              Passer la commande en ligne
            </Button>
          ) : null}
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
