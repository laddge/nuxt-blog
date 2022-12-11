<template>
  <main class="m-3 content">
    <h1 class="title">{{ post.title }}</h1>
    <NuxtContent :document="post" />
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
