<template>
  <div>
    <div class="bg-primary-light">
      <Header />
      <div class="mt-4 px-4 py-5 text-center">
        <img src="https://res.cloudinary.com/laddge/image/upload/v1674993750/laddge.net/laddge_vector.svg" width="64" height="64" alt="profile image" class="d-block mx-auto mb-4 rounded">
        <h1 class="display-5 fw-bold mb-3">
          Hi, I'm Laddge.
        </h1>
        <div class="col-lg-6 mx-auto">
          <p class="lead fw-normal mb-4">
            コードを書いたりパソコンをいじったりが好きな学生です。<br>
            日常の出来事や趣味のことなどをを投稿していきます。
          </p>
          <nuxt-link to="/about">
            <div class="btn btn-primary-light btn-lg px-4">
              About me
            </div>
          </nuxt-link>
        </div>
      </div>
    </div>
    <div class="bg-primary-light pt-4">
      <div class="px-3 py-3 top-rounded bg-white">
        <h2 class="fs-3 text-center mb-4">
          最近の投稿
        </h2>
        <PostsList :posts="posts" />
        <div class="text-center">
          <nuxt-link to="/search">
            <div class="btn btn-primary-light">
              もっと見る
            </div>
          </nuxt-link>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
export default {
  async asyncData ({ $content }) {
    const posts = await $content('post').sortBy('createdAt', 'desc').limit(3).fetch()
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
      link: [{ rel: 'preload', as: 'image', href: 'https://res.cloudinary.com/laddge/image/upload/v1674993750/laddge.net/laddge_vector.svg' }]
    }
  }
}
</script>

<style scoped>
.top-rounded {
  border-radius: 2rem 2rem 0 0;
}
</style>
