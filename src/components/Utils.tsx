import React from 'react'

import { Box, Flex, Text, Image } from '@chakra-ui/core'

export const Card = ({ children, ...rest }) => {
  return (
    <Box
      p={5}
      shadow="md"
      borderWidth="1px"
      {...rest}
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      {children}
    </Box>
  )
}

export const Option = ({ image, desc, children }) => {
  return (
    <Flex align="center" m={2} justify="space-between">
      {image !== '' ? <Image src={image} w={8} h={8} /> : null}
      <Text ml={4} mr={4}>
        {desc}
      </Text>
      {children}
    </Flex>
  )
}
