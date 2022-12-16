<template>
  <main class="m-3 content">
    <Header />
    <div class="container">
      <PostsList :posts="posts" />
    </div>
    <Footer />
  </main>
</template>

<script>
export default {
  async asyncData ({ $content }) {
    const posts = await $content('post').sortBy('createdAt', 'desc').fetch()
    for (const post of posts) {
      if (!post.category) {
        post.category = '未分類'
      }
    }
    return {
      posts
    }
  },

  head () {
    return {
      title: 'Home',
      meta: [
        {
          hid: 'description',
          property: 'description',
          content: 'Linux大好き高校生'
        }
      ]
    }
  }
}
</script>
