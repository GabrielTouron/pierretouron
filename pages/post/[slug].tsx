import { Heading } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'

export default function Post(): ReactElement {
  const router = useRouter()

  return (
    <>
      <Heading>Post {router.query.slug}</Heading>
    </>
  )
}
