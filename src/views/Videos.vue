<template>
  <b-col :md="getIsMobile ? 12 : 9">
    <div class="row page-title">
      <h3>{{ $t('videos.title') }}</h3>
    </div>
    <div class="row embed-responsive embed-responsive-16by9">
      <iframe src="https://www.youtube.com/embed/3UTO2yptevY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
    <div class="row embed-responsive embed-responsive-16by9">
      <iframe src="https://www.youtube.com/embed/UAL7rh-drAo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
  </b-col>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Videos',
  methods: {},
  computed: {
    ...mapGetters([
      'getIsMobile'
    ])
  }
}
</script>
<style lang="scss" scoped>
</style>

