import {APP_NAME} from '../constant'

const getKeyName = (key: string) => `${APP_NAME}-${key}`

export const storageSetItem = (storage: any, key: string, value: any) => {
  if (storage) {
    storage.setItem(getKeyName(key), JSON.stringify(value))
  }
}

export const storageGetItem = (storage: any, key: string) => {
  if (storage) {
    const stringifyValue = storage.getItem(getKeyName(key))
    const value = JSON.parse(stringifyValue)
    return value
  }
}
