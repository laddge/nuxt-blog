<template>
  <div>
    <Header />
    <div class="row w-100 mt-3 mx-0 px-3 justify-content-center align-items-center">
      <div class="col-lg" />
      <div class="py-4 text-center col-lg-auto">
        <img :src="doc.image" height="240" width="240" class="rounded-circle" style="max-height: 50vw; max-width: 50vw;">
      </div>
      <div class="col-lg-auto">
        <table class="text-start my-4 mx-auto">
          <tr>
            <td class="fw-bold">
              Name
            </td>
            <td>
              {{ doc.name }}
            </td>
          </tr>
          <tr>
            <td class="fw-bold">
              Birthday
            </td>
            <td>
              {{ doc.birthday }}
            </td>
          </tr>
          <tr v-for="s in $config.social" :key="s.icon">
            <td class="fw-bold text-capitalize">
              {{ s.icon }}
            </td>
            <td>
              <a :href="s.url" target="_blank">{{ s.name }}</a>
            </td>
          </tr>
        </table>
      </div>
      <div class="col-lg" />
    </div>
    <div class="text-center mt-5">
      <NuxtContent :document="doc" class="text-justify d-inline-block mx-4" />
    </div>
    <Footer />
  </div>
</template>

<script>
export default {
  async asyncData ({ $content }) {
    const doc = await $content('about').fetch()
    return {
      doc
    }
  },

  head () {
    return {
      title: 'About',
      meta: [
        { hid: 'description', name: 'description', content: '自己紹介' },
        { hid: 'og:title', property: 'og:title', content: 'About - Laddge\'s Blog' },
        { hid: 'og:url', property: 'og:url', content: this.$config.baseUrl + '/about' },
        { hid: 'og:description', name: 'og:description', content: '自己紹介' }
      ]
    }
  }
}
</script>

<style scoped>
td { padding: 0.3rem 1rem; }
</style>
