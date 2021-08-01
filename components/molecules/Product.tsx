import {
  Heading,
  Center,
  Stack,
  Text,
  VStack,
  Image,
  Badge,
  Button,
  useColorModeValue,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import { IProduct } from '../../types'

type category = { name: string }

interface ProductProps {
  product: IProduct
  isInHomePage?: boolean
}

export const Product: React.FC<ProductProps> = ({product, isInHomePage}: ProductProps) => {
  const router = useRouter()
  const {hex} = product.state.colorStatus
  const navButton = useColorModeValue("black", "black")

  return (
    <Center
      as="button"
      p="20px"
      backgroundColor="white"
      key={product.id}
      transition="0.5s"
      borderRadius="25px"
      onClick={() => router.push(`/product/${product.name}`)}
      _hover={{
        boxShadow: '2xl',
        borderRadius: '25px',
        cursor: 'pointer',
      }}
    >
      <VStack align={'center'}>
        {!isInHomePage ?
          (
            <Badge variant="subtle" backgroundColor={hex}>
              {product.state.name}
            </Badge>
          ) :  
            <Badge ml="1" fontSize="1.1em" color={navButton}>
             Nouveau !
            </Badge>  
        }
        <Image
          boxSize="300px"
          objectFit="cover"
          src={product.image.url}
          alt="Segun Adebayo"
        />

        <Text color="black" fontSize={'sm'} textTransform={'uppercase'}>
          {product.categories[0].name}
        </Text>
        <Heading color="black" fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
          {product.name}
        </Heading>
        <Stack direction={'row'} align={'center'} />
        <Text fontWeight={800} fontSize={'xl'} color="black">
          {product.price} €
        </Text>
      </VStack>
    </Center>
  )
}
