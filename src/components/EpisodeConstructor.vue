<template>
        <section id="blocks" ref="document">
            <div class="episodeBlock">
                <input placeholder="Эпизод">
                <textarea></textarea>
            </div>
        </section>
    <input v-on:click="AddEpisodeBlock()" type='button' value="ADD EPISODE">
    <input v-on:click="generatePDF()" type='button' value="Download">
</template>
<script>

import html2pdf from 'html2pdf.js'

export default
    {
        components: {
        },
        methods:
        {
            AddEpisodeBlock() {
                let parent = document.getElementById("blocks");
                let block = document.createElement('div');
                let textarea = document.createElement('textarea');
                let input = document.createElement('input');
                input.placeholder = "Эпизод";
                block.className = "episodeBlock";
                block.appendChild(input);
                block.appendChild(textarea);
                parent.appendChild(block);
            },
            generatePDF() {
                var element = document.getElementById('blocks');
                html2pdf(this.$refs.document, {
					margin: 1,
					filename: 'document.pdf',
					image: { type: 'jpeg', quality: 0.98 },
					html2canvas: { dpi: 192, letterRendering: true },
					jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape' }
				})
            },

        }
    }

</script>
<style lang = "less">
.episodeBlock {
    width: 400px;
    border: 1px solid black;
    border-radius: 40px;
    margin-top: 5px;

    input {
        margin-left: auto;
        margin-right: auto;
        text-align: center;
        border: none;
        outline: none;
        display: block;
        margin-top: 5px;
    }

    ;

    textarea {
        width: 80%;
        height: 100%;
        margin: 10%;
        outline: none;
        resize: vertical;
        min-height: 100px;
        border: none;

    }

    ;
}
</style>