"use client"


import MarkdownPreview from '@uiw/react-markdown-preview'

interface IMdPreview {
    source: string,
    className: string
}

export const MdPreview = (props: IMdPreview) => {
    const {source, className} = props
    return (
        <MarkdownPreview className={className} source={source} />
    )
}