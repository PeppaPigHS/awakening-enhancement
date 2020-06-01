import React, { useCallback } from 'react'

import { List, ListItem, ListIcon, Flex, Text } from '@chakra-ui/core'

import { useGlobalState } from './Context'

const History = (props) => {
  const state = useGlobalState()

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

  return <HistoryList {...props} />
}

export default History
