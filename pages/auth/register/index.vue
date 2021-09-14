<template>
  <v-row justify="center" align="center" class="fill-height">
    <v-col cols="7">
      <v-card class="px-6 py-2">
        <v-card-title class="d-flex justify-center align-center">REGISTER</v-card-title>
        <v-divider></v-divider>
        <create-register-form
          :createUser="false"
        />
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "Register",
  layout: 'login',
  components: {
    createRegisterForm: () => import('@/components/forms/create-register-form')
  },
}
</script>

<style scoped>

</style>
