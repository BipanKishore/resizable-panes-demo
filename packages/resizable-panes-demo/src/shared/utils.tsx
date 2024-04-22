
export interface IJoinClassNameParam {
    [key : string]: boolean | string
  }

export const joinClassName = (param: IJoinClassNameParam, notRequired: boolean | any = false) => {
  if (notRequired) {
    return ''
  }
  const keys = Object.keys(param)
  return keys.map((key) => param[key] ? key : '').join(' ')
}




export const getLocalStorage = () => {
  if (typeof window !== 'undefined') {
    localStorage
  }
}


export const contentContainerId = 'content'
export const sideMenuContainerId = 'side-menu'

export const opacity = 'opacity'
export const fixed = 'fixed'
export const display = 'display'
export const position = 'position'
export const _static = 'static'
export const none = 'none'
export const block = 'block'

export const getElementById = (...ids: string[]) => ids.map((id) => document.getElementById(id))
export const setStyle = (element: HTMLElement, key: string, value: any) => element.style.setProperty(key, value)

export const hideSideMenu = () => {
  const [content, sideMenu] = getElementById(contentContainerId, sideMenuContainerId)
  setStyle(content as HTMLElement, opacity, '1')
  setStyle(sideMenu as HTMLElement, position, _static)
  setStyle(sideMenu as HTMLElement, display, none)
}


export const showSideMenu = () => {
  const [content, sideMenu] = getElementById(contentContainerId, sideMenuContainerId)
  setStyle(content as HTMLElement, opacity, '0.02')
  setStyle(sideMenu as HTMLElement, position, fixed)
  setStyle(sideMenu as HTMLElement, display, block)
}

export const toggleSideMenu = () => {

  const [sideMenu] = getElementById( sideMenuContainerId)
  if(sideMenu?.style.position !== fixed){
    showSideMenu()
  }else {
    hideSideMenu()
  }
}