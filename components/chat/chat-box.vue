<template>
  <div class="chat pa-2">
    <v-responsive class="fill-height">
      <v-row class="fill-height">
        <v-col cols="12" v-for="(message, index) in messages" :key="index">
          <div class="chat__item">{{ message.text }}</div>
        </v-col>
      </v-row>
    </v-responsive>
  </div>
</template>

<script>
export default {
  name: "chat-box",
  computed: {
    messages(){
      return this.$store.getters['messages/getMessages'] || []
    },
  }
}
</script>

<style scoped>

</style>
