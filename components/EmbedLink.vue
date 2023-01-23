<template>
  <div>
    <a v-if="Object.keys(apiData).length" :href="href" target="_blank" class="link-reset text-reset">
      <div class="my-3 mb-4 border rounded d-flex align-items-center overflow-hidden">
        <div class="ms-3 me-2 my-3 flex-shrink-0" :style="'width: 5rem; height: 5rem; background-image: url(' + apiData.image + '); background-size: cover; background-position: center;'" />
        <div class="p-3">
          <div class="fw-bold truncate">
            {{ apiData.title }}
          </div>
          <div class="text-secondary small">
            {{ href.split('/')[2] }}
          </div>
          <div class="text-secondary small my-1 truncate">
            {{ apiData.description }}
          </div>
        </div>
      </div>
    </a>
    <p v-else>
      <a :href="href" target="_blank">
        {{ href }}
      </a>
    </p>
  </div>
</template>

<style scoped>
.truncate {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
</style>

<script>
export default {
  props: {
    href: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      apiData: {}
    }
  },

  async fetch () {
    const url = 'https://embeda.laddge.net/?url=' + this.href
    this.apiData = await this.$axios.$get(url)
  }
}
</script>
