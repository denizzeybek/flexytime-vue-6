import Vue from "vue";
import Vuex from "vuex";


Vue.use(Vuex);

const state = {
  isEmpty: true,
  items: [],
  items2 : []
};
const getters = {
  getItems(state) {
    return state.items;
  },
  getItems2(state){ 
      return state.items2;
  }
};
const mutations = {
  updateItems(state, payload) {
    state.items2 = payload ; 
  },
  updateCheck(state, payload){ //payload = items2, içine girdiğim items. Eğer payload ın child ı uncheck olursa  
                              // items ın child ı da uncheck olmalı.
    for(let i = 0; i< state.items.length; i++) {
        var itemTitle = state.items[i];
        for(let j = 0; j < itemTitle.itemApp.length; j++){
          var itemApp = itemTitle.itemApp[j];

          for(let k =0; k < itemApp.itemDocument.length ; k++){
             var itemDoc = itemApp.itemDocument[k];

             if(itemDoc.title == payload.title){
               itemTitle.checked = false
               itemApp.checked =false
               itemDoc.checked = false
             } 
          }
        }
    }
  }, 


};
const actions = {
  initApp({ commit }) {
    fetch("./data.json")
      .then(res => {
        return res.json();
      })
      .then(res => {
        try {
          //state.isEmpty = false
          state.items = res.items;
          for (let item in res.items) {
            items[item] = item;
          }
          console.log("items:" + state.items)
        } catch (error) {

        }
      });
  }, 
  pushToNewArray({commit},payload){
    
      for (var i = 0 ; i< state.items2.length; i++){
        var parent = state.items2[i];
        if (parent.title == payload.appTitle){
          if(payload.checked == true){
            parent.checked = true
          }
          if(payload.checked == false){
            parent.checked = false
          }
          for(var j=0; j<parent.items.length; j++){
             var child = parent.items[j];
             // buraya girmiyor girse liste 2 den de silecek.
             if( child.title == payload.title ) {
                if(payload.checked == true){
                     child.time += payload.time
                     parent.time += payload.time
                     child.checked = true
                }
                if(payload.checked == false) {
                     child.time -= payload.time
                     parent.time -= payload.time
                     child.checked = false
                     parent.checked = false
                     parent.items.splice(j,1)
                 }
                 return
             }
          }
          parent.items.push (payload)
          parent.time += payload.time
          return
        }
      }
      state.items2.push({title:payload.appTitle, img:payload.imageUrl, time:payload.time, items:[payload], checked:true }) 
      //burdan mutations a erişicem
      //commit("updateItem",payload) //mutations u çalıştırdım.
  },
  changeCheck({commit}, payload ){
    commit("updateCheck", payload)
  }
};

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});

export default store;
