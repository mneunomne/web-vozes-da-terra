<template>
  <div>
    <b-nav>
      <b-nav-item to="/" exact>{{ $t('home.title') }}</b-nav-item>
      <b-nav-item to="/audios" exact>{{ $t('audios.title') }}</b-nav-item>
      <b-nav-item to="/contact" exact>{{ $t('contact.title') }}</b-nav-item>
      <b-nav-item to="/gallery" exact>{{ $t('gallery.title') }}</b-nav-item>
    </b-nav>
  </div>
</template>

<script>
export default {
  name: 'NavMenu'
}
</script>
<style lang="scss" scoped>
.nav {
  display: inline;
}
</style>
