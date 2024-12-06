<template>
  <v-container fluid>
    <v-row>

      <v-dialog v-model="showEmailDialogue">
        <v-container class="fill-height" fluid>
          <v-row justify="center" align="center">
            <v-col cols="12" md="8" lg="6">
              <v-card elevation="3">
                <v-card-title>Email Page</v-card-title>
                <v-card-subtitle>Compose and send an email</v-card-subtitle>
                <v-card-text>
                  <v-form ref="emailForm" @submit.prevent="sendEmail">
                    <v-text-field v-model="email.to" label="Recipient" placeholder="Enter recipient email" required
                      type="email" :rules="[rules.required, rules.email]"></v-text-field>

                    <v-text-field v-model="email.subject" label="Subject" placeholder="Enter email subject" required
                      :rules="[rules.required]"></v-text-field>

                    <v-textarea v-model="email.body" label="Message" placeholder="Write your message here" rows="6"
                      auto-grow required :rules="[rules.required]"></v-textarea>


                    <v-card-action style="display: flex;justify-content:space-around">
                    <v-btn @click="showEmailDialogue=false" color="error" class="mt-4">
                      Cancel
                    </v-btn>
                    <v-btn type="submit" color="primary" class="mt-4" :disabled="!valid">
                      Send Email
                    </v-btn>
                  </v-card-action>

                    
                  </v-form>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-dialog>


      <v-dialog v-model="profileupatedStatus">
        <v-alert :text="profilenotifiaction.text" title="Notification" :type="profilenotifiaction.status"></v-alert>
      </v-dialog>
      <v-col v-col cols="2" class="fixed-section">
        <v-card>
          <v-row style="display: flex;justify-content: space-around;margin-top: 1%;">
            <v-card-title style="color: #1867C0;"><v-icon color="primary">mdi-account</v-icon>Profile</v-card-title>
            <v-btn style="text-align: center;background-color:#1867C0;color: white;" icon="mdi-wrench" size="small"
              @click="profileDialogue = true">
            </v-btn>
          </v-row>

          <v-dialog v-model="profileDialogue" width="500px">
            <v-form ref="form" v-model="formValid">
              <v-card style="padding: 2% 2% 2% 2%;">
                <v-card-title style="text-align: center;background-color:#1867C0;color: white;">Edit
                  Profile</v-card-title>
                <v-text-field label="User Name" hint="please choose unique name" outline :rules="UserNameRules"
                  v-model="profileDataUpdated.name"></v-text-field>
                <v-file-input disabled="true" required label="Profile Image" hint="Please choose your profile picture"
                  accept="image/*" :rules="[value => !!value || 'This field is required']"
                  v-model="profileDataUpdated.image"></v-file-input>
                <v-card-action style="display: flex;justify-content: space-around;">
                  <v-btn color="error" @click="profileDialogue = false"><v-icon>mdi-close</v-icon></v-btn>
                  <v-btn color="primary" :disabled="!formValid"
                    @click="updateprofile()"><v-icon>mdi-content-save</v-icon></v-btn>
                </v-card-action>

              </v-card>
            </v-form>
          </v-dialog>

          <div style="display: flex;justify-content: center;">
            <v-avatar rounded="10" size="150">
              <v-img height="100%" :src="profileData.imagePath" cover>
              </v-img>
            </v-avatar>
          </div>
        </v-card>
      </v-col>

      <v-col v-col cols="10">
        <v-card>
          <v-card-title
            style="text-align: center;background-color:#1867C0;color: white;"><v-icon>mdi-rss</v-icon>Feed</v-card-title>
          <div class="scrollable-content">
            <v-skeleton-loader type="card" :loading="loading">
              <v-card style="margin-bottom: 2%;" width="100%" v-for="i in feedData" :key="i" :title="i.data['title']"
                :subtitle="`${i.created_at}/${i.data['genra']}`">
                <div style="display: flex;justify-content: center;">
                  <!-- <img src="" alt="">      -->
                </div>
                <v-card-text>
                  <span>{{ i.data['content'] }}</span>
                </v-card-text>
                <v-card-actions>
                  <v-btn @click="likePost(i)"><v-icon color="red">mdi-heart-circle</v-icon>Like ({{ i.like_by ?
                    i.like_by.length : '' }})</v-btn>
                  <v-btn @click="i.comment_status = true"><v-icon color="grey">mdi-comment</v-icon>Comment ({{
                    i.comments.length }})</v-btn>
                  <v-btn @click="showEmailDialogue = true"><v-icon color="primary">mdi-share</v-icon>Share</v-btn>
                </v-card-actions>

                <v-dialog v-model="i.comment_status" width="500px">
                  <v-card style="padding: 1% 1% 1% 1%;">
                    <v-card-title style="text-align: center;">
                      Comment
                    </v-card-title>
                    <v-textarea v-model="commentdata" label="Leave a comment" outlined rows="4"
                      hint="Type your comment here"></v-textarea>

                    <v-card-subtitle>
                      <div style="max-height: 50px; overflow-y: auto;">
                        <div v-for="comment in i.comments" :key="comment">
                          {{ comment['comment_context'] }} --<span class="text-caption text-primary">{{
                            comment['comment_by'] }}</span>
                        </div>
                      </div>
                    </v-card-subtitle>

                    <v-card-action style="display: flex;justify-content: space-around;">
                      <v-btn color="error" @click="i.comment_status = false"><v-icon>mdi-close</v-icon></v-btn>
                      <v-btn color="primary" @click="CommentBoxdata(i)"><v-icon>mdi-content-save</v-icon></v-btn>
                    </v-card-action>
                  </v-card>
                </v-dialog>
              </v-card>
            </v-skeleton-loader>
          </div>
        </v-card>

        <v-btn style="margin-top: 1%;" color="primary" @click="dialog = true">
          <v-icon>
            mdi-plus
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" width="1000px">
      <v-card style="padding: 1% 1% 1% 1%;">
        <v-card-title style="text-align: center;">POST</v-card-title>
        <v-row>
          <v-col>
            <v-text-field required label="Title" v-model="postData.title"
              :rules="[value => !!value || 'This field is required']" outlined
              hint="please enter the title of the post">
            </v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-textarea required label="Content" v-model="postData.content"
              :rules="[value => !!value || 'This field is required']" outlined
              hint="please enter the content of the post">
            </v-textarea>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-select required label="Genra" v-model="postData.genra"
              :rules="[value => !!value || 'This field is required']"
              :items="['Music', 'Movie', 'Sports', 'Blog', 'Education', 'Anime']" outlined
              hint="please select the Genra of the post">
            </v-select>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-file-input required label="Image Upload" chips multiple accept="image/*"
              :rules="[value => !!value || 'This field is required']" v-model="image"></v-file-input>
          </v-col>
        </v-row>

        <v-card-action style="display: flex;justify-content:space-evenly;">
          <v-btn @click="dialog = false" color="error"><v-icon>mdi-close</v-icon></v-btn>
          <v-btn :disabled="postData.title === '' || postData.content === '' || postData.genra === '' || image === null"
            @click="savePost" color="primary"><v-icon>mdi-content-save</v-icon></v-btn>
        </v-card-action>
      </v-card>
    </v-dialog>
  </v-container>
