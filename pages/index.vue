<template>
  <ul>
    <li v-for="post in posts" :key="post.slug">
      <nuxt-link :to="'/post/' + post.slug">
        <time :datetime="post.createdAt">
          {{ $dateFns.format(new Date(post.createdAt), 'yyyy/MM/dd') }}
        </time>
        <p>{{ post.title }}</p>
      </nuxt-link>
    </li>
  </ul>
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
