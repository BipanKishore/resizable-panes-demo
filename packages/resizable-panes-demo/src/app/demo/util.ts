export const PANE1_IDS = {
  pane1: 'pane1-pane1',
  pane2: 'pane1-pane2'
}

export const PANE3_IDS = {
  pane1: 'pane3-pane1',
  pane2: 'pane3-pane2'
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
  pane1: true,
  pane2: true,
  pane3: true
}

export const PANES_LIST = [
  {
    id: 'pane1',
    label: 'First pane'
  },
  {
    id: 'pane2',
    label: 'Second Pane'
  },
  {
    id: 'pane3',
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
