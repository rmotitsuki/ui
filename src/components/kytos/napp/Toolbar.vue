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
 import * as Vue from 'vue'
 import { mapState, mapActions } from 'pinia'
 import { useToolbarStore } from '../../../stores/toolbarStore'
 
 const options = {
 
   moduleCache: {
     vue: Vue
   },

   pathResolve({ refPath, relPath }, options) {

    if ( relPath === '.' )
      return refPath;

    if ( relPath[0] !== '.' && relPath[0] !== '/' )
      return relPath;

    return String(new URL(relPath, refPath === undefined ? window.location : refPath));
   },

   handleModule: async function (type, getContentData, path, options) {

    switch (type) {
      case '.css':
        options.addStyle(await getContentData(false));
        return null;
      case '.kytos':
        console.log("Kytos extension detected. Switch extension to .vue");
        return null;
      default: return undefined; // let vue3-sfc-loader handle this
    }
   },

   async getFile(url) {
 
     const res = await fetch(url);
     if ( !res.ok )
        throw Object.assign(new Error(url+' '+res.statusText), { res });
     return await {type: '.vue', getContentData: ()=>res.text()};
   },
 
   addStyle(textContent) {
 
     const style = Object.assign(document.createElement('style'), { textContent });
     const ref = document.head.getElementsByTagName('style')[0] || null;
     document.head.insertBefore(style, ref);
   },

   log(type, ...args) {
     
     console.log("vue3-sfc-loader log:");
     console[type](...args);
   }
 
 }
 
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
                this.$kytos.component(component.name, defineAsyncComponent( () => loadModule(url, options) ))
            }
        });
     },
     ...mapActions(useToolbarStore, ['loadComponents']),
  },
  computed: {
    ...mapState(useToolbarStore, ['toolbarItems'])
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
 