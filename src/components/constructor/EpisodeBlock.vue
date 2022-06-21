<template>
  <textarea  v-model="value"
    ref="textarea"
    rows="1"
    @focus="resize"
    @keyup="resize"> </textarea>
</template>
<script>
 export default {
    props: {
      value: {
        type: String,
        required: true,
      }
    },
    mounted() {
      this.resize();
    },
    methods: {
      resize() {
        const { textarea } = this.$refs;
        textarea.style.height = textarea.scrollHeight - 4 + 'px';
      }
    }
  }
</script>
