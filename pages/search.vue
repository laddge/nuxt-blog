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
            <input class="input" placeholder="キーワード" v-model="query.q">
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
      posts: [],
      categories: [],
      query: {
        q: this.$route.query.q,
        category: this.$route.query.category
      }
    }
  },

  methods: {
    async render () {
      let posts = await this.$content('post').search(this.$route.query.q).sortBy('createdAt', 'desc').fetch()
      posts.forEach((post, i, arr) => {
        if (!post.category) {
          arr[i].category = '未分類'
        }
      })
      if (this.query.category) {
        posts = posts.filter(post => post.category === this.query.category)
      }
      this.posts = posts
      console.log(this.posts)
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
    })
    if (uncategorized) {
      this.categories.push('未分類')
    }
    this.categories = [...new Set(this.categories)]
    if (!this.categories.includes(this.query.category)) {
      this.query.category = ''
    }
    await this.render()
  },

  watch: {
    query: {
      async handler (query) {
        this.$router.replace({ query })
        await this.render()
      },
      deep: true
    }
  }
}
</script>
