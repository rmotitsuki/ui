<template>
  <div class='k-napps-info-panel'>
   <component v-show="false" v-for="component in components" :is="component.name" v-bind:key="component.name"></component>
  </div>
 </template>
 
 <script>
  import { mapActions } from 'pinia'
  import { useNappStore } from '../../../stores/nappStore'

 export default {
   name: 'k-napps-info-panel',
   data () {
     return {
       url: this.$kytos_server+ 'ui/k-info-panel',
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
        if (response.data) {
          this.components = this.components.concat(response.data)
        }
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
 