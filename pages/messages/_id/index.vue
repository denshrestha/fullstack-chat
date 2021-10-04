<template>
  <v-card class="fill-height d-flex flex-column" width="100%" :loading="isLoading">
    <template v-if="currentFriendInfo">
      <v-card-title class="d-block flex-grow-0 accent">
        <user-simple-block :user="currentFriendInfo"/>
      </v-card-title>
      <v-responsive class="fill-height overflow-y-auto" max-height="650px" ref="chatBox">
        <v-card-text class="flex-grow-1">
          <chat-box :friendAvatar="currentFriendInfo.avatar"/>
        </v-card-text>
      </v-responsive>
      <v-card-actions class="flex-grow-0 accent">
        <v-text-field
          v-model="message"
          append-icon="mdi-send"
          hide-details
          outlined
          rounded
          @click:append="sendMessage(currentFriendInfo.id)"
          @keypress.enter="sendMessage(currentFriendInfo.id)"
        >
          <template v-slot:prepend-inner>
            <v-menu
              v-model="emojiMenu"
              :close-on-content-click="false"
            >
              <template v-slot:activator="{on, attrs}">
                <v-icon v-on="on" v-bind="attrs">
                  mdi-emoticon-neutral-outline
                </v-icon>
              </template>
              <VEmojiPicker @select="selectEmoji"/>
            </v-menu>
          </template>
        </v-text-field>
      </v-card-actions>
    </template>
  </v-card>
</template>

<script>
import { VEmojiPicker } from 'v-emoji-picker';

export default {
  name: "chatRoom",
  layout: 'default',
  components: {
    chatBox: () => import('@/components/chat/chat-box'),
    userSimpleBlock: () => import('@/components/user/user-simple-block'),
    VEmojiPicker
  },
  data: () => ({
    currentFriendInfo: null,
    isLoading: false,
    message: '',
    emojiMenu: false
  }),
  computed: {
    peers(){
      return this.$store.getters['messages/getPeers'] || []
    },
    chatId(){
      return this.$route.params.id
    },
    user(){
      return this.$store.getters['user/getUser'] || {}
    },
  },
  async created(){
    this.isLoading = true
    await this.$store.dispatch('messages/getMessageHistory', this.$route.params.id)
    const userId = this.peers.filter((i) => i !== this.user.id)
    const friends = await this.$store.dispatch('user/getFriendsData',userId[0])
    this.currentFriendInfo = friends[0]
    if(this.currentFriendInfo) {
      this.isLoading = false
    }
  },
  methods: {
    sendMessage(id){
      if(this.message){
        this.isLoading = true
        this.$socket.emit('createMessage', {
          text: this.message,
          time: new Date().getTime(),
          from: this.user.id,
          to: id,
          chatId: this.chatId
        })
        this.updateChatBox()
      }
    },
    updateChatBox(){
      this.$nextTick(()=>{
        setTimeout(() => {
          this.message = ''
          this.isLoading = false
          this.$refs.chatBox.$el.scrollTop =  this.$refs.chatBox.$el.scrollHeight + 2000
        }, 1000)
      })
    },
    selectEmoji(emoji) {
      this.message += emoji.data
    }
  }
}
</script>

<style scoped>

</style>
