<template>
    <div>
        <div ref="editor"></div>
        <v-btn @click="copyPost()">Salvar</v-btn>
        {{ editor }}
    </div>
</template>

<script>
    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import Quill from 'quill'

    export default {
        name: 'EditorTexto',
        data() {
            return {
            quill: null,
            editor: null,
            docRef: null
            }
        },
        methods:{
            copyPost(){
                this.editor = this.quill.root.innerHTML
            },
        },
        mounted() {
            this.quill = new Quill(this.$refs.editor, {
                theme: 'snow', // 'snow' é um tema popular
                modules: {
                    toolbar: [
                        [{ header: [1, 2, false] }],
                        ['bold', 'italic', 'underline'],
                        ['image', 'code-block'],
                        [{ list: 'ordered' }, { list: 'bullet' }],
                        ['link'],
                    ],
                },
            });
        }
    }
</script>

<style lang="scss" scoped>
    
</style>