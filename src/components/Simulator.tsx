import React, { useState, useEffect } from 'react'

import { Flex, Text, Button, Select, Switch, Divider } from '@chakra-ui/core'

import { Card } from './Card'

interface IState {
  level: number
  valkAdvice: number
  restore: boolean
  stoneCount: number
  restoreCount: number
  enhanceList: string[]
  selectedLevel: string
}

const chance: number[] = [75, 60, 40, 20, 10, 5, 2.5, 1.25, 0.625, 0.3125]
const valkRate: number[] = [1, 1.1, 1.5]
const displayLevel: string[] = [
  '+40',
  'I',
  'II',
  'III',
  'IV',
  'V',
  'VI',
  'VII',
  'VIII',
  'IX',
  'X',
]

const initialState: IState = {
  level: 0,
  valkAdvice: 0,
  restore: false,
  stoneCount: 0,
  restoreCount: 0,
  enhanceList: displayLevel.slice(1, displayLevel.length),
  selectedLevel: null,
}

export const Simulator = () => {
  const [state, setState] = useState<IState>(initialState)
  const [checked, setChecked] = useState<boolean[]>([false, false])

  const flipCoin = (rate: number) => {
    if (Math.random() * 100 <= rate) return true
    return false
  }

  const getSuccessRate = () => {
    return Math.min(100, chance[state.level] * valkRate[state.valkAdvice])
  }

  const getEnhancement = (init: IState) => {
    let currentState: IState = Object.assign({}, init, {})
    ++currentState.stoneCount
    if (
      flipCoin(
        Math.min(
          100,
          chance[currentState.level] * valkRate[currentState.valkAdvice]
        )
      )
    ) {
      ++currentState.level
    } else {
      if (currentState.restore) {
        currentState.restoreCount += 200
        if (flipCoin(50)) return currentState
      }
      if (currentState.level > 0) --currentState.level
    }
    return currentState
  }

  const enhance = () => {
    setState(getEnhancement(state))
  }

  const updateSelectedLevel = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setState({ ...state, selectedLevel: e.target.value })
  }

  const massEnhance = () => {
    if (!state.selectedLevel) return
    let currentState: IState = Object.assign({}, state, {})
    while (currentState.selectedLevel != displayLevel[currentState.level]) {
      currentState = Object.assign({}, getEnhancement(currentState), {})
    }
    setState(currentState)
  }

  const resetState = () => {
    setState(initialState)
    setChecked([false, false])
  }

  const updateScroll = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, restore: e.target.checked })
  }

  const updateValk = (value: boolean, type: number) => {
    if (type == 1) setChecked([value, false])
    else setChecked([false, value])
    setState({ ...state, valkAdvice: value ? type : 0 })
  }

  useEffect(() => {
    setState({
      ...state,
      enhanceList: displayLevel.slice(state.level + 1, displayLevel.length + 1),
    })
  }, [state.level])

  if (!state) return <React.Fragment></React.Fragment>

  return (
    <Flex width="100%" direction="column" align="center">
      <Card width={['100%', 3 / 4, 1 / 2]} mt={4}>
        <Text mb={4} fontSize="2xl">
          Current Level: {displayLevel[state.level]}
        </Text>
        <img src="/pristine_crystal.png" />
        <Text fontSize="xl" mt={4}>
          Chance of success: {getSuccessRate()}%
        </Text>
        <Button variantColor="teal" w="100%" mt={4} onClick={enhance}>
          Enhance
        </Button>
        <Flex w="100%" mt={4} direction="row">
          <Button
            mr={4}
            w={['100%', 1 / 2]}
            variantColor="teal"
            onClick={massEnhance}
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
        <Flex
          width="100%"
          direction="row"
          align="center"
          justify="space-between"
          wrap="wrap"
          mt={2}
        >
          <Flex align="center" m={2} justify="space-between">
            <img src="/valk_10.png" width="32px" height="32px" />
            <Text ml={4} mr={4}>
              Use Advice of Valks 10%
            </Text>
            <Switch
              color="teal"
              isChecked={checked[0]}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                updateValk(e.target.checked, 1)
              }}
            />
          </Flex>
          <Flex align="center" m={2} justify="space-between">
            <img src="/valk_50.png" width="32px" height="32px" />
            <Text ml={4} mr={4}>
              Use Advice of Valks 50%
            </Text>
            <Switch
              color="teal"
              isChecked={checked[1]}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                updateValk(e.target.checked, 2)
              }}
            />
          </Flex>
          <Flex align="center" m={2} justify="space-between">
            <img src="/restore_scroll.png" width="32px" height="32px" />
            <Text ml={4} mr={4}>
              Use Restoration Scroll
            </Text>
            <Switch
              color="teal"
              isChecked={state.restore}
              onChange={updateScroll}
            />
          </Flex>
        </Flex>
        <Divider width="95%" />
        <Flex wrap="wrap" width="100%" direction="row" justify="space-around">
          <Text m={2}>Pristine Crystal(s) used: {state.stoneCount}</Text>
          <Text m={2}>Restore Scroll(s) used: {state.restoreCount}</Text>
        </Flex>
        <Divider width="95%" />
        <Button variantColor="teal" w="100%" mt={4} onClick={resetState}>
          Reset
        </Button>
      </Card>
    </Flex>
  )
}
