<template>
  <div>
    <h3>{{ $t('audios.title') }}</h3>
    <AudioBox
      v-for="(item, index) in getSomeAudios"
      v-bind:key="item"
      :filename="item.filename"
      :tags="item.tags"
      :index="index"
      :type="item.type"      
    ></AudioBox>
  </div>
</template>

<script>
import AudioBox from '@/components/AudioBox'
import { mapGetters } from 'vuex'

export default {
  name: 'Audios',
  components: {
    AudioBox
  },
  computed: {
    ...mapGetters([
      'getSomeAudios'
    ])
  },
  mounted () {}
}
</script>
