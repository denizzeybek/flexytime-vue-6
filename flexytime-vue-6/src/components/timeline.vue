<template>
  <div>
    <div class="item" v-for="(item, titleIndex) in getItems" :key="titleIndex">
      <div class="d-flex align-items-center justify-content-start mt-2 py-2 line-horizontal-blue">
        <div class="round mr-4 mb-2 ml-2">
          <input
            type="checkbox"
            :id="'checkbox-'+titleIndex"
            class="parentCheckbox"
            :checked="item.checked"
            @click="changeChildren(item)"/> 
          <label :for="'checkbox-'+titleIndex"></label>
        </div>
        <div>
          <h5 class>{{item.title}}</h5>
        </div>
      </div>
      <div class="timeline-contents">
        <div class="timeline-card" v-for="(itemApp, appIndex) in item.itemApp" :key="appIndex">
          <div class="card-header d-flex justify-content-between align-items-center ml-3 bg-white">
            <div class="d-flex align-items-center">
              <div class="roundmd mr-4 mt-1">
                <input
                  type="checkbox"
                  :id="'checkbox-'+titleIndex+'-'+appIndex"
                  class="midCheckbox"
                  :checked="itemApp.checked"
                  @click="changeChildren(item, itemApp)" />
                <label :for="'checkbox-'+titleIndex+'-'+appIndex"></label>
              </div>
              <img :src="itemApp.imageUrl" class="img-fluid vs-code mr-1" alt />
              <span class="bold">{{itemApp.title}}</span>
            </div>
            <div>
              <span class="bold">{{itemApp.time}}</span>
            </div>
          </div>
          <div class="card-body d-flex justify-content-between ml-3" v-for="(itemDoc, docIndex) in itemApp.itemDocument"
            :key="docIndex" >
            <div class="ml-4 d-flex align-items-center">
              <div class="roundmd mr-3 mt-1">
                <input
                  type="checkbox"
                  :id="'checkbox-'+titleIndex+'-'+appIndex+'-'+docIndex"
                  class="childCheckbox"
                  :checked="itemDoc.checked"
                  @click="changeChildren(item, itemApp, itemDoc)"  />
                <label :for="'checkbox-'+titleIndex+'-'+appIndex+'-'+docIndex"></label>
              </div>
              <div class="inside-content d-flex align-items-center">
                <img :src="itemDoc.imageUrl" class="img-fluid vs-sm mr-1" alt />
                <span class="decrease-font">{{ itemDoc.title }}</span>
              </div>
            </div>
            <div>
              <span class="decrease-font">{{ itemDoc.time }}</span>  
            </div> 
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script> 
import {mapGetters, mapState, mapActions} from 'vuex'
export default {
    name : 'timeline',
    data(){
        return{
          isEmpty: true,
          items: [], 
          items2 : [],
        }
    }, 
    methods : { 
      
       changeChildren(itemTitle,itemApp,itemDoc){

        this.$store.state.isEmpty = false
        if(itemDoc){
          itemDoc.checked = !itemDoc.checked
          if(itemDoc.checked == false){
            itemTitle.checked =false
            itemApp.checked = false
          }
          if(itemDoc.checked == true){
            itemApp.checked = true
          }
          var clickedDocument = { appTitle: itemApp.title, ...itemDoc }
          this.$store.dispatch("pushToNewArray",clickedDocument)
          return
        }
        if(itemApp){
          itemApp.checked = !itemApp.checked
          if(itemApp.checked == true){
            itemTitle.checked = true
          }
          for(let i=0;i<itemApp.itemDocument.length; i++){
            const itemDoc = itemApp.itemDocument[i];
            this.changeChildren(itemTitle,itemApp,itemDoc);
          }
          return;
        }
        
        if(itemTitle) {
          itemTitle.checked = !itemTitle.checked
          for(let i=0;i<itemTitle.itemApp.length; i++){
            const iapp = itemTitle.itemApp[i];  
            this.changeChildren(itemTitle,iapp,null);
             
          }
          return;
        }

        
      },   
    },
    computed : {
        ...mapGetters([ 
          "getItems", 
        ]),  
    },   
    created(){
      this.$store.dispatch("initApp") ;
      //this.$store.dispatch("init2App") ;
    }
};
</script>


<style scoped src="../../src/assets/css/multiple.css">

</style>