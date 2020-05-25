import React from 'react'

import { Button, Flex, Select, Text } from '@chakra-ui/core'

import {
  IState,
  chance,
  valkRate,
  displayLevel,
  useGlobalState,
  useGlobalDispatch,
} from './Context'

const flipCoin = (rate: number) => {
  if (Math.random() * 100 <= rate) return true
  return false
}

export const getSuccessRate = (level: number, valkType: number) => {
  return Math.min(100, chance[level] * valkRate[valkType])
}

const getEnhance = (initialState: IState) => {
  let currentState: IState = Object.assign({}, initialState, {})
  ++currentState.crystalCount
  if (flipCoin(getSuccessRate(currentState.level, currentState.valkType))) {
    ++currentState.level
  } else {
    if (currentState.useRestore) {
      currentState.restoreCount += 200
      if (flipCoin(50)) return currentState
    }
    if (currentState.level > 0) --currentState.level
  }
  return currentState
}

const Enhance = () => {
  const state = useGlobalState()
  const { dispatch } = useGlobalDispatch()

  const enhanceOnce = () => {
    dispatch({
      type: 'SET_STATE',
      payload: getEnhance(state),
    })
  }

  const enhanceUntil = () => {
    if (!state.selectedLevel) return

    let currentState: IState = Object.assign({}, state, {})
    while (displayLevel[currentState.level] != currentState.selectedLevel)
      currentState = Object.assign({}, getEnhance(currentState), {})
    dispatch({
      type: 'SET_STATE',
      payload: currentState,
    })
  }

  const updateSelectedLevel = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: 'SET_SELECTEDLEVEL',
      payload: e.target.value,
    })
  }

  return (
    <React.Fragment>
      <Button variantColor="teal" w="100%" mt={4} onClick={enhanceOnce}>
        Enhance
      </Button>
      <Flex w="100%" mt={4} direction="row">
        <Button
          mr={4}
          w={['100%', 1 / 2]}
          variantColor="teal"
          onClick={enhanceUntil}
        >
          Enhance Till
        </Button>
        <Select
          placeholder="Please select level here"
          onChange={updateSelectedLevel}
        >
          {state.enhanceList.map((value: string) => {
            return <option key={value}>{value}</option>
          })}
        </Select>
      </Flex>
      <Text color="red.500" mt={4}>
        Warning: Selecting Level IX or X might crash the website
      </Text>
    </React.Fragment>
  )
}

export default Enhance