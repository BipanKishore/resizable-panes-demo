export interface IInitPaneService {
    children: any[],
    containerRef: any,
    panesRefs: any[],
    resizerSize: number,
    isVertical: boolean
}

export interface IPanesVisibility{
    [key: string]: string
}
