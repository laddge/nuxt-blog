<template>
  <main class="m-3 content">
    <Header />
    <div class="container">
      <div class="notification p-5">
        <p class="title mt-5 has-text-centered">
          <span class="icon-text">
            <span class="icon">
              <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
            </span>
            <span>Search</span>
          </span>
        </p>
        <div class="field has-addons">
          <p class="control is-expanded">
            <input v-model="query.q" class="input" placeholder="キーワード">
          </p>
          <p class="control">
            <span class="select">
              <select v-model="query.category">
                <option value="" selected>カテゴリー</option>
                <option v-for="cat in categories" :key="cat">{{ cat }}</option>
              </select>
            </span>
          </p>
        </div>
        <div v-if="tags.length != 0">
          <hr class="has-background-grey-light">
          <p>タグ:</p>
          <div style="display: flex; flex-wrap: wrap;">
            <div v-for="tag in tags" :key="tag" class="mx-3">
              <label>
                <input v-model="query.tags" type="checkbox" :value="tag">
                {{ tag }}
              </label>
            </div>
          </div>
        </div>
      </div>
      <PostsList :posts="posts" />
    </div>
    <Footer />
  </main>
</template>

<script>
export default {
  data () {
    return {
      allPosts: [],
      posts: [],
      categories: [],
      tags: [],
      query: {},
      lock: false
    }
  },

  watch: {
    query: {
      handler (query) {
        if (!this.lock) {
          this.$router.replace({ query })
        }
      },
      deep: true
    }
  },

  async mounted () {
    const posts = await this.$content('post').sortBy('createdAt', 'desc').fetch()
    let uncategorized = false
    posts.forEach((post) => {
      if (post.category) {
        this.categories.push(post.category)
      } else {
        uncategorized = true
      }
      if (post.tags) {
        post.tags.forEach((tag) => {
          this.tags.push(tag)
        })
      }
    })
    if (uncategorized) {
      this.categories.push('未分類')
    }
    this.categories = [...new Set(this.categories)]
    this.tags = [...new Set(this.tags)]
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
      posts.forEach((post, i, arr) => {
        if (!post.category) {
          arr[i].category = '未分類'
        }
      })
      if (this.query.category) {
        posts = posts.filter(post => post.category === this.query.category)
      }
      if (this.query.tags.length !== 0) {
        posts = posts.filter(post => post.tags)
        this.query.tags.forEach((tag) => {
          posts = posts.filter(post => post.tags.includes(tag))
        })
      }
      this.posts = posts
    }
  }
}
</script>
