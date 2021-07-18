import { 
  Heading,
  Center,
  Stack,
  Text,
  VStack,
  Image,
  Badge

} from "@chakra-ui/react"
import { useRouter } from "next/router"

type category = { name: string }

interface ProductProps {
  id: number
  name: string
  state: string
  imageUrl: string
  categories: category[]
  price: number
}

export const Product: React.FC<ProductProps> = (data : ProductProps) => {

  const router = useRouter()

  return (
    <Center 
    as="button"
    p='20px'
    key={data.id}
    transition="0.5s"
    onClick={() => router.push(`/product/${data.name}`)}
    _hover={{
      boxShadow: '2xl',
      borderRadius: '25px'
    }}
    >
      <VStack pt={10} align={'center'}>
      <Badge variant="subtle" colorScheme="green">
      {data.state}
      </Badge>
      <Image
        boxSize="300px"
        objectFit="cover"
        src={data.imageUrl}
        alt="Segun Adebayo"
      />

      <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
        {data.categories[0].name}
      </Text>
      <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
        {data.name}
      </Heading>
      <Stack direction={'row'} align={'center'} />
        <Text fontWeight={800} fontSize={'xl'}>
          {data.price} €
        </Text>
        {/* <Text textDecoration={'line-through'} color={'gray.600'}>
          $199
        </Text> */}
    </VStack>
  </Center>
  )
}