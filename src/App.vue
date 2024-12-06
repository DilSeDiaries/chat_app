<template>
  <div v-if="loginStatus">
    <v-app>
    <NavigationBar />
    <v-main>
    <router-view ></router-view>
  </v-main>
  </v-app>
</div>
<div v-else>
  <LoginComponent  @loginStatus="loginStatusCall"/>
</div>
  
</template>
 <script>
import NavigationBar from './views/NavigationBar.vue';
import LoginComponent from './views/LoginComponent.vue';
export default{
  name:'App',
  components:{
    NavigationBar,
    LoginComponent
  },
  data(){
    return{
      loginStatus:false
    }
  },
  methods:{
    loginStatusCall(data) {
      this.loginStatus = data['status'];
      console.log("Sumit",data['name'])
      console.log(data['email'])
      sessionStorage.setItem('userData', JSON.stringify(data));

    }
  }
}
</script>
