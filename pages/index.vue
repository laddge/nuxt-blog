<template>
  <main class="m-3 content">
    <div class="box m-3" v-for="post in posts" :key="post.slug">
      <nuxt-link :to="'/post/' + post.slug">
        <p class="title is-4">{{ post.title }}</p>
      </nuxt-link>
      <p class="has-text-grey is-5">{{ $dateFns.format(new Date(post.createdAt), 'MMM dd yyyy') }}</p>
    </div>
  </main>
</template>

<script>
export default {
  async asyncData ({ $content }) {
    const posts = await $content('post').sortBy('createdAt', 'desc').fetch()
    return {
      posts
    }
  }
}
</script>
