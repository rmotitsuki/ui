<template>
  <div class='k-toolbar'>
   <component v-for="(component, index) in toolbarItemsList"
              v-show="active == (index+1)"
              :is='component.name'
              :key="component.name">
   </component>
  </div>
 </template>
 
 <script type="module">
 import { defineAsyncComponent } from 'vue'
 import { loadModule } from 'vue3-sfc-loader'
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
        const response = await this.$http.get(this.url);
        for (let i = 0; i < response.data.length; i++) {
          this.toolbarItems[response.data[i].name] = response.data[i];
        }
      } catch (err) {
        console.error(err)
      } finally {
        this.load_components()
      }
     },
     load_components (){
      this.toolbarItemsList.forEach(component => {
            if ('url' in component) {
                let url = this.$kytos_server+component.url
                this.$kytos.component(component.name, defineAsyncComponent( () => loadModule(url, this.loaderOptions) ))
            }
        });
     }
  },
  computed: {
    ...mapState(useToolbarStore, ['toolbarItems', 'toolbarItemsList', 'loaderOptions'])
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
 