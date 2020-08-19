<template>
  <div>
    <div class="d-flex align-items-center justify-content-center mt-5 activity-col" v-if="isEmpty">
      <div>
        <i class="fas fa-info-circle info-circle fa-2x"></i>
      </div>
      <div class="activity-empty-content">
        <h6 class="text-center activity-header">Herhangi bir aktivite seçilmedi</h6>
        <p class="text-center">Yeni zaman girişi oluşturmak için etkinlik seçiniz</p>
      </div>
    </div>

    <div v-else>
      <div class="timeline-contents">
        <div class="timeline-card" v-for="(itemApp, appIndex) in getItems2" :key="appIndex">
          <div v-if="itemApp.time"> <!-- v-if="itemApp.checked" -->
            <div
              class="card-header d-flex justify-content-between align-items-center ml-3 bg-white line-horizontal-blue"
            >
              <div class="d-flex align-items-center">
                <div class="roundmd mr-4 mt-1">
                  <input
                    type="checkbox"
                    :id="'checkbox-'+'-'+appIndex"
                    class="midCheckbox"
                    :checked="itemApp.checked"
                    @click="changeChildren(itemApp)"
                  />
                  <label :for="'checkbox-'+'-'+appIndex"></label>
                </div>
                <img :src="itemApp.img" class="img-fluid vs-code mr-1" alt />
                <span class="boldV2">{{itemApp.title}}</span>
              </div>
              <div>
                <span class="boldV2">{{itemApp.time}}</span>
              </div>
            </div>
            <div  class="" v-for="(itemDoc, docIndex) in itemApp.items" :key="docIndex" >

              <div class="card-body  d-flex justify-content-between align-items-center ml-3" v-if="itemDoc.checked"> <!-- v-if="itemDoc.checked" -->
                <div class="ml-4 d-flex align-items-center">
                  <div class="roundmd mr-3 mt-1">
                    <input
                      type="checkbox"
                      :id="'checkbox-'+'-'+appIndex+'-'+docIndex"
                      class="childCheckbox"
                      :checked="itemDoc.checked"
                      @click="changeChildren(itemApp, itemDoc)"
                    />
                    <label :for="'checkbox-'+'-'+appIndex+'-'+docIndex"></label>
                  </div>
                  <div class="inside-content d-flex align-items-center">
                    <img :src="itemDoc.imageUrl" class="img-fluid vs-sm mr-1" alt />
                    <span class="decrease-fontV2">{{ itemDoc.title }}</span>
                  </div>
                </div>
                <div>
                  <span class="decrease-fontV2">{{ itemDoc.time }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";

export default {
  name: "activities",
  data() {
    return {
      newArray: [],
    };
  },
  methods: {
    changeChildren(itemApp, itemDoc){

      if(itemDoc){
        itemDoc.checked = !itemDoc.checked
        if(itemDoc.checked == false){
          itemApp.checked = false
          itemApp.time = itemApp.time - itemDoc.time
        }
        this.$store.dispatch("changeCheck", itemDoc);
        return
      }
      if(itemApp){

        itemApp.checked = !itemApp.checked
        for(let i = 0; i < itemApp.items.length; i++){
          const itemDoc = itemApp.items[i]
          this.changeChildren(itemApp, itemDoc)
        }
        this.$store.dispatch("changeCheck", itemApp);
        return
      }
      
    }

    // changeChildren(item) {

    //   if (item) {
    //     for (let i = 0; i < item.length; i++) {
    //       const item = item[i];
    //       this.changeChildren(item);
    //     }
    //   }
    //   if (item.items) {
    //     for (let i = 0; i < item.items.length; i++) {
    //       const items = item.items[i];
    //       items.checked = !item.checked;
    //     }
    //   }
    //   item.checked = !item.checked;
    //   this.$store.state.isEmpty = false;
    //   //debugger
      
    //   this.$store.dispatch("changeCheck", item);
    // },
  },
  computed: {
    ...mapState(["isEmpty"]),
    ...mapGetters(["getItems", "getItems2"]),
  },
  created() {
    this.$store.dispatch("initApp");
  },
  //  watch: {
  //    getItems2: {

  //      deep: true,

  //      handler(item) {
  //       if(item) {
  //         item.forEach(elementItem => {
  //           console.log("elementITEM : ", elementItem)
  //           if(elementItem.checked === true){
  //             if(elementItem.itemApp){
  //               if(elementItem.itemApp.checked === true){
  //                 elementItem.itemApp.forEach(elementApp => {
  //                   // console.log("elementApp.title : ",elementApp.title)
  //                   var elementDeneme = elementItem.itemApp.map(deneme => deneme.title)
  //                   this.newArray.push(elementDeneme)

  //                   var findElement = this.newArray.filter( (deneme2) => {
  //                     return deneme2 = "Youtube"
  //                   })
  //                   if(findElement == true){
  //                     console.log("true")
  //                   }else{
  //                     console.log("false")
  //                     console.log(findElement)
  //                   }

  //                   if(elementApp.itemDocument){
  //                     elementApp.itemDocument.forEach(elementDoc => {
  //                     //console.log("elementDoc.title : ",elementDoc.title)
  //                     })
  //                   }
  //                 })
  //               }
  //             }
  //           }
  //         });
  //       }
  //      console.log("this.newArray : ", this.newArray)
  //       console.log("------------------")

  //      },
  //    }

  //  }
};
</script>


<style scoped src="../../src/assets/css/multiple.css">
</style>