import React from 'react'

import { Flex, Switch } from '@chakra-ui/core'
import { useGlobalState, useGlobalDispatch } from './Context'

import { Option } from './Utils'

const Configuration = () => {
  const state = useGlobalState()
  const dispatch = useGlobalDispatch()

  const updateValkType = (value: boolean, valkType: number) => {
    dispatch({
      type: 'SET_VALKTYPE',
      payload: value ? valkType : 0,
    })
  }

  const updateScroll = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'SET_USERESTORE',
      payload: e.target.checked,
    })
  }

  return (
    <Flex
      width="100%"
      align="center"
      justify="space-between"
      wrap="wrap"
      mt={2}
    >
      <Option image="/valk_10.png" desc="Use Advice of Valks 10%">
        <Switch
          color="teal"
          isChecked={state.valkType == 1}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            updateValkType(e.target.checked, 1)
          }}
        />
      </Option>
      <Option image="/valk_50.png" desc="Use Advice of Valks 50%">
        <Switch
          color="teal"
          isChecked={state.valkType == 2}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            updateValkType(e.target.checked, 2)
          }}
        />
      </Option>
      <Option image="/restore_scroll.png" desc="Use Restoration Scroll">
        <Switch
          color="teal"
          isChecked={state.useRestore}
          onChange={updateScroll}
        />
      </Option>
    </Flex>
  )
}

export default Configuration
