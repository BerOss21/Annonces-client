import { createStore } from "vuex";
import axios from "axios";
export default createStore({
  state: {
     annoucements:"",
     categories:"",
     cities:"",
     storage:(localStorage.getItem("user") || sessionStorage.getItem("user")) || ""
  },
  getters: {
    user: state => {
      let user=state.storage?(JSON.parse(state.storage)):("");
      return user;
    }
  },
  mutations: {
     updateStorage(state){
       state.storage=(localStorage.getItem("user") || sessionStorage.getItem("user")) || "";
     } 
  },
  actions: {
      getAnnoucements({state}){
          axios.get("/api/annoucements").then(res=>{
            if(res.data.annoucements){
                state.annoucements=res.data.annoucements
            }
          }).catch(err=>{
            console.log("error",err)
          })
      },
      getCategories({state}){
        axios.get("/api/categories").then(res=>{
          if(res.data.success){
              state.categories=res.data.categories
          }
        })
      },
      getCities({state}){
        axios.get("/api/cities").then(res=>{
          if(res.data.cities){
              state.cities=res.data.cities
          }
        })
      }
  },
  modules: {

  }
});
