<template>
  <div class="chat-item d-flex justify-space-between align-center" :class="user.id === message.userID ? 'primary' : 'secondary'">
    <v-avatar>
      <v-img :src="getUserAvatar(message.userID)"></v-img>
    </v-avatar>
    <div class="d-inline-flex flex-column justify-start">
      <span class="my-0 mx-2">{{message.text}}</span>
      <span class="my-0 mx-2">{{getDateAndTime(message)}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "chat-item",
  props: {
    message: {
      type: Object,
      default: () => {}
    },
    avatar: {
      type: String,
      default: ''
    }
  },
  computed: {
    user(){
      return this.$store.getters['user/getUser'] || {}
    },
  },
  methods: {
    getUserAvatar(id) {
      if(id === this.user.id){
        return this.user.avatar
      }
      return this.avatar
    },
    getDateAndTime(message){
      console.log(message)
      const date =  new Date(message.createdAt)
      const day = date.getDate()
      const month = date.getMonth()
      const hour = date.getHours()
      const minutes = date.getMinutes()
      return `${month< 10 ? '0'+month : month}/${day} on ${hour}:${minutes < 10 ? '0'+minutes : minutes}`
    }
  }
}
</script>

<style scoped lang="scss">
.chat-item {
  padding: 4px 5px;
  //background-color: rgba(255, 255, 255, 0.36);
  border-radius: 15px;
}

</style>
