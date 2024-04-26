<template>
    <div>
      <div ref="pdfContent" id="pdf-content">
        <div class="ma-15">
            <h1>Teste</h1>
            <h2>Nova</h2>
            <span>oi</span>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Recusandae nobis quo fuga itaque quidem quasi quibusdam alias! Architecto doloremque 
                doloribus ipsum quasi earum dignissimos, omnis quaerat nemo cumque quidem nostrum.
            </p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Recusandae nobis quo fuga itaque quidem quasi quibusdam alias! Architecto doloremque 
                doloribus ipsum quasi earum dignissimos, omnis quaerat nemo cumque quidem nostrum.
            </p>
        </div>
      </div>
      <v-btn @click="generatePDF">Gerar PDF</v-btn>
    </div>
</template>

<script>
    import jsPDF from 'jspdf';
    import html2canvas from 'html2canvas';

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

</style>