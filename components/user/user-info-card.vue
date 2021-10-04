<template>
  <v-card class="accent pa-3">
    <v-row align="center">
      <v-col cols="12" md="4">
        <v-avatar size="150">
          <v-img :src="`../${user.avatar}` || require(`../../assets/plaseholder.jpeg`)" cover alt="avatar"/>
        </v-avatar>
      </v-col>
      <v-col cols="12" md="8">
        <v-card-title>
          {{user.fullName}}
        </v-card-title>
        <v-card-subtitle>
          <v-icon
            :color="user.online ? 'primary' : 'secondary'"
            x-small
            class="mr-2"
          >
            mdi-circle
          </v-icon>
          {{user.online ? 'Online' : 'Offline'}}</v-card-subtitle>
        <v-card-text>
          <v-row no-gutters>
            <v-col cols="12">E-mail: {{user.email}}</v-col>
            <v-col cols="12">Birth date: {{user.birthDate}}</v-col>
            <v-col cols="12">Age: {{user.age}}</v-col>
          </v-row>
        </v-card-text>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "user-info-card",
  props: {
    user: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style scoped>

</style>
