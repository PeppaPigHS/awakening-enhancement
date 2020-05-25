import React from 'react'

import { Flex, Text, Button, Divider } from '@chakra-ui/core'
import Card from './Card'

import { displayLevel, useGlobalState, useGlobalDispatch } from './Context'
import Enhance, { getSuccessRate } from './Enhance'
import Configuration from './Configuration'

export const Simulator = () => {
  const state = useGlobalState()
  const { dispatch } = useGlobalDispatch()

  const resetState = () => {
    dispatch({
      type: 'RESET',
    })
  }

  return (
    <Flex width="100%" direction="column" align="center">
      <Card width={['100%', 3 / 4, 1 / 2]} mt={4}>
        <Text mb={4} fontSize="2xl">
          Current Level: {displayLevel[state.level]}
        </Text>
        <img src="/pristine_crystal.png" />
        <Text fontSize="xl" mt={4}>
          Chance of success: {getSuccessRate(state.level, state.valkType)}%
        </Text>
        <Enhance />
        <Configuration />
        <Divider width="95%" />
        <Flex wrap="wrap" width="100%" direction="row" justify="space-around">
          <Text m={2}>Pristine Crystal(s) used: {state.crystalCount}</Text>
          <Text m={2}>Restoration Scroll(s) used: {state.restoreCount}</Text>
        </Flex>
        <Divider width="95%" />
        <Button variantColor="teal" w="100%" mt={4} onClick={resetState}>
          Reset
        </Button>
      </Card>
    </Flex>
  )
}
