import { createStore } from "vuex";
import axios from "axios";
export default createStore({
  state: {
     annoucements:"",
     annoucement:"",
     filter:"",
     categories:"",
     cities:"",
     notifications:"",
     unreadNotifications:"",
     storage:(localStorage.getItem("user") || sessionStorage.getItem("user")) || ""
  },
  getters: {
    user: state => {
      let user=state.storage?(JSON.parse(state.storage)):("");
      return user;
    },
    popular:state=>{
      function compare( a, b ) {
        if ( a.views < b.views ){
          return 1;
        }
        if ( a.views > b.views ){
          return -1;
        }
        return 0;
      }
      let annouce= JSON.parse(JSON.stringify(state.annoucements));//deep clone
      return annouce?annouce.sort( compare ).slice(0,6):[]
    }
  },
  mutations: {
     updateStorage(state){
       state.storage=(localStorage.getItem("user") || sessionStorage.getItem("user")) || "";
     },
     updateNotifications(state){
      state.notifications="";
      state.unreadNotifications="";
    },
     clearAnnoucement(state){
       state.annoucement=""
     },
     filter(state,{category,city,q}){
          console.log("obj",category);
          if(q || city || category){
            state.filter=state.annoucements.filter(item=>{
              return (item.category_id==category || !category)&& (item.cities.map(i=>i.id).includes(city) || !city) && (item.title.toLowerCase().match(q.toLowerCase()) || !q)
            })
          }
          else{
            state.filter=JSON.parse(JSON.stringify(state.annoucements));
          }
          
     }
  },
  actions: {
      getAnnoucements({state}){
          axios.get("/api/annoucements").then(res=>{
            if(res.data.annoucements){
                state.annoucements=res.data.annoucements
                state.filter=res.data.annoucements
            }
          }).catch(err=>{
            console.log("error",err)
          })
      },
      getSingle({state},id){
          axios.get(`/api/annoucements/${id}`).then(res=>{
            console.log("res",res.data)
            state.annoucement=res.data.annoucement
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
      },
      getNotifications({state,getters}){
          axios.get(`/api/notifications/${getters.user.id}`, {
              headers: {
                  "Authorization": `Bearer ${getters.user.token || ""}`
              }
          }).then(res=>{
              state.notifications=res.data.notifications;
              state.unreadNotifications=res.data.unreadNotifications;
          }).catch(err=>{
              console.log("error",err);
          })
        }
  },
  modules: {

  }
});
