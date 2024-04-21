export const PANE1_IDS = {
  pane1: 'P0-P0',
  pane2: 'P0-PQ'
}

export const PANE3_IDS = {
  pane1: 'P2-P0',
  pane2: 'P2-P1'
}

export const PANE1_INITIAL_VALUE = {
  [PANE1_IDS.pane1]: true,
  [PANE1_IDS.pane2]: true
}

export const PANE3_INITIAL_VALUE = {
  [PANE3_IDS.pane1]: true,
  [PANE3_IDS.pane2]: true
}

export const MAIN_PANES_INITIAL_VALUE = {
  P0: true,
  P1: true,
  P2: true
}

export const PANES_LIST = [
  {
    id: 'P0',
    label: 'First pane'
  },
  {
    id: 'P1',
    label: 'Second Pane'
  },
  {
    id: 'P2',
    label: 'Third Pane'
  }]

export const PANES_LIST_PANE1 = [
  {
    id: PANE1_IDS.pane1,
    label: 'First pane'
  },
  {
    id: PANE1_IDS.pane2,
    label: 'Second Pane'
  }
]

export const PANES_LIST_PANE3 = [
  {
    id: PANE3_IDS.pane1,
    label: 'First pane'
  },
  {
    id: PANE3_IDS.pane2,
    label: 'Second Pane'
  }
]
export const updateVisibilityMap = (setVisibilityMap: any) => (e: any) => {
  const {name, checked} = e.currentTarget
  setVisibilityMap((map: any) => ({
    ...map,
    [name]: checked
  }))
}
