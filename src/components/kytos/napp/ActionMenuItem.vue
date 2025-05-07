<template>
  <div class='k-action-menu-item' >
   <component v-show="false" v-for="component in components" :is="component.name" v-bind:key="component.name"></component>
  </div>
 </template>
 
 <script>
  import { mapActions } from 'pinia'
  import { useNappStore } from '../../../stores/nappStore'
 
 export default {
   name: 'k-action-menu-item',
   data () {
     return {
       url: this.$kytos_server+ 'ui/k-action-menu',
       components: [],
     }
   },
   created() {
    this.fetchData();
   },
   methods: {
    async fetchData() {
      try {
        const response = await this.$http.get(this.url);
        this.components = this.components.concat(response.data)
      } catch (err) {
        console.error(err)
      } finally {
        this.registerComponents(this, this.components);
      }
     },
     ...mapActions(useNappStore, ['registerComponents'])
   }
 };
 </script>
 