<script>
export default {
  name: 'NoScript',
  functional: true,
  render (h, { data, children }) {
    return h('noscript', data, children)
  }
}
</script>
