<template>
  <div>
    <div v-for="post in posts" :key="post.slug" class="box m-3">
      <nuxt-link :to="'/post/' + post.slug">
        <p class="title is-4 mb-2">
          {{ post.title }}
        </p>
      </nuxt-link>
      <div>
        <span class="has-text-grey is-5 icon-text px-1">
          <span class="icon">
            <font-awesome-icon :icon="['far', 'calendar']" />
          </span>
          <span>
            {{ $dateFns.format(new Date(post.createdAt), 'MMM dd yyyy') }}
          </span>
        </span>
        <nuxt-link :to="'/search?category=' + post.category">
          <span class="has-text-grey is-5 icon-text px-1">
            <span class="icon">
              <font-awesome-icon :icon="['far', 'folder']" />
            </span>
            <span>
              {{ post.category }}
            </span>
          </span>
        </nuxt-link>
      </div>
      <div v-if="post.tags" class="tags mt-2">
        <div v-for="tag in post.tags" :key="tag" class="tag">
          <nuxt-link :to="'/search?tags=' + tag" class="has-text-dark">
            {{ tag }}
          </nuxt-link>
        </div>
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
