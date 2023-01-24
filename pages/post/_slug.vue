<template>
  <div>
    <Header />
    <div class="row w-100 m-0 p-0">
      <div class="col-lg-9 p-0">
        <div class="mt-5 text-center px-5 text-break">
          <h1 class="fw-normal px-lg-5">
            {{ post.title }}
          </h1>
          <div class="text-secondary fs-5 mt-3">
            {{ $dateFns.format(new Date(post.createdAt), 'MMMM dd, yyyy') }}
          </div>
          <div class="mt-3">
            <nuxt-link :to="'/search?category=' + post.category" class="link-reset text-secondary">
              <font-awesome-icon :icon="['far', 'folder']" />
              {{ post.category }}
            </nuxt-link>
          </div>
          <div v-if="post.tags" class="mt-1">
            <nuxt-link v-for="tag in post.tags" :key="tag" :to="'/search?tags=' + tag" class="link-reset">
              <div class="badge bg-primary-light rounded-pill text-primary-dark mx-1 fw-normal">
                {{ tag }}
              </div>
            </nuxt-link>
          </div>
        </div>
        <div class="text-center my-5 d-lg-none container">
          <div v-if="post.toc.filter(t => { return t.depth <= 2 }).length > 2" class="bg-light rounded mt-4 mx-3 px-5 py-3">
            <p class="fs-5 mb-3">
              - Contents -
            </p>
            <ol class="text-start mb-2">
              <li v-for="t in post.toc.filter(t => { return t.depth <= 2 })" :key="t.id" class="my-1">
                <nuxt-link :to="{ hash: '#' + t.id }" class="link-reset">
                  {{ t.text }}
                </nuxt-link>
              </li>
            </ol>
          </div>
        </div>
        <div class="my-5 container px-3 px-lg-5 text-break">
          <NuxtContent :document="post" />
        </div>
      </div>
      <div class="d-none d-lg-block col bg-ligt ps-4">
        <div class="sticky-top mt-4 pt-2">
          <div v-if="post.toc.filter(t => { return t.depth <= 2 }).length > 2" class="px-3 py-3">
            <div class="fs-5 text-center">
              - Contents -
            </div>
            <div class="position-relative">
              <ol class="overflow-auto py-4" style="height: 50vh;">
                <li v-for="t in post.toc.filter(t => { return t.depth <= 2 })" :key="t.id" class="my-1">
                  <nuxt-link :to="{ hash: '#' + t.id }" class="link-reset">
                    {{ t.text }}
                  </nuxt-link>
                </li>
              </ol>
              <div class="position-absolute w-100" style="top: -1px; height: 2.5em; box-shadow: inset 0 2.5em 1em -1em #fff;" />
              <div class="position-absolute w-100" style="bottom: -1px; height: 2.5em; box-shadow: inset 0 -2.5em 1em -1em #fff;" />
            </div>
          </div>
        </div>
      </div>
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
    <div id="hidden" class="d-none">
      <button class="copybtn">
        <span class="copy-icon">
          <font-awesome-icon :icon="['far', 'copy']" />
        </span>
        <span class="check-icon text-primary d-none">
          <font-awesome-icon :icon="['fas', 'check']" />
        </span>
      </button>
    </div>
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
    let ogUrl = 'https://blog-og-tau.vercel.app/api/og?title=' + this.post.title + '&date=' + this.$dateFns.format(new Date(this.post.createdAt), 'yyyy-MM-dd') + '&category=' + this.post.category
    if (this.post.tags) {
      ogUrl = ogUrl + '&tags=' + this.post.tags.join(',')
    }
    const meta = [
      { hid: 'og:url', property: 'og:url', content: this.$config.baseUrl + '/post/' + this.post.slug },
      { hid: 'og:title', property: 'og:title', content: this.post.title + ' - Laddge\'s Blog' },
      { hid: 'og:image', property: 'og:image', content: ogUrl },
      { hid: 'twitter:card', property: 'twitter:card', content: 'summary_large_image' }
    ]
    if (this.post.description) {
      meta.push(
        { hid: 'description', name: 'description', content: this.post.description },
        { hid: 'og:description', property: 'og:description', content: this.post.description }
      )
    }
    return {
      title: this.post.title,
      meta
    }
  },

  mounted () {
    this.$nextTick(() => {
      for (const el of document.getElementsByClassName('nuxt-content-highlight')) {
        const hiddenEl = document.getElementById('hidden')
        const copyBtn = hiddenEl.firstElementChild.cloneNode(true)
        copyBtn.onclick = (ev) => {
          if (navigator.clipboard) {
            navigator.clipboard.writeText(ev.currentTarget.parentElement.innerText)
          } else {
            const range = document.createRange()
            range.selectNodeContents(ev.currentTarget.parentElement)
            const sel = window.getSelection()
            sel.removeAllRanges()
            sel.addRange(range)
            document.execCommand('copy')
            sel.removeAllRanges()
          }
          const copyIcon = ev.currentTarget.getElementsByClassName('copy-icon')[0]
          const checkIcon = ev.currentTarget.getElementsByClassName('check-icon')[0]
          copyIcon.classList.add('d-none')
          checkIcon.classList.remove('d-none')
          setTimeout(() => {
            checkIcon.classList.add('d-none')
          }, 2000)
        }
        el.onmouseover = (ev) => {
          const copyIcon = ev.currentTarget.getElementsByClassName('copy-icon')[0]
          const checkIcon = ev.currentTarget.getElementsByClassName('check-icon')[0]
          checkIcon.classList.add('d-none')
          copyIcon.classList.remove('d-none')
        }
        el.appendChild(copyBtn)
      }
    })
  }
}
</script>

<style>
.nuxt-content-highlight {
  position: relative;
}

.nuxt-content-highlight .copybtn {
  display: none;
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  padding: 0;
  appearance: none;
  color: #fff;
  position: absolute;
  top: 0;
  right: 0.5rem;
}

.nuxt-content-highlight:hover .copybtn {
  display: block;
}
</style>
