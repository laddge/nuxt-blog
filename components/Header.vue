<template>
  <nav class="navbar mb-5" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <nuxt-link class="navbar-item" to="/">
        <img src="https://res.cloudinary.com/laddge/image/upload/f_auto,q_auto/v1670726722/blog/brand.png" height="28">
      </nuxt-link>
      <a
        role="button"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarHeader"
        @click="toggleBurger($event)"
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </a>
    </div>
    <div id="navbarHeader" class="navbar-menu">
      <div class="navbar-end">
        <nuxt-link class="navbar-item" to="/">
          Home
        </nuxt-link>
        <nuxt-link class="navbar-item" to="/search">
          Search
        </nuxt-link>
        <nuxt-link class="navbar-item" to="/about">
          About
        </nuxt-link>
        <div class="navbar-item mt-2">
          <a :href="'https://github.com/' + github" target="_blank">
            <span class="icon has-text-dark mx-1 is-size-5">
              <font-awesome-icon :icon="['fab', 'github']" size="lg" />
            </span>
          </a>
          <a :href="'https://twitter.com/' + twitter" target="_blank">
            <span class="icon has-text-dark mx-1 is-size-5">
              <font-awesome-icon :icon="['fab', 'twitter']" size="lg" />
            </span>
          </a>
          <a :href="'https://instagram.com/' + instagram" target="_blank">
            <span class="icon has-text-dark mx-1 is-size-5">
              <font-awesome-icon :icon="['fab', 'instagram']" size="lg" />
            </span>
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data () {
    return {
      github: 'laddge',
      twitter: 'laddge_',
      instagram: 'laddge_'
    }
  },
  methods: {
    toggleBurger (event) {
      event.target.classList.toggle('is-active')
      const target = document.getElementById(event.target.dataset.target)
      if (target) {
        target.classList.toggle('is-active')
      }
    }
  }
}
</script>
