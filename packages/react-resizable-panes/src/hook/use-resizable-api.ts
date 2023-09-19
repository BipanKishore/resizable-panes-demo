import {useEffect} from 'react'
import {closeFullSizeFn, restoreDefaultFn, setVisibilityFn, toFullPageFn, toFullSizeFn} from '../utils/api'
import {IKeyToBoolMap} from '../@types'
import {createMap} from '../utils/util'

export const useResizableApi = (context: any, props: any) => {
  const {contextDetails} = context
  // ---------------------------------  API -------------------------------------------- //
  const {onReady, onChangeVisibility} = props
  const toFullPage = (paneId: string) => {
    toFullPageFn(contextDetails.panesList, paneId)
  }

  const toFullSize = (paneId: string) => {
    toFullSizeFn(contextDetails, paneId)
  }

  const closeFullSize = () => {
    closeFullSizeFn(contextDetails)
  }

  const restoreDefault = () => {
    restoreDefaultFn(contextDetails)
  }

  const setVisibility = (param: IKeyToBoolMap) => {
    setVisibilityFn(contextDetails, param)
    const visibilityMap = createMap(contextDetails.panesList, 'visibility')
    onChangeVisibility(visibilityMap)
  }

  // ---------------------------------  API --------------------------------------------//

  useEffect(() => {
    const api = {
      toFullSize,
      closeFullSize,
      restoreDefault,
      toFullPage,
      setVisibility
    }

    onReady(api)
  }, [context])
}
