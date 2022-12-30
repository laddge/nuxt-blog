<template>
  <div>
    <Header />
    <div class="container text-center">
      <a href="https://laddge.net/" target="_blank">
        <button class="btn btn-primary-light btn-lg">
          Portfolio
        </button>
      </a>
    </div>
    <Footer />
  </div>
</template>

<script>
export default {
  head () {
    return {
      title: 'About',
      meta: [
        { hid: 'description', name: 'description', content: '詳しい自己紹介' },
        { hid: 'og:url', property: 'og:url', content: this.$config.baseUrl + '/about' },
        { hid: 'og:description', name: 'og:description', content: '詳しい自己紹介' }
      ]
    }
  }
}
</script>
