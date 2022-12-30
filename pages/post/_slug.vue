<template>
  <div>
    <Header />
    <div class="my-5 text-center px-5 text-break">
      <h1 class="fw-normal">
        {{ post.title }}
      </h1>
      <p class="text-secondary fs-5 mt-3">
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
      <div v-if="post.toc.filter(t => { return t.depth <= 2 }).length > 2" class="bg-light rounded mt-4 px-5 py-3 d-inline-block">
        <p class="fw-bold mb-2">
          - Table of Contents -
        </p>
        <ol class="mb-0 text-start">
          <li v-for="t in post.toc.filter(t => { return t.depth <= 2 })" :key="t.id">
            <nuxt-link :to="{ hash: '#' + t.id }" class="link-reset">
              {{ t.text }}
            </nuxt-link>
          </li>
        </ol>
      </div>
    </div>
    <div class="container text-break">
      <NuxtContent :document="post" />
    </div>
    <div v-if="prev || next" class="border-top border-bottom mt-5 mx-3 pb-3 d-flex flex-wrap">
      <nuxt-link v-if="next" :to="'/post/' + next.slug" class="link-reset d-block mt-3">
        <div class="btn btn-primary-light border-0 d-inline-flex align-items-center">
          <div>
            <font-awesome-icon :icon="['fas', 'chevron-left']" />
          </div>
          <div class="ms-2">
            {{ next.title }}
          </div>
        </div>
      </nuxt-link>
      <nuxt-link v-if="prev" :to="'/post/' + prev.slug" class="link-reset d-block mt-3 ms-auto">
        <div class="btn btn-primary-light d-inline-flex align-items-center">
          <div>
            {{ prev.title }}
          </div>
          <div class="ms-2">
            <font-awesome-icon :icon="['fas', 'chevron-right']" />
          </div>
        </div>
      </nuxt-link>
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
    const [prev, next] = await $content('post')
      .only(['title', 'slug'])
      .sortBy('createdAt', 'asc')
      .surround(params.slug)
      .fetch()
    return {
      post,
      prev,
      next
    }
  },

  head () {
    return {
      title: this.post.title,
      meta: [
        {
          name: 'description',
          content: this.post.description
        }
      ]
    }
  }
}
</script>
