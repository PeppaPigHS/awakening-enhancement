import React, { useCallback } from 'react'

import { List, ListItem, ListIcon, Flex, Text, Switch } from '@chakra-ui/core'
import { Option } from './Utils'

import { useGlobalState, useGlobalDispatch } from './Context'

const History = (props) => {
  const state = useGlobalState()
  const dispatch = useGlobalDispatch()

  const HistoryList = useCallback(
    (props) => {
      if (state.history && state.history.length > 0) {
        return (
          <List spacing={3} w="100%" {...props}>
            {state.history.map((value: string, index: number) => {
              return (
                <ListItem key={index} w="100%">
                  <ListIcon icon="arrow-right" color="teal.500" />
                  {value}
                </ListItem>
              )
            })}
          </List>
        )
      } else return <React.Fragment />
    },
    [state.history]
  )

  const updateStoreHistory = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'SET_STOREHISTORY',
      payload: e.target.checked,
    })
  }

  return (
    <Flex direction="column" {...props}>
      <Option image="" desc="Display Enhancement History">
        <Switch
          color="teal"
          isChecked={state.storeHistory}
          onChange={updateStoreHistory}
        />
      </Option>
      <HistoryList mt={2} />
    </Flex>
  )
}

export default History
