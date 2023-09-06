import {ApiDocs} from '../../pages/api-docs'

export const routerComponentSelector = (path: string): any => {
  switch (path) {
    case 'ApiDocs':
      return ApiDocs
  }
}
