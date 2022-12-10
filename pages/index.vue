<template>
  <main class="m-3 content">
    <div class="box m-3" v-for="post in posts" :key="post.slug">
    <nuxt-link class="has-text-dark" :to="'/post/' + post.slug">
      <p class="title">{{ post.title }}</p>
      <p class="subtitle">{{ post.description }}</p>
      <time :datetime="post.createdAt">
        {{ $dateFns.format(new Date(post.createdAt), 'yyyy/MM/dd') }}
      </time>
    </nuxt-link>
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
