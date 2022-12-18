<template>
  <div class="container">
    <div v-for="post in posts" :key="post.slug" class="my-2 px-3 py-4">
      <nuxt-link :to="'/post/' + post.slug" class="link-reset">
        <p class="h3">
          {{ post.title }}
        </p>
      </nuxt-link>
      <div class="mt-2 ms-1">
        <span class="text-secondary px-1">
          <font-awesome-icon :icon="['far', 'calendar']" />
          {{ $dateFns.format(new Date(post.createdAt), 'yyyy.MM.dd') }}
        </span>
        <nuxt-link :to="'/search?category=' + post.category" class="link-reset">
          <span class="text-secondary px-1">
            <font-awesome-icon :icon="['far', 'folder']" />
            {{ post.category }}
          </span>
        </nuxt-link>
      </div>
      <div v-if="post.tags" class="mt-2">
        <nuxt-link v-for="tag in post.tags" :key="tag" :to="'/search?tags=' + tag" class="link-reset">
          <div class="badge bg-primary-light rounded-pill text-primary-dark mx-1 fw-normal">
            {{ tag }}
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    posts: {
      type: Array,
      default: () => []
    }
  }
}
</script>
