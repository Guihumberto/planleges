<template>
    <div class="containerPDF">
      <div class="d-flex justify-center pb-5">
          <v-btn @click="generatePDF">Gerar PDF</v-btn>
      </div>
      <div ref="pdfContent" id="pdf-content">
        <div class="content" v-for="page, p in 2" :key="p">
            <p v-for="item, in 43" :key="i">Seu conteúdo aqui...</p>
        </div>
      </div>
      
    </div>
</template>

<script>
    import jsPDF from 'jspdf';

    export default {
        methods: {
            async generatePDF() {
                const doc = new jsPDF({ unit: 'pt'});
                const content = document.getElementById('pdf-content').innerHTML;

                doc.html(content, {
                    callback: function (doc) {
                        doc.save(`revisao.pdf`);
                    },
                    x: 10,
                    y: 10,
                    width: 580,
                    windowWidth: 800
              });
            }
        }
    }
</script>

<style lang="scss" scoped>
    body {
        margin: 0;
        padding: 0;
    }
    .containerPDF{
        background: rgb(200, 199, 199);
        padding: 2rem;
    }
    .content {
        font-family: Arial, sans-serif;
        max-width: 21cm; /* Largura A4 */
        height: 29.7cm;
        margin: 0 auto;
        margin-bottom: 2.5rem;
        border: 1px black solid;
        padding: 40px 30px;
        background: rgb(247, 248, 245);
        page-break-after: always; /* Cria uma nova página após o conteúdo */
    }
    @page {
        size: A4;
        margin: 0;
    }
</style>