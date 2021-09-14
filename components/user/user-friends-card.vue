<template>
  <v-card class="accent">
    <v-card-title>Friends ({{friends.length || 0}})</v-card-title>
    <v-card-text>
      <v-list class="rounded">
        <v-list-item
          v-for="friend in friends"
          :key="friend.id"
        >
          <v-list-item-avatar>
            <v-avatar>
              <v-img :src="friend.avatar"></v-img>
            </v-avatar>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-text="friend.fullName" />
            <v-list-item-subtitle>
          <span class="accent--text">
            {{friend.online ? 'Online' : 'Offline'}}
            <v-icon
              :color="friend.online ? 'primary' : 'secondary'"
              x-small
            >
            mdi-circle
          </v-icon>
          </span>
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon>
              <v-icon>mdi-message-text-outline</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "user-friends-card",
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    friends: []
  }),
  mounted() {
    this.getFriends()
  },
  methods: {
    async getFriends() {
      this.friends = await this.$store.dispatch('user/getFriendsDate', this.id)
    }
  }
}
</script>

<style scoped>

</style>
