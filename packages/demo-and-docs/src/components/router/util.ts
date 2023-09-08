import {ApiDocs} from '../../pages/api-docs'
import {HorizantalPanes} from '../../pages/horizantal-panes'
import {NestedPanes} from '../../pages/nested-panes'
import {VerticalPanes} from '../../pages/vertical-pane'

export const routerComponentSelector = (path: string): any => {
  switch (path) {
    case 'api-docs':
      return ApiDocs
    case 'horizontal-panes':
      return HorizantalPanes
    case 'vertical-panes':
      return VerticalPanes
    case 'nested-panes':
      return NestedPanes
  }
}
