<template>
  <b-col md="10">
    <div class="row">
      <h3>{{ $t('gallery.title') }}</h3>
    </div>
    <gallery :images="images.map(a => a.src)" :index="index" @close="index = null"></gallery>
    <div
      class="image"
      v-for="(image, imageIndex) in images"
      :key="imageIndex"
      @click="index = imageIndex"
      :style="{ backgroundImage: 'url(' + image.src + ')', width: '300px', height: '200px' }"
    ><p>{{ index === null ? $t(image.description) : '' }}</p></div>
  </b-col>
</template>

<script>
import VueGallery from 'vue-gallery';

export default {
  name: 'Gallery',
  components: {
    'gallery': VueGallery
  },
  data () {
    return {
      images: [
        {
          src: require('../assets/images/foto_1.jpg'),
          description: 'gallery.foto_1'
        },
        {
          src: require('../assets/images/foto_2.jpg'),
          description: 'gallery.foto_2'
        },
        {
          src: require('../assets/images/foto_3.jpg'),
          description: 'gallery.foto_3'
        },
        {
          src: require('../assets/images/foto_4.jpg'),
          description: 'gallery.foto_4'
        },
        {
          src: require('../assets/images/foto_5.jpg'),
          description: 'gallery.foto_5'
        },
        {
          src: require('../assets/images/foto_6.jpg'),
          description: 'gallery.foto_6'
        },
        {
          src: require('../assets/images/foto_7.jpg'),
          description: 'gallery.foto_7'
        },
        {
          src: require('../assets/images/foto_8.png'),
          description: 'gallery.foto_8'
        }
      ],
      index: null
    }
  }  
}
</script>
<style lang="scss" scoped>
.image {
  float: left;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  border: 1px solid #ebebeb;
  margin: 5px;
  margin-bottom: 3em;
  position: relative;
  p {
    position: absolute;
    bottom: -3em;
    font-size: 10px;
  }
}
</style>
