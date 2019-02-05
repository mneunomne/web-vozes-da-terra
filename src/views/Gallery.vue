<template>
<div>
    <div class="row">
      <h3>{{ $t('gallery.title') }}</h3>
    </div>
    <br/>
    <br/>
    
    <gallery :images="images" :index="index" @close="index = null"></gallery>
    <div
      class="image"
      v-for="(image, imageIndex) in images"
      :key="imageIndex"
      @click="index = imageIndex"
      :style="{ backgroundImage: 'url(' + image + ')', width: '300px', height: '200px' }"
    ></div>
  </div>
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
        require('../assets/images/foto_1.jpg'),
        require('../assets/images/foto_2.jpg'),
        require('../assets/images/foto_3.jpg'),
        require('../assets/images/foto_4.jpg'),
        require('../assets/images/foto_5.jpg'),
        require('../assets/images/foto_6.jpg'),
        require('../assets/images/foto_7.jpg'),
        require('../assets/images/foto_8.png'),
        require('../assets/images/foto_9.jpg'),
        require('../assets/images/foto_10.jpg'),
        require('../assets/images/foto_11.jpg'),
        require('../assets/images/foto_12.jpg'),
        require('../assets/images/foto_13.jpg'),
        require('../assets/images/foto_14.jpg'),
        require('../assets/images/foto_16.jpg')
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
  margin: 8px;
  box-shadow: 1px 1px 1px rgba(0,0,0,0.4);
  filter: gray; 
      -webkit-filter: grayscale(.7); 
      -webkit-transition: all .8s ease-in-out; 
}

.image:hover {
    filter: none;
      -webkit-filter: grayscale(0);
      -webkit-transform: scale(1.01);
    }


</style>
