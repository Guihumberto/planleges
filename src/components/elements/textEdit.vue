<template>
    <div>
        <div @keyup.enter="copyPost()" ref="editor"></div>
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
                editor: 'null',
                newTexto: ''
            }
        },
        props:{
            texto: String
        },
        watch:{
            texto(antes, depois){
                this.quill.root.innerHTML = this.texto
            }
        },
        methods:{
            copyPost(){
                this.newTexto = this.quill.root.innerHTML
                this.$emit('insertNew', this.newTexto);
            },
        },
        mounted(){
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