const updateTag = (tagName: string, keyName: string, keyValue: string, attrName: string, attrValue: string): void => {
  const node = document.head.querySelector(`${tagName}[${keyName}="${keyValue}"]`)
  if (node && node.getAttribute(attrName) === attrValue) {
    return
  }

  if (node) {
    node.parentNode.removeChild(node)
  }
  if (typeof attrValue === 'string') {
    const nextNode = document.createElement(tagName)
    nextNode.setAttribute(keyName, keyValue)
    nextNode.setAttribute(attrName, attrValue)
    document.head.appendChild(nextNode)
  }
}

const updateMeta = (name: string, content: string): void => {
  updateTag('meta', 'name', name, 'content', content)
}

const updateCustomMeta = (property: string, content: string): void => {
  updateTag('meta', 'property', property, 'content', content)
}

const updateLink = (rel: string, href: string): void => {
  updateTag('link', 'rel', rel, 'href', href)
}

export { updateCustomMeta, updateLink, updateMeta, updateTag }
