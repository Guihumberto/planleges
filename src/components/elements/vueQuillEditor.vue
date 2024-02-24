<template>
    <div class="quillEditorContainer">
      <div class="quillEditor">
        <div ref="editor" style="height: 300px;"></div>
      </div>
    </div>
  </template>
  
  <script>
  import Quill from 'quill'
  import 'quill/dist/quill.snow.css'
  
    export default {
  
      data() {
        return {
          editor: null,
          firestore: null,
          docRef: null
        }
      },
      mounted() {
        this.editor = new Quill(this.$refs.editor, {
          theme: 'snow'
        })
      }
    }
  </script>
  
  <style scoped>
  
  </style>