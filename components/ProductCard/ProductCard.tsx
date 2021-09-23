import {
  Heading,
  Center,
  Stack,
  Text,
  VStack,
  Badge,
  useColorModeValue,
  Flex,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import { Product } from '../../domain/product'
import { CircleIcon } from '../../icons/circle'
import { ProductImage } from '../ProductImage/ProductImage'

interface ProductCardProps {
  product: Product
  isInHomePage?: boolean
}

export const ProductCard: React.FC<ProductCardProps> = ({product, isInHomePage}: ProductCardProps) => {
  const router = useRouter()
  const { hex } = product.state.colorStatus
  const navButton = useColorModeValue("black", "black")

  return (
    <Center
      as="button"
      p="20px"
      backgroundColor="white"
      key={product.id}
      transition="0.5s"
      onClick={() => router.push(`/product/${product.name}`)}
      layerStyle="hoverBase"
    >
      <VStack align='center'>
        {!isInHomePage ?
          (
            <Flex>
              <Badge variant="subtle" marginRight="2" color={navButton}>
                {product.state.name}
              </Badge>
              <CircleIcon boxSize={4} color={hex}  />
            </Flex>

          ) :  
            <Badge ml="1" fontSize="1.1em" color={navButton}>
             Nouveau !
            </Badge>
  
        }
        <ProductImage
          boxSize="300px"
          src={product.image.url}
          alt="Segun Adebayo"
        />

        <Text color="black" fontSize='sm' textTransform='uppercase'>
          {product.categories[0].name}
        </Text>
        <Heading color="black" fontSize='2xl' fontFamily='body' fontWeight={500}>
          {product.name}
        </Heading>
        <Stack direction='row' align='center' />
        <Text fontWeight={800} fontSize='xl' color="black">
          {product.price} €
        </Text>
      </VStack>
    </Center>
  )
}
