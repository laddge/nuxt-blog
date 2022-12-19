<template>
  <div>
    <Header />
    <div class="container">
      <div class="bg-light rounded p-4">
        <p class="fs-1 fw-bold mt-4 text-center">
          <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
          Search
        </p>
        <div class="input-group mt-4">
          <input v-model="query.q" class="form-control shadow-none" placeholder="キーワード">
          <select v-model="query.category" class="form-select flex-grow-0 shadow-none" style="width: 9rem;">
            <option value="" selected>
              カテゴリー
            </option>
            <option v-for="cat in categories" :key="cat">
              {{ cat }}
            </option>
          </select>
        </div>
        <div v-if="tags.length != 0" class="border-top border-2 mt-4 pt-3">
          <p>タグ:</p>
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
      <PostsList :posts="posts" />
    </div>
    <Footer />
  </div>
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
  head () {
    return {
      title: 'Search',
      meta: [
        {
          name: 'description',
          content: 'Linux大好き高校生'
        }
      ]
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
    for (const post of posts) {
      if (post.category) {
        this.categories.push(post.category)
      } else {
        uncategorized = true
      }
      if (post.tags) {
        for (const tag of post.tags) {
          this.tags.push(tag)
        }
      }
    }
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
