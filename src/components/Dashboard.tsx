import React from 'react'

import { Flex, Text, Link, Divider } from '@chakra-ui/core'

import { Simulator } from './Simulator'

export const Dashboard = () => {
  return (
    <Flex direction="column" align="center">
      <Text m={4} fontSize="xl">
        Awakening Enhancement Simulator
      </Text>
      <Text mb={4}>
        by{' '}
        <Link color="teal.500" href="https://github.com/PeppaPigHS" isExternal>
          @peppapighs
        </Link>
      </Text>
      <Divider width="95%" />
      <Flex p={4} width="100%">
        <Simulator />
      </Flex>
    </Flex>
  )
}
