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
        <span class="has-text-grey is-5 icon-text">
          <span class="icon">
            <font-awesome-icon :icon="['far', 'folder']" />
          </span>
          <span>
            {{ post.category ? post.category : '未分類' }}
          </span>
        </span>
      </p>
      <p class="mt-2" v-if="post.tags">
        <div class="tag mx-1" v-for="tag in post.tags" :key="tag">
          {{ tag }}
        </div>
      </p>
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
