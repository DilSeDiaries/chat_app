<template>
  <v-container class="fill-height">
    <v-row class="align-center justify-center" style="height: 100%;">
      <!-- Left Column: Image -->
      <v-col cols="12" md="6">
        <img :src="giphyImage" alt="Giphy Animation" class="giphy-image" />
      </v-col>

      <!-- Right Column: Form -->
      <v-col cols="12" md="4">
        <v-form ref="form" v-model="formValid">
          <v-card class="pa-4" width="500" :style="loginCardStyle">
            <v-card-title style="text-align: center;margin-bottom: 5%;color:#83ADDD;">Dil Se Diaries</v-card-title>
            <v-row>
              <v-text-field
                color="primary"
                v-model="UserName"
                :rules="UserNameRules"
                label="User Name"
                outlined
              ></v-text-field>
            </v-row>
            <v-row>
              <v-text-field
                color="primary"
                v-model="email"
                :rules="emailRules"
                label="Email"
                outlined
              ></v-text-field>
            </v-row>

            <!-- Error Message -->
            <v-row v-if="errorMessage" class="justify-center">
              <v-alert type="error" :value="true">{{ errorMessage }}</v-alert>
            </v-row>

            <!-- Login Button -->
            <v-row class="justify-center">
              <v-btn color="primary" :disabled="!formValid" @click="handleLogin">
                Login
              </v-btn>
            </v-row>
          </v-card>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      borderColor: "#1867C0",
      giphyImage: require("@/assets/giphy.webp"),
      UserName: "",
      errorMessage: '',
      formValid: false,
      UserNameRules: [
        (v) => !!v || "Username is required.", // Check if field is not empty
        (v) => v.length >= 3 || "Username must be at least 3 characters.",
        (v) => v.length <= 10 || "Username must be at most 10 characters.",
        (v) => !/\s/.test(v) || "Username must not contain spaces.",
      ],
      email: "",
      emailRules: [
        (v) => !!v || "Email is required.",
        (v) =>
          /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v) || "Invalid email address.",
      ],
    };
  },
  computed: {
    loginCardStyle() {
      return `border: 5px solid ${this.borderColor};`;
    },
  },

  methods: {
    async handleLogin() {
      this.errorMessage = ''; // Reset error message before the login attempt
      if (this.$refs.form.validate()) {
        try {
          const response = await axios.get("http://127.0.0.1:5000/login", {
            params: {
              name: this.UserName,
              email: this.email,
            },
          });

          if (response.status === 200) {
            if (response.data.msg === 'valid user!') {
              this.$emit('loginStatus', { status: true, name: this.UserName, email: this.email });
              this.UserName = '';
              this.email = '';
            } else {
              // this.errorMessage = 'Invalid User';
              this.borderColor = 'red'
              setTimeout(() => {
                console.log('5 seconds later');
                this.borderColor = '#1867C0'
                }, 500);

            }
          }
        } catch (error) {
          this.errorMessage = 'Error occurred while processing the login request.';
        }
      } else {
        this.errorMessage = 'Please fill in valid details.';
      }
    },
  },
};
</script>

<style>
/* Container Full Height */
.fill-height {
  height: 100vh;
  /* Full viewport height */
}

/* Image Styling */
.giphy-image {
  max-width: 100%;
  /* Ensures responsiveness */
  height: auto;
  /* Maintain aspect ratio */
}

/* Optional: Style for the Card */
.v-card {
  background-color: #f9f9f9;
}
</style>
