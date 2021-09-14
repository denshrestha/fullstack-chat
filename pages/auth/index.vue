<template>
  <v-row justify="center" align="center" class="fill-height">
    <v-col cols="7">
      <v-card class="px-6 py-2">
        <v-card-title class="d-flex justify-center align-center">LOGIN</v-card-title>
        <v-divider></v-divider>
        <login-form/>
          <v-snackbar
            :timeout="-1"
            v-model="openSnackBar"
            color="error"
          >
            {{error}}
          </v-snackbar>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "Auth",
  layout: 'login',
  components: {
    loginForm: () => import('@/components/forms/login-form')
  },
  computed: {
    error(){
      return this.$store.state.auth.errorMessage
    },
    openSnackBar(){
      return !!this.$store.state.auth.errorMessage
    }
  }
}
</script>

<style scoped>

</style>
