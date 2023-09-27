import {LiveDemo} from '../../pages/LiveDemo'
import {ApiDocs} from '../../pages/api-docs'
import {CustomResizer} from '../../pages/custom-resizer'
import {FullScreenModes} from '../../pages/full-screen-modes'
import {GettingStarted} from '../../pages/getting-started'
import {HideShowPanes} from '../../pages/hide-show-panes'
import {HorizantalPanes} from '../../pages/horizontal-panes'
import {NestedPanes} from '../../pages/nested-panes'
import {PanesMinMax} from '../../pages/panes-min-max'
import {PropsDescription} from '../../pages/props-description/props-description'
import {VerticalPanes} from '../../pages/vertical-pane'

// eslint-disable-next-line complexity
export const routerComponentSelector = (path: string): any => {
  switch (path) {
    case 'getting-started':
      return GettingStarted
    case 'live-demo':
      return LiveDemo
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
    case 'props-docs':
      return PropsDescription
    case 'min-n-max':
      return PanesMinMax
    case 'full-screen-modes':
      return FullScreenModes
  }
}
