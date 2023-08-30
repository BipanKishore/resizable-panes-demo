

export  interface IInitPaneService {
    children: any[],
    containerRef: any,
    panesRefs: any[],
    resizerSize: number
}

export interface IPanesVisibility{
    [key: string]: string
}