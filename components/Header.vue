<template>
  <nav class="navbar navbar-expand-lg px-2 py-3">
    <div class="container-fluid">
      <nuxt-link class="navbar-brand ms-1 mb-3 mb-lg-0" to="/" aria-label="Blog home">
        <img src="https://res.cloudinary.com/laddge/image/upload/v1678779623/blog/brand.svg" height="147" width="926" alt="Laddge's Blog" style="height: 28px; width: auto;">
      </nuxt-link>
      <input id="headerNavTogglerCheck" type="checkbox" class="d-none">
      <label
        for="headerNavTogglerCheck"
        class="navbar-toggler mb-3 border-0 shadow-none text-secondary"
      >
        <font-awesome-icon :icon="['fas', 'bars']" size="lg" />
        <font-awesome-icon :icon="['fas', 'xmark']" size="lg" />
      </label>
      <div id="headerNavContent" class="navbar-collapse bg-lg-none px-3 rounded">
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
          <li class="nav-item">
            <nuxt-link class="nav-link text-dark" to="/contact">
              Contact
            </nuxt-link>
          </li>
          <li class="nav-item d-flex ms-lg-3 py-0">
            <a
              v-for="s in $config.social"
              :key="s.icon"
              :href="s.url"
              target="_blank"
              class="nav-link text-dark px-1 fs-5"
              :aria-label="s.icon"
            >
              <font-awesome-icon :icon="['fab', s.icon]" size="lg" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
#headerNavTogglerCheck + label .fa-bars { display: inherit; }
#headerNavTogglerCheck + label .fa-xmark { display: none; }
#headerNavTogglerCheck:checked + label .fa-bars { display: none; }
#headerNavTogglerCheck:checked + label .fa-xmark { display: inherit; }

#headerNavContent {
  background-color: rgba(179, 189, 200, 10%);
}

@media (max-width: 991.98px) {
  #headerNavContent {
    overflow: hidden;
    height: 0;
    transition: height .35s ease;
  }
}
#headerNavTogglerCheck:checked + label + #headerNavContent { height: 243px; }
</style>
