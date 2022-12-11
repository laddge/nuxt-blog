<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <nuxt-link class="navbar-item" to="/">
        <img src="https://res.cloudinary.com/laddge/image/upload/f_auto,q_auto/v1670726722/blog/brand.png" height="28">
      </nuxt-link>
      <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarHeader" @click="toggleBurger($event)">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div id="navbarHeader" class="navbar-menu">
      <div class="navbar-end">
        <nuxt-link class="navbar-item" to="/">
          Home
        </nuxt-link>
        <nuxt-link class="navbar-item" to="/about">
          About
        </nuxt-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
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
