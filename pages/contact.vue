<template>
  <div>
    <Header />
    <div class="container">
      <form
        ref="form"
        class="mt-4 p-3 text-center"
        :action="gfAction"
        method="POST"
        target="hidden_iframe"
        @submit="submitted=true"
      >
        <h2 class="mb-4">
          お問い合わせ
        </h2>
        <div class="mb-3">
          <label class="form-label text-start">
            お名前<span class="text-danger">*</span>
            <input type="text" class="form-control shadow-none" :name="gfName" required>
          </label>
        </div>
        <div class="mb-3">
          <label class="form-label text-start">
            メールアドレス<span class="text-danger">*</span>
            <input type="email" class="form-control shadow-none" :name="gfEmail" required>
          </label>
        </div>
        <div class="mb-3">
          <label class="form-label text-start">
            内容<span class="text-danger">*</span>
            <textarea class="form-control shadow-none" rows="3" :name="gfMessage" required />
          </label>
        </div>
        <button type="submit" class="btn btn-primary-light">
          送信
        </button>
      </form>
      <iframe name="hidden_iframe" class="d-none" @load="onSubmited" />
    </div>
    <Footer />
  </div>
</template>

<script>
export default {
  data () {
    return {
      gfAction: 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSf3xc6ePT8YpECPX97BwIk0UyMy6yfBQ3gSVRpygjsb73qZ_Q/formResponse',
      gfName: 'entry.53119529',
      gfEmail: 'entry.1375943289',
      gfMessage: 'entry.153796236',
      submitted: false
    }
  },

  head () {
    return {
      title: 'Contact',
      meta: [
        { hid: 'description', name: 'description', content: 'お問い合わせフォーム' },
        { hid: 'og:title', property: 'og:title', content: 'Contact - Laddge\'s Blog' },
        { hid: 'og:url', property: 'og:url', content: this.$config.baseUrl + '/contact' },
        { hid: 'og:description', name: 'og:description', content: 'お問い合わせフォーム' }
      ]
    }
  },

  methods: {
    onSubmited () {
      if (this.submitted) {
        this.submitted = false
        this.$refs.form.reset()
        alert('送信しました')
      }
    }
  }
}
</script>
