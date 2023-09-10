import {ApiDocs} from '../pages/api-docs'
import {GettingStarted} from '../pages/getting-started'
import {HorizantalPanes} from '../pages/horizantal-panes'
import {VerticalPanes} from '../pages/vertical-pane'

export const ROUTER_LIST_LEVEL_1 = [
  {active: true, label: 'Getting Started', path: 'getting-started', component: GettingStarted},
  {active: false, label: 'Vertical Panes', path: 'vertical-panes', component: VerticalPanes},
  {active: false, label: 'Horizontal Panes', path: 'horizontal-panes', component: HorizantalPanes},
  {active: false, label: 'Min & Max Sizes', path: 'min-n-max', component: HorizantalPanes},
  {active: false, label: 'Nested Panes', path: 'nested-panes'},
  {active: false, label: 'Props Description', path: 'props-docs', component: ApiDocs},
  {active: false, label: 'Events Description', path: 'event-docs', component: ApiDocs},
  {active: false, label: 'Api Description', path: 'api-docs', component: ApiDocs},
  {active: false, label: 'Dev', path: 'dev', component: null},
  {active: false, label: 'Demo', path: 'demo'}

]
