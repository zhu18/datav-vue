<script>
  import Part from './../Part.vue'

  export default{
    extends: Part,
    data() {
      return {
        type: 'part.text',
      }
    },
    methods: {},
    created() {
      console.log('---text--created');
    },
    mounted() {
      console.log('---text--mounted');
    }
  }
</script>

