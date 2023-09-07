import {ApiDocs} from '../../pages/api-docs'
import HorizantalPanes from '../../pages/horizantal-panes'

export const routerComponentSelector = (path: string): any => {
  switch (path) {
    case 'ApiDocs':
      return ApiDocs
    case 'horizontal-panes':
      return HorizantalPanes
  }
}
