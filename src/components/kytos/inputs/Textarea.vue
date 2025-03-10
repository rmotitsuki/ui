<template>
  <div class="k-textarea-wrap no-compact">
    <icon v-if="icon && iconName" :icon="iconName"></icon>
    <textarea ref="textarea" @input="updateText" type="text" :id="id" class="k-textarea" :value="value" :tooltip="tooltip" :placeholder="placeholder"
      v-bind:disabled="isDisabled" onshow="this.focus()" autofocus>
    </textarea>
  </div>
</template>

<script>
import KytosBase from '../base/KytosBase';
import KytosBaseWithIcon from '../base/KytosBaseWithIcon';

/**
 * A text input field with multi-line.
 */
export default {
  name: 'k-textarea',
  mixins: [KytosBaseWithIcon],
  props: {
   /**
    * The value text used in TextArea.
    */
   value: {
      type: String
    },
   modelValue: {
      default: ""
    },
   /**
    * A tooltip displayed in the text-area
    */
   tooltip: {
      type: String
    },
   /**
    * String displayed when the text-area is empty.
    */
   placeholder: {
      type: String
    },
   /**
    * Optimal action called after textarea changes.
    */
   action: {
      type: Function,
      default: function(value) {return}
   }
  },
  methods: {
    updateText(value){
      this.$emit('textarea', value)
      this.action(value)

      this.$emit('update:value', this.$refs.textarea.value)
      this.action(this.$refs.textarea.value)
    }
  }
}
</script>

<style lang="sass">

@use '../../../assets/styles/dark-theme-variables'

.k-textarea-wrap
 border: 1px solid dark-theme-variables.$fill-input-bg
 border-radius: 0.2em
 background: dark-theme-variables.$fill-input-bg
 display: flex
 flex-direction: row

 &:hover
  border-color: dark-theme-variables.$fill-input-hover
  background: dark-theme-variables.$fill-input-hover

  textarea, svg
   background: dark-theme-variables.$fill-input-hover
   fill: dark-theme-variables.$fill-icon-h
   color: dark-theme-variables.$fill-icon-h

 svg
  fill: dark-theme-variables.$fill-icon
  color: dark-theme-variables.$fill-icon
  padding: 0.3em 0.5em

.k-textarea
 padding: 0.2em
 border: none
 border-radius: 0.2em
 outline: none
 background: dark-theme-variables.$fill-input-bg
 color: dark-theme-variables.$fill-input
 font-size: 0.8em
 flex: 1

 &:focus
  border-color: dark-theme-variables.$fill-input-hover

 &:hover
  border-color: dark-theme-variables.$fill-input-hover
  color: dark-theme-variables.$fill-text
  background: dark-theme-variables.$fill-input-hover

</style>
