<template>
  <main class="m-3 content">
    <Header />
    <div class="my-6 has-text-centered">
      <h1 class="title has-text-weight-normal">
        {{ post.title }}
      </h1>
      <p class="subtitle has-text-grey has-text-weight-light mt-5">
        {{ $dateFns.format(new Date(post.createdAt), 'MMMM dd, yyyy') }}
      </p>
      <p>
        <nuxt-link :to="'/search?category=' + post.category">
        <span class="has-text-grey is-5 icon-text">
          <span class="icon">
            <font-awesome-icon :icon="['far', 'folder']" />
          </span>
          <span>
            {{ post.category }}
          </span>
        </span>
        </nuxt-link>
      </p>
      <div v-if="post.tags" class="mt-2">
        <div v-for="tag in post.tags" :key="tag" class="tag is-rounded is-info is-light mx-1">
          <nuxt-link :to="'/search?tags=' + tag" class="has-text-info-dark">
            {{ tag }}
          </nuxt-link>
        </div>
      </div>
    </div>
    <div class="container">
      <NuxtContent :document="post" />
    </div>
    <Footer />
  </main>
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
          content: this.post.description
        }
      ]
    }
  }
}
</script>
