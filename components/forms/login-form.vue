<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      append-icon="mdi-email"
      v-model="email"
      :rules="emailRules"
      label="E-mail"
      required
    ></v-text-field>
    <v-text-field
      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      :type="showPassword ? 'text' : 'password'"
      @click:append="showPassword = !showPassword"
      v-model="password"
      :rules="passwordRules"
      label="Password"
      required
    ></v-text-field>
    <div class="mt-4">
      <v-btn @click="validate" color="primary">
        Login
      </v-btn>
      <v-btn link text @click="$router.push('/auth/register')">
        Register
      </v-btn>
    </div>
  </v-form>
</template>

<script>
export default {
  name: "login-form",
  data: () => ({
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
    valid: true,
    showPassword: false
  }),
  methods: {
    validate () {
      this.valid = this.$refs.form.validate()
      if(!this.valid) return
      this.$store.dispatch('auth/login', {
        email: this.email,
        password: this.password
      })
      .then((resp) => {
        if(resp){
          this.$router.push(`/profile/${resp.id}`)
        }
      })
    },
  }
}
</script>

<style scoped>

</style>
