import React from 'react'
import {AwaitActivity, Await} from '@simpli/react-native-await'
import {StyleSheet, View, Text, Button} from 'react-native'

export default function App() {
  const fakeRequest = () => new Promise((resolve) => setTimeout(resolve, 3000))

  const populate = async () => {
    // Loading starts here
    await Await.run('myRequestName', fakeRequest)
    // Loading ends after 3 seconds
  }

  populate()

  return (
    <View style={styles.container}>
      <AwaitActivity name={'myRequestName'}>
        <Text>To be shown after loading</Text>
        <Button title={'Try Again'} onPress={populate} />
      </AwaitActivity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
