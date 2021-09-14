<template>
  <div class="chat pa-2">
    <v-responsive class="fill-height overflow-y-auto" max-height="650px">
      <v-row class="fill-height">
        <v-col
          cols="12"
          v-for="(message, index) in messages"
          :key="index"
          class="d-flex"
          :class="message.userID === user.id ? 'justify-end' : 'justify-start'"
        >
         <chat-item :message="message" :avatar="friendAvatar"/>
        </v-col>
      </v-row>
    </v-responsive>
  </div>
</template>

<script>
export default {
  name: "chat-box",
  props: {
    friendAvatar: {
      type: String,
      default: ''
    }
  },
  components: {
    chatItem: () => import('@/components/chat/chat-item')
  },
  computed: {
    messages(){
      return this.$store.getters['messages/getMessages'] || []
    },
    user(){
      return this.$store.getters['user/getUser'] || {}
    },
  }
}
</script>

<style scoped>

</style>
