<template>
  <main class="m-3 content">
    <Header />
    <div class="my-6 has-text-centered">
      <h1 class="title has-text-weight-normal">{{ post.title }}</h1>
      <p class="subtitle has-text-grey has-text-weight-light mt-5">
        {{ $dateFns.format(new Date(post.createdAt), 'MMMM dd, yyyy') }}
      </p>
    </div>
    <div class="container">
      <NuxtContent :document="post" />
    </div>
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
