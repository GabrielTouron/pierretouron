import { ArrowBackIcon } from '@chakra-ui/icons'
import {
  Heading,
  Button,
  Box,
  Center,
  Flex,
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
  IconButton
} from '@chakra-ui/react'
import { GetStaticPaths, GetStaticProps } from 'next'
import React, { ReactElement } from 'react'
import { request } from '../../api/datocms'
import { useRouter } from 'next/router'
import { fetchProductPageData } from '../../api/product'


export const getStaticPaths: GetStaticPaths = async () => {
  const data = await request({ query: `{ allProducts { name } }` })

  return {
    paths: data.allProducts.map(
      (product: any) => `/product/${product.name}`
    ),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params : { slug } }) => {
  const product = await fetchProductPageData(slug)

  return {
    props: { product },
  }
}

export default function Product( { product }: any ): ReactElement {
  const [isOpen, setIsOpen] = React.useState(false)
  const onClose = () => setIsOpen(false)
  const cancelRef = React.useRef()
  const router = useRouter()

  return (
      <>
        <IconButton
          aria-label="Back to search page"
          size="lg"
          my="5"
          icon={<ArrowBackIcon />}
          onClick={()=> router.back()}
        />
      <Box>
        <Flex justifyContent="space-between">
          <Box w="45%">
            <Image
              objectFit="cover"
              src={product.image.url}
              alt="Segun Adebayo"
              onClick={() => setIsOpen(true)}
              borderRadius="25px"
              _hover={{
                boxShadow: '2xl',
                borderRadius: '25px',
                cursor: 'pointer',
              }}
            />
          </Box>
          <Box w="45%" pt="10">
            <Heading>{product.name}</Heading>
            <Badge mt="3" fontSize="1.1em" colorScheme="green">
              {product.state.name}
            </Badge>
            <Divider my="5" />
            <Text fontWeight={800} fontSize={'2xl'} my="5">
              {product.price} €
            </Text>
            <Box my="5">{product.productTechnique.name}
            <br/>
            {product.productDetail.name}
            </Box>
            <Center>
              <Button onClick={() => console.log('ajouter au panier')} my="10">
                AJOUTER AU PANIER
              </Button>
            </Center>
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
                  <AccordionPanel pb={4}>
                    {product.shipping}
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </Box>
            <AlertDialog
              isOpen={isOpen}
              leastDestructiveRef={cancelRef}
              onClose={onClose}
              size="3xl"
            >
              <AlertDialogOverlay>
                <AlertDialogContent w="1000">
                  <Image
                    objectFit="cover"
                    src={product.image.url}
                    alt="Segun Adebayo"
                  />
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>
          </Box>
        </Flex>
      </Box>
    </>
  )
}
