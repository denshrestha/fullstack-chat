<template>
  <div v-if="user" class="d-flex justify-space-between align-center text-capitalize">
    <v-avatar size="45">
      <v-img :src="user.avatar"></v-img>
    </v-avatar>
    {{user.fullName}}
    <span class="accent--text text-caption">
      {{user.online ? 'Online' : 'Offline'}}
      <v-icon
        :color="user.online ? 'primary' : 'secondary'"
        x-small
      >
        mdi-circle
      </v-icon>
    </span>
  </div>
</template>

<script>
export default {
  name: "user-simple-block",
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
