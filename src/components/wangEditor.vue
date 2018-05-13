<template>
    <div id="editorElem" class="wang-editor"></div>
</template>

<script type="text/babel">
    import E from 'wangeditor'
    import emitter from 'utils/emitter';

    export default {
        mixins: [emitter],
        data() {
            return {
                editorDom: null,            // 编辑器对象
                editorContent: '',          // 内容
            }
        },
        props: {
            value: String,
            defaultValue: String
        },
        watch: {
            defaultValue(val) {
                this.setContent(val);
            }
        },
        methods: {
            getContent() {
                return this.editorContent;
            },

            setContent(val) {
                this.editorDom.txt.html(val);
            },
        },
        mounted() {
            this.editorDom = new E('#editorElem');

            if (this.defaultValue) {
                this.setContent(this.defaultValue);
            }

            this.editorDom.customConfig.onchange = (html) => {
                this.editorContent = html;
                this.$emit('change', html);
                this.$emit('input', html);
            };

            this.editorDom.customConfig.onblur = (html) => {
                this.dispatch('ElFormItem', 'el.form.blur', [html]);
            };
            this.editorDom.create()
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    .wang-editor {
        .w-e-text {
            overflow: auto;
        }
    }
</style>
