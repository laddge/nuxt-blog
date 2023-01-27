const visit = require('unist-util-visit')
const target = ['img', 'video', 'audio', 'iframe']

module.exports = () => {
  return (tree) => {
    visit(tree, 'element', (el) => {
      if (!target.includes(el.tagName)) {
        return
      }
      el.properties = {
        ...(el.properties || {}),
        loading: 'lazy'
      }
    })
    return tree
  }
}
