<template>
  <b-col :md="getIsMobile ? 12 : 10">
    <div class="row">
      <h3>{{ $t('gallery.title') }}</h3>
    </div>
    <gallery :images="images.map(a => a.src)" :index="index" @close="index = null"></gallery>
    <b-row class="gallery">
      <b-col class="column" md="3" v-for="(col, idx) in 4" :key="idx">
        <div class="image" 
          v-for="(image, imageIndex) in splitArray(images, 4)[idx]"
          :key="imageIndex"
          style="width:100%"
        >
          <img
            class="image"
            @click="index = image.index"
            :src="image.src"
          />
          <p>{{ index === null ? $t(image.description) : '' }}</p>
        </div>
      </b-col>
    </b-row>
  </b-col>
</template>

<script>
import VueGallery from 'vue-gallery';
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Gallery',
  components: {
    'gallery': VueGallery
  },
  data () {
    return {
      images: [
        {
          index: 0,
          src: require('../assets/images/foto_1.jpg'),
          description: 'gallery.foto_1'
        },
        {
          index: 1,
          src: require('../assets/images/foto_2.jpg'),
          description: 'gallery.foto_2'
        },
        {
          index: 2,
          src: require('../assets/images/foto_3.jpg'),
          description: 'gallery.foto_3'
        },
        {
          index: 3,
          src: require('../assets/images/foto_4.jpg'),
          description: 'gallery.foto_4'
        },
        {
          index: 4,
          src: require('../assets/images/foto_5.jpg'),
          description: 'gallery.foto_5'
        },
        {
          index: 5,
          src: require('../assets/images/foto_6.jpg'),
          description: 'gallery.foto_6'
        },
        {
          index: 6,
          src: require('../assets/images/foto_7.jpg'),
          description: 'gallery.foto_7'
        },
        {
          index: 7,
          src: require('../assets/images/foto_8.png'),
          description: 'gallery.foto_8'
        }
      ],
      index: null
    }
  },
  computed: {
    ...mapGetters([
      'getIsMobile'
    ])
  },
  methods: {
    splitArray(array, parts) {
      let chunkSize = Math.ceil(array.length / parts)
      return [].concat.apply([],
        array.map(function(elem,i) {
          return i%chunkSize ? [] : [array.slice(i,i+chunkSize)]
        })
      )
    }
  }
}
</script>
<style lang="scss" scoped>
.gallery {
  display: flex;
  flex-wrap: wrap;
  padding: 0 4px;
}

.column {
  padding: 0 7px;
}

.image {
  max-width: 100%;
}

@media screen and (max-width: 1024px) {
  .column {
    -ms-flex: 50%;
    flex: 50%;
    max-width: 50%;
  }
}

@media screen and (max-width: 845px) {
  .column {
    -ms-flex: 100%;
    flex: 100%;
    max-width: 100%;
  }
}
</style>
