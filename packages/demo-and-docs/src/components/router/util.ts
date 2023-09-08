import {ApiDocs} from '../../pages/api-docs'
import {GettingStarted} from '../../pages/getting-started'
import {HorizantalPanes} from '../../pages/horizantal-panes'
import {NestedPanes} from '../../pages/nested-panes'
import {VerticalPanes} from '../../pages/vertical-pane'

// eslint-disable-next-line complexity
export const routerComponentSelector = (path: string): any => {
  switch (path) {
    case 'getting-started':
      return GettingStarted
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
