import {ApiDocs} from '../pages/api-docs'
import {HorizantalPanes} from '../pages/horizantal-panes'
import {VerticalPanes} from '../pages/vertical-pane'

export const ROUTER_LIST_LEVEL_1 = [
  {active: true, label: 'Vertical Panes', path: 'vertical-panes', component: VerticalPanes},
  {active: false, label: 'Horizontal Panes', path: 'horizontal-panes', component: HorizantalPanes},
  {active: false, label: 'Nested Panes', path: 'nested-panes'},
  {active: false, label: 'Api Doc', path: 'api-docs', component: ApiDocs},
  {active: false, label: 'Dev', path: 'dev', component: null}

]
