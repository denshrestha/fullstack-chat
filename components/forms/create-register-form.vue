<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-row>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="firstName"
          :rules="nameRules"
          label="First name"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="lastName"
          :rules="nameRules"
          label="Last name"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :return-value.sync="date"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{on, attrs}">
            <v-text-field
              v-model="dateText"
              append-icon="mdi-calendar"
              readonly
              label="Birth date"
              v-bind="attrs"
              v-on="on"
            >

            </v-text-field>
          </template>
          <v-date-picker
            v-model="date"
            header-color="primary"
            color="primary"
            :show-current="today"
          >
          </v-date-picker>
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="menu = false"
          >Cancel</v-btn>
          <v-btn
            text
            color="primary"
            @click="save"
          >Save</v-btn>
        </v-menu>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="password"
          :rules="passwordRules"
          label="Password"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="repeatPassword"
          :rules="[
            v => !!v || 'This field is required',
            v => v === password || 'Passwords should be equal'
          ]"
          label="Repeat password"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-file-input
          :rules="fileRules"
          accept="image/png, image/jpeg, image/bmp"
          placeholder="Pick an avatar"
          prepend-icon="mdi-camera"
          label="Avatar"
          @change="handleFile"
        ></v-file-input>
      </v-col>
      <v-col cols="12" class="d-flex justify-space-between align-center">
        <v-btn icon @click="$router.go(-1)" v-if="!createUser">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-btn
          @click="validate"
          color="primary"
          :loading="loading"
        >
          Register
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
export default {
  name: "create-register-form",
  props: {
    createUser: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    firstName: '',
    lastName: '',
    nameRules: [v => !!v || 'This field is required'],
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    password: '',
    passwordRules: [
      v => !!v || 'Password is required',
      v => v.length > 6 || 'Must be more that 6 characters.'
    ],
    repeatPassword: '',
    date: '',
    dateRule: [v => !!v || 'This field is required'],
    valid: true,
    menu: false,
    today: '',
    loading: false,
    fileRules: [
      value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!',
    ],
    file: ''
  }),
  created() {
    this.date = this.today = new Date().toISOString().slice(0, 10)
  },
  computed: {
    dateText(){
      return this.date
    }
  },
  methods: {
    validate(){
      this.valid = this.$refs.form.validate()
      if(this.valid){
        const age = this.getAge(this.date)
        const birthDate = this.$moment(this.date).format('DD-MM-YYYY')
        const formData = new FormData()
        formData.append('fullName', this.firstName + ' ' + this.lastName)
        formData.append('birthDate', birthDate)
        formData.append('age', age)
        formData.append('email', this.email)
        formData.append('password', this.password)
        formData.append('avatar', this.file)
        this.$store.dispatch('auth/register', formData)
        .then((resp) => {
          if(resp){
            this.$router.push('/auth')
          }
        })
      }
    },
    handleFile(file){
      this.file = file
    },
    save(){
      this.$refs.menu.save(this.date)
    },
    getAge(date){
      const todayYear = new Date().getFullYear()
      const birthDayYear = new Date(date).getFullYear()
      return todayYear - birthDayYear
    }
  }
}
</script>

<style scoped>

</style>
