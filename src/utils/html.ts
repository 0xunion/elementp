import {
    xssFilter
} from './xss'

export const getHtmlInnerText = (html: string) => {
    const div = document.createElement('div')
    div.innerHTML = xssFilter(html)
    let text = ''
    for (let i = 0; i < div.childNodes.length; i++) {
        const node = div.childNodes[i]
        if (node.nodeType === 3) {
            text += node.textContent
        } else {
            const child = node as HTMLElement
            if (child.tagName === 'BR') {
                text += ''
            } else {
                text += getHtmlInnerText(child.innerHTML)
            }
        }
    }

    return text
}