</template>


<script>
import axios from 'axios';
export default {
  name: 'HomeComponent',
  data() {
    return {
      email: {
        to: "",
        subject: "",
        body: "",
      },
      rules: {
        required: (value) => !!value || "This field is required.",
        email: (value) =>
          /.+@.+\..+/.test(value) || "Enter a valid email address.",
      },
      showEmailDialogue: false,
      UserNameRules: [
        (v) => !!v || "Username is required.", // Check if field is not empty
        (v) => v.length >= 3 || "Username must be at least 3 characters.",
        (v) => v.length <= 10 || "Username must be at most 10 characters.",
        (v) => !/\s/.test(v) || "Username must not contain spaces.",
      ],
      profileDataUpdated: {
        name: '',
        image: null
      },
      profileDialogue: false,
      profileupatedStatus: false,
      profileData: {
        name: '',
        imagePath: 'https://cdn.vuetifyjs.com/images/profiles/marcus.jpg'
      },
      commentdata: '',
      loading: false,
      showCommentBox: false,
      dialog: false,
      postData: {
        title: '',
        content: '',
        genra: ''
      },
      image: null,
      profilenotifiaction: {
        status: '',
        text: ''
      },
      feedData: null

    }
  },
  computed: {
    valid() {
      const { to, subject, body } = this.email;
      return !!to && !!subject && !!body && this.rules.email(to);
    },
  },
  methods: {
    sendEmail() {
      alert(`Email sent to ${this.email.to}`);
      // Add API call or email sending logic here
      this.resetForm();
      this.showEmailDialogue = false
    },
    resetForm() {
      this.email = { to: "", subject: "", body: "" };
    },
    updateprofile() {
      let userdata = JSON.parse(sessionStorage.getItem('userData'))
      this.loading = true

      axios.post('http://127.0.0.1:5000/updateProfile', {
        name: userdata['name'],
        email: userdata['email'],
        new_name: this.profileDataUpdated.name
      }).then(response => {
        console.log('Response:',);
        if (response.data.msg == "Profile successfully saved") {


          this.profilenotifiaction.status = 'success'
          this.profilenotifiaction.text = response.data.msg
        }
        else {
          this.profilenotifiaction.status = 'warning'
          this.profilenotifiaction.text = response.data.msg
        }

        this.profileDialogue = false
        this.getAllPost()
        this.profileupatedStatus = true
        sessionStorage.setItem('userData',)



        sessionStorage.setItem('userData', JSON.stringify({
          name: this.profileDataUpdated.name,
          email: userdata['email']
        }));

        this.loading = false
      }).catch(error => {
        console.error('Error:', error);
        this.loading = false
      });

      console.log("sessionStorage.getItem('userData')", sessionStorage.getItem('userData'))

    },

    CommentBoxdata(data) {
      this.loading = true
      console.log(this.commentdata)
      let userdata = JSON.parse(sessionStorage.getItem('userData'))
      axios.post('http://127.0.0.1:5000/commentsPost', {
        name: userdata['name'],
        comment_context: this.commentdata,
        post_id: data['post_id']


      }).then(response => {
        console.log('Response:', response);
        data['comment_status'] = false
        this.getAllPost()
        this.commentdata = ''
        this.loading = false

      }).catch(error => {
        console.error('Error:', error);
        this.showCommentBox = false
        this.loading = false
      });


    },
    likePost(data) {
      console.log("checkigcheckig", data['post_id'])
      let userdata = JSON.parse(sessionStorage.getItem('userData'))
      axios.post('http://127.0.0.1:5000/likePost', {
        name: userdata['name'],
        email: userdata['email'],
        post_id: data['post_id']

      }).then(response => {
        console.log('Response:', response);
        // this.dialog = false
        this.getAllPost()
      }).catch(error => {
        console.error('Error:', error);
      });


    },
    savePost() {
      this.loading = true
      const formData = new FormData();
      let data = JSON.parse(sessionStorage.getItem('userData'))
      formData.append('name', data['name']);
      formData.append('email', data['email']);
      formData.append('data', JSON.stringify(this.postData));
      this.image.forEach(file => {
        formData.append('image', file);
      })

      console.log("formDataformData", formData)
      axios.post('http://127.0.0.1:5000/createPost', formData).then(response => {
        console.log('Response:', response);
        this.dialog = false
        this.getAllPost()
        this.postData['title'] = ''
        this.postData['content'] = ''
        this.postData['genra'] = ''
        this.image = null
        this.loading = false

      }).catch(error => {
        console.error('Error:', error);
        this.loading = false
      });

      console.log("this.postDatathis.postData", JSON.stringify(this.postData), this.image)
      if (sessionStorage.getItem('userData') !== null) {
        console.log("data", JSON.parse(sessionStorage.getItem('userData')))
      }
    },

    getAllPost() {
      this.loading = true
      this.feedData = []
      let data = JSON.parse(sessionStorage.getItem('userData'))
      this.profileData.name = data['name']
      axios.get('http://127.0.0.1:5000/getAllPost', {
        params: {
          name: data['name'],
          email: data['email'],
        },
        responseType: 'json'  // Make sure the response is interpreted as JSON

      }
      ).then(response => {
        console.log('Response123:', response);
        this.feedData = response['data']['data']
        console.log("this.feedData", this.feedData)
        this.loading = false
      }).catch(error => {
        console.error('Error:', error);
        this.loading = false
      });
    }
  },
  mounted() {
    this.getAllPost()
  }
}
</script>

<style scoped>
.fixed-section {
  height: 400px;
  /* Set height for fixed sections */
  display: flex;
  flex-direction: column;
}



.scrollable-content {
  overflow-y: auto;
  max-height: 500px;
  /* Make the content scrollable */
  padding: 10px;
  /* Add some padding for aesthetics */
}
</style>