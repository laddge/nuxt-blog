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
        <input class="input is-primary" placeholder="Search" v-model="query.q">
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
      posts: {},
      query: {
        q: this.$route.query.q
      }
    }
  },

  async mounted () {
    this.posts = await this.$content('post').search('title', this.$route.query.q).sortBy('createdAt', 'desc').fetch()
  },

  watch: {
    query: {
      async handler (query) {
        this.$router.replace({ query })
        this.posts = await this.$content('post').search(query.q).sortBy('createdAt', 'desc').fetch()
      },
      deep: true
    }
  }
}
</script>
