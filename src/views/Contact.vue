<template>
  <b-col :md="getIsMobile ? 12 : 9">
    <h3 class="mb-4">{{ $t('contact.title') }}</h3>
  </b-col>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Contact',
  data() {
    return {
      form: {
        email: '',
        name: '',
        food: null,
        checked: false,
        secret: 'S3CR3T'
      },
      foods: [
        {
          text: 'Select One',
          value: null
        },
        'Carrots',
        'Beans',
        'Tomatoes',
        'Corn'
      ]
    }
  },
  computed: {
    ...mapGetters([
      'getIsMobile'
    ])
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault()
      alert(JSON.stringify(this.form))
    }
  }
}
</script>
