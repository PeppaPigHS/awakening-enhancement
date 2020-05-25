import React from 'react'

import { Box } from '@chakra-ui/core'

const Card = ({ children, ...rest }) => {
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

export default Card
