<template>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Meet Online</v-toolbar-title>
  
      <!-- Navigation Menu -->
      <v-spacer></v-spacer>
      <v-btn text @click="goHome">Home</v-btn>
      <v-btn text @click="goAbout">About</v-btn>
      <v-btn text @click="goContact">Contact</v-btn>
  
      <!-- Right-aligned items (e.g., login, profile) -->
      <v-btn icon @click="toggleDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
  </template>
  
  <script>
  export default {
    name: 'NavBar',
    methods: {
      goHome() {
        this.$router.push('/');
      },
      goAbout() {
        this.$router.push('/about');
      },
      goContact() {
        this.$router.push('/contact');
      },
      toggleDrawer() {
        // Logic for a drawer or sidebar (optional)
        console.log("Toggle drawer action.");
      }
    }
  };
  </script>
  
  <style scoped>
  /* You can add custom styles here if needed */
  </style>
  