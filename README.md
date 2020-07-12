# @simpli/react-native-await

Easy-to-use loading indicator

## Installation

```sh
npm install @simpli/react-native-await
```

## Usage

```tsx
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
```

## Alternative Usage
```tsx
// ...
const populate = async () => {
  try {
    Await.init('myRequestName')
    // Loading starts here
    await fakeRequest()
    // Loading ends after 3 seconds
    Await.done('myRequestName')
  } catch {
    Await.error('myRequestName')
  }
}
// ...
```


## Other props
```tsx
import {Text} from 'react-native'
import {AwaitActivity} from '@simpli/react-native-await'

export default function App() {
  return (
    <AwaitActivity
      name={'myRequestName'}
      onLoadingStart={() => console.log('loading start event')}
      onLoadingEnd={() => console.log('loading end event')}
      onError={() => console.log('error event')}
      loadingView={<Text>Loading...</Text>} // Custom Loading View
      errorView={<Text>Error</Text>} // Custom Error View
    >
      To be shown after loading
    </AwaitActivity>
  )
}
```

## Await Methods
```tsx
import {Await} from '@simpli/react-native-await'

// returns a boolean indicating if 'myrequestname' is loading
const isLoading = Await.inAction('myRequestName')

// initialize the loading passing the request name
Await.init('myRequestName')

// ends the loading of 'myRequestName'
Await.done('myRequestName')

// indicate an error on 'myRequestName'
Await.error('myRequestName')

// initialize the loading, process the request on the callback and then ends the loading
Await.run('myRequestName', () => {
  // your request goes here
})

```

## Using with [Serialized-Request](https://github.com/simplitech/serialized-request)
```typescript
RequestListener.onRequestStart(reqName => Await.init(reqName))
RequestListener.onRequestEnd(reqName => Await.done(reqName))
RequestListener.onRequestError(reqName => Await.error(reqName))
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
