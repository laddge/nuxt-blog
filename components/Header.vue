<template>
  <nav class="navbar navbar-expand-lg px-2 py-3">
    <div class="container-fluid">
      <nuxt-link class="navbar-brand ms-1 mb-3 mb-lg-0" to="/">
        <img src="https://res.cloudinary.com/laddge/image/upload/f_auto,q_auto/v1670726722/blog/brand.png" height="28">
      </nuxt-link>
      <button
        class="navbar-toggler mb-3 border-0 shadow-none text-secondary"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#headerNavContent"
        aria-controls="headerNavContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <font-awesome-icon :icon="['fas', 'bars']" size="lg" />
        <font-awesome-icon :icon="['fas', 'xmark']" size="lg" />
      </button>
      <div id="headerNavContent" class="collapse navbar-collapse bg-light bg-lg-none px-3 rounded">
        <ul class="navbar-nav ms-auto my-2 my-lg-0">
          <li class="nav-item">
            <nuxt-link class="nav-link text-dark" to="/">
              Home
            </nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link class="nav-link text-dark" to="/search">
              Search
            </nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link class="nav-link text-dark" to="/about">
              About
            </nuxt-link>
          </li>
          <li class="nav-item d-flex ms-lg-3 py-0">
            <a v-for="s in social" :key="s.icon" :href="s.url" target="_blank" class="nav-link text-dark px-1 fs-5">
              <font-awesome-icon :icon="['fab', s.icon]" size="lg" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data () {
    return {
      social: [
        { icon: 'github', url: 'https://github.com/laddge' },
        { icon: 'twitter', url: 'https://twitter.com/laddge_' },
        { icon: 'instagram', url: 'https://instagram.com/laddge_' }
      ]
    }
  }
}
</script>
