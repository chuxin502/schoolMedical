<template>
    <div id="editorElem"></div>
</template>

<script type="text/babel">
    import E from 'wangeditor'

    export default {
        data() {
            return {
                editorDom: null,            // 编辑器对象
                editorContent: ''
            }
        },
        props: {
            value: ''
        },
        methods: {
            getContent() {
                return this.editorContent;
            },

            setContent() {
                this.editorContent = this.value;
                this.editorDom.txt.html(this.value);
            },
        },
        mounted() {
            this.editorDom = new E('#editorElem');

            if (this.value) {
                this.setContent();
            }

            this.editorDom.customConfig.onchange = (html) => {
                this.editorContent = html;
                this.$emit('change', html);
                this.$emit('input', html);
            };
            this.editorDom.create()
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
</style>
