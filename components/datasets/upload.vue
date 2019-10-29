<template>
  <div id="app">
    <file-pond
      ref="pond"
      name="test"
      label-idle="Drop files here..."
      allow-multiple="true"
      accepted-file-types="image/jpeg, image/png"
      server="/api"
      :files="myFiles"
      @init="handleFilePondInit"
    />
  </div>
</template>

<script>
// Import Vue FilePond
import vueFilePond from 'vue-filepond'

// Import FilePond styles
import 'filepond/dist/filepond.min.css'

// Import FilePond plugins
// Please note that you need to install these plugins separately

// Import image preview plugin styles
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css'

// Import image preview and file type validation plugins
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'

// Create component
const FilePond = vueFilePond(FilePondPluginFileValidateType, FilePondPluginImagePreview)

export default {
  name: 'Upload',
  components: {
    FilePond
  },
  data () {
    return { myFiles: ['cat.jpeg'] }
  },
  methods: {
    handleFilePondInit () {
      console.log('FilePond has initialized')

      // FilePond instance methods are available on `this.$refs.pond`

      // https://pqina.nl/filepond/docs/patterns/frameworks/vue/
    }
  }
}
</script>
