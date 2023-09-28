import {ApiDocs} from '../../pages/api-docs'
import {CustomResizer} from '../../pages/custom-resizer'
import {FullScreenModes} from '../../pages/full-screen-modes'
import {GettingStarted} from '../../pages/getting-started'
import {HideShowPanes} from '../../pages/hide-show-panes'
import {HorizantalPanes} from '../../pages/horizontal-panes'
import {NestedPanes} from '../../pages/nested-panes'
import {PanesMinMax} from '../../pages/panes-min-max'
import {PanesPropsDescription} from '../../pages/props-description/panes-props-description'
import {ResizablePanesPropsDescription} from '../../pages/props-description/resizablepanes-props-description'
import {SimplePanes} from '../../pages/simple-panes'
import {StorePanesSize} from '../../pages/store-panes-size'
import {VerticalPanes} from '../../pages/vertical-pane'

// eslint-disable-next-line complexity
export const routerComponentSelector = (path: string): any => {
  switch (path) {
    case 'getting-started':
      return GettingStarted
    case 'simple-panes':
      return SimplePanes
    case 'api-docs':
      return ApiDocs
    case 'horizontal-panes':
      return HorizantalPanes
    case 'vertical-panes':
      return VerticalPanes
    case 'custom-resizer':
      return CustomResizer
    case 'nested-panes':
      return NestedPanes
    case 'show-n-hide':
      return HideShowPanes
    case 'resizable-panes-props':
      return ResizablePanesPropsDescription
    case 'pane-props':
      return PanesPropsDescription
    case 'min-n-max':
      return PanesMinMax
    case 'full-screen-modes':
      return FullScreenModes
    case 'store-panes-size':
      return StorePanesSize
  }
}
