<template>
  <div>
    <Header />
    <div class="my-5 text-center">
      <h1 class="fw-normal">
        {{ post.title }}
      </h1>
      <p class="text-secondary fs-5 fw-light mt-3">
        {{ $dateFns.format(new Date(post.createdAt), 'MMMM dd, yyyy') }}
      </p>
      <p>
        <nuxt-link :to="'/search?category=' + post.category" class="link-reset text-secondary">
          <font-awesome-icon :icon="['far', 'folder']" />
          {{ post.category }}
        </nuxt-link>
      </p>
      <div v-if="post.tags" class="mt-1">
        <nuxt-link v-for="tag in post.tags" :key="tag" :to="'/search?tags=' + tag" class="link-reset">
          <div class="badge bg-primary-light rounded-pill text-primary-dark mx-1 fw-normal">
            {{ tag }}
          </div>
        </nuxt-link>
      </div>
    </div>
    <div class="container">
      <NuxtContent :document="post" />
    </div>
    <Footer />
  </div>
</template>

<script>
export default {
  async asyncData ({ $content, params }) {
    const post = await $content('post', params.slug).fetch()
    if (!post.category) {
      post.category = '未分類'
    }
    return {
      post
    }
  },

  head () {
    return {
      title: this.post.title,
      meta: [
        {
          hid: 'description',
          property: 'description',
          content: this.post.description ? this.post.description : 'Linux大好き高校生'
        }
      ]
    }
  }
}
</script>
