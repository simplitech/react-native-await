import PropTypes from 'prop-types'
import React, {useEffect, useState} from 'react'
import {ActivityIndicator, ActivityIndicatorProps, View} from 'react-native'
import {AwaitState, AwaitWrapper} from './AwaitWrapper'
import {Await as defaultAwaitInstance} from './index'

interface Props extends ActivityIndicatorProps {
  name: string
  awaitInstance?: AwaitWrapper
  onLoadingStart?: () => void
  onLoadingEnd?: () => void
  onError?: () => void
  children?: React.ReactElement | React.ReactElement[]
  defaultView?: React.ReactElement
  loadingView?: React.ReactElement
  errorView?: React.ReactElement
}

const AwaitActivity: React.FC<Props> = (props) => {
  const [state, setState] = useState<AwaitState>(AwaitState.DEFAULT)

  useEffect(() => {
    const await = props.awaitInstance ?? defaultAwaitInstance

    const toggleEvent = (
      name?: string,
      newState: AwaitState = AwaitState.DEFAULT
    ) => {
      if (name === props.name) {
        setState(newState)

        switch (newState) {
          case AwaitState.DEFAULT:
            if (props.onLoadingEnd) props.onLoadingEnd()
            break
          case AwaitState.LOADING:
            if (props.onLoadingStart) props.onLoadingStart()
            break
          case AwaitState.ERROR:
            if (props.onError) props.onError()
            break
        }
      }
    }

    const inAction = () => {
      return Boolean(props.name && await.inAction(props.name))
    }

    if (inAction()) {
      setState(AwaitState.LOADING)
    }

    await.event.on('toggle', toggleEvent)

    return () => {
      // Remove current listener when this component unmount
      await.event.off('toggle', toggleEvent)
    }
  }, [props])

  if (state === AwaitState.LOADING) {
    const activityProps: Props = {...props}
    delete activityProps.name
    delete activityProps.awaitInstance
    delete activityProps.onLoadingStart
    delete activityProps.onLoadingEnd
    delete activityProps.onError
    delete activityProps.children
    delete activityProps.defaultView
    delete activityProps.loadingView
    delete activityProps.errorView

    return props.loadingView ?? <ActivityIndicator {...activityProps} />
  }

  if (state === AwaitState.ERROR) {
    return (
      props.errorView ??
      props.defaultView ??
      (props.children as React.ReactElement) ?? <View />
    )
  }

  return props.defaultView ?? (props.children as React.ReactElement) ?? <View />
}

AwaitActivity.propTypes = {
  name: PropTypes.string.isRequired,
  awaitInstance: PropTypes.instanceOf(AwaitWrapper),
  onLoadingStart: PropTypes.func,
  onLoadingEnd: PropTypes.func,
  onError: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element.isRequired),
  ]),
  defaultView: PropTypes.element,
  loadingView: PropTypes.element,
  errorView: PropTypes.element,
}

export default AwaitActivity
