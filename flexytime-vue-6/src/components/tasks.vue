<template>
  <div>
      <h3 class="text-center">Items 1 - timeline</h3>
      <p class="border-bottom ">{{getItems}} </p>
      <h3 class="text-center border-bottom ">Items 2 - activities</h3>
      <p>{{getItems2}} </p>
  </div>
</template>


<script>
import { mapGetters, mapState, mapActions } from 'vuex';

export default {
    name : 'tasks', 
    computed : {
        ...mapGetters([
          'getItems',
          'getItems2',
        ]),  
    },
    created(){ 
      this.$store.dispatch("initApp")
    },
};


</script>

<style scoped src="../../src/assets/css/multiple.css">

</style>