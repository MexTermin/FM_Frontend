<template>
    <div style="display:none;">
        <section id="pdf-content">
            <!-- PDF Content Here -->
            <div>Hola</div>
        </section>
    </div>
</template>


<script setup lang="ts">
import pdfMake from 'pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import htmlToPdfmake from 'html-to-pdfmake';

//get table html
const pdfTable = document.getElementById('pdf-content');
if (pdfTable) {
    //html to pdf format
    var win = window.open('', '_blank');
    var html = htmlToPdfmake(pdfTable.innerHTML);
    const documentDefinition = { content: html };
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    pdfMake.createPdf(documentDefinition).open({}, win);
}

</script>
