<template>
  <div class='k-toolbar'>
   <component v-show="active == (index+1)"
              v-for="(component, index) in toolbarItems"
              :is='component.name'
              v-bind:key="component.name">
   </component>
  </div>
 </template>
 
 <script type="module">
 import { defineAsyncComponent } from 'vue'
 import { loadModule } from 'vue3-sfc-loader'
 import axios from 'axios'
 import { mapState } from 'pinia'
 import { useToolbarStore } from '../../../stores/toolbarStore'
 
 export default {
   name: 'k-toolbar',
   props: ["active", "compacted", "components"],
   data () {
     return {
      url: this.$kytos_server + 'ui/k-toolbar',
     }
   },
   created() {
      this.fetchData();
   },
   methods: {
     async fetchData() {
      try {
        const response = await axios.get(this.url);
        this.toolbarItems.push(...response.data)
      } catch (err) {
        console.error(err)
      } finally {
        this.load_components()
      }
     },
     load_components (){
      this.toolbarItems.forEach(component => {
            if ('url' in component) {
                let url = this.$kytos_server+component.url
                this.$kytos.component(component.name, defineAsyncComponent( () => loadModule(url, this.loaderOptions) ))
            }
        });
     }
  },
  computed: {
    ...mapState(useToolbarStore, ['toolbarItems', 'loaderOptions'])
  }
 }
 </script>
 
 <style lang="sass">
 
 @use '../../../assets/styles/dark-theme-variables'
 
 .k-toolbar
   -webkit-order: 2
   -ms-flex-order: 2
   z-index: 999
   margin-top: 40px
   padding: 5px 10px
   background: dark-theme-variables.$fill-panel
   width: 220px
   display: block
 
 .compacted
  .k-toolbar
   width: 100vw
   height: 40px
   margin-top: 0px
   box-shadow: 5px 2px 10px dark-theme-variables.$kytos-black
   overflow: hidden
   padding: 0px
 
   .no-compact
    display: none
 
 </style>
 