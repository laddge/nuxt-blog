<template>
  <div>
    <Header />
    <div class="container">
      <div class="noscript">
        <Note color="danger">
          検索機能を使用するには、JavaScriptを有効にしてください。
        </Note>
      </div>
      <div class="withscript mx-3 mb-4">
        <label class="input-icon-label border rounded-pill row align-items-center mx-2">
          <font-awesome-icon :icon="['fas', 'magnifying-glass']" class="col-auto fs-5 text-secondary" />
          <input v-model="query.q" class="form-control shadow-none border-0 fs-5 ps-0 py-1 col" placeholder="検索" style="background-color: transparent;">
        </label>
        <div v-if="categories.length + tags.length != 0" class="border-top border-bottom mt-4 px-2 py-3">
          <div v-if="categories.length != 0">
            <div class="mb-2">
              カテゴリー:
            </div>
            <div style="display: flex; flex-wrap: wrap;">
              <div class="form-check">
                <label class="form-check-label mx-3">
                  <input
                    v-model="query.category"
                    type="radio"
                    class="form-check-input shadow-none"
                    name="category"
                    value=""
                    checked
                  >
                  未選択
                </label>
                <label v-for="cat in categories" :key="cat" class="form-check-label mx-3">
                  <input v-model="query.category" type="radio" class="form-check-input shadow-none" name="category" :value="cat">
                  {{ cat }}
                </label>
              </div>
            </div>
          </div>
          <div v-if="tags.length != 0" class="mt-3">
            <div class="mb-2">
              タグ:
            </div>
            <div style="display: flex; flex-wrap: wrap;">
              <div v-for="tag in tags" :key="tag" class="mx-3 form-check">
                <label class="form-check-label">
                  <input v-model="query.tags" type="checkbox" :value="tag" class="form-check-input shadow-none">
                  {{ tag }}
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="my-3 ms-2">
          ヒット数: {{ posts.length }}
        </div>
      </div>
      <PostsList :posts="posts" />
    </div>
    <Footer />
  </div>
</template>

<script>
export default {

  async asyncData ({ $content }) {
    const posts = await $content('post').sortBy('createdAt', 'desc').fetch()
    let categories = []
    let tags = []
    let uncategorized = false
    for (const post of posts) {
      if (post.category) {
        categories.push(post.category)
      } else {
        uncategorized = true
      }
      if (post.tags) {
        for (const tag of post.tags) {
          tags.push(tag)
        }
      }
    }
    if (uncategorized) {
      categories.push('未分類')
    }
    categories = [...new Set(categories)]
    tags = [...new Set(tags)]
    return {
      allPosts: [],
      posts,
      categories,
      tags,
      query: {},
      lock: false
    }
  },

  head () {
    return {
      title: 'Search',
      meta: [
        { hid: 'description', name: 'description', content: 'ブログ内を検索する' },
        { hid: 'og:title', property: 'og:title', content: 'Search - Laddge\'s Blog' },
        { hid: 'og:url', property: 'og:url', content: this.$config.baseUrl + '/search' },
        { hid: 'og:description', property: 'og:description', content: 'ブログ内を検索する' }
      ]
    }
  },

  watch: {
    query: {
      handler (query) {
        if (!this.lock) {
          const newQuery = {}
          for (const key of Object.keys(query)) {
            if (query[key]) {
              newQuery[key] = query[key]
            }
          }
          this.$router.replace({ query: newQuery })
        }
      },
      deep: true
    }
  },

  async mounted () {
    await this.render()
    this.$watch(
      () => this.$route.query,
      async (toParams, previousParams) => {
        this.lock = true
        await this.render()
        this.lock = false
      }
    )
  },

  methods: {
    async render () {
      let category = this.$route.query.category
      if (!this.categories.includes(category)) {
        category = ''
      }
      let tags = this.$route.query.tags
      if (!tags) {
        tags = []
      } else if (typeof tags === 'string') {
        tags = [tags]
      }
      this.query = {
        q: this.$route.query.q,
        category,
        tags
      }
      let posts = await this.$content('post').search(this.$route.query.q).sortBy('createdAt', 'desc').fetch()
      for (const post of posts) {
        if (!post.category) {
          post.category = '未分類'
        }
      }
      if (this.query.category) {
        posts = posts.filter(post => post.category === this.query.category)
      }
      if (this.query.tags.length !== 0) {
        posts = posts.filter(post => post.tags)
        for (const tag of this.query.tags) {
          posts = posts.filter(post => post.tags.includes(tag))
        }
      }
      this.posts = posts
    }
  }
}
</script>

<style scoped>
.input-icon-label:focus-within {
  border-color: var(--bs-primary)!important;
}
</style>
