<template>
  <v-app dark>
    <v-app-bar app class="d-flex justify-center">
      <v-app-bar-title>Nuxt test APP</v-app-bar-title>
    </v-app-bar>
    <v-main app>
      <v-container class="fill-height">
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "login"
}
</script>

<style scoped>

</style>
