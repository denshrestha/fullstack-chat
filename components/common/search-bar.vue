<template>
  <v-autocomplete
    full-width
    v-model="select"
    :items.sync="items"
    rounded
    placeholder="Search users by name"
    color="accent"
    outlined
    dense
    hide-details
    item-text="fullName"
    item-value="_id"
    :search-input.sync="userSearchQuery"
  >
    <template v-slot:item="{ item }">
      <v-list-item-avatar>
        <v-avatar>
          <v-img :src="item.avatar"></v-img>
        </v-avatar>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title v-text="isYou(item) ? item.fullName + ' (You)' : item.fullName" />
        <v-list-item-subtitle>
          <span class="accent--text">
            {{item.online ? 'Online' : 'Offline'}}
            <v-icon
              :color="item.online ? 'primary' : 'secondary'"
              x-small
            >
            mdi-circle
          </v-icon>
          </span>
        </v-list-item-subtitle>
      </v-list-item-content>
        <v-list-item-action v-if="!isYou(item) && !isAlreadyAFriend(item)">
          <v-btn icon @click.stop="addToFriends(item)">
            <v-icon color="success">
              mdi-account-plus-outline
            </v-icon>
          </v-btn>
        </v-list-item-action>
        <v-list-item-action v-else>
          <v-btn icon>
            <v-icon color="accent">
              mdi-account-check-outline
            </v-icon>
          </v-btn>
        </v-list-item-action>
    </template>
  </v-autocomplete>
</template>

<script>
export default {
  name: "search-bar",
  data: () => ({
    select: null,
    userSearchQuery: '',
    items: []
  }),
  watch: {
    userSearchQuery (val) {
      val && val !== this.select && this.querySelections(val)
    },
  },
  methods: {
    async querySelections(val){
      if(this.userSearchQuery) {
        const response = await this.$store.dispatch('user/findUser', val)
        if(response) {
          this.items = this.$store.getters['user/getUsersSearchResult']
          this.isAlreadyAFriend(1)
        }
      }
    },
    async addToFriends(item){
      const {id} = item
      const result = await this.$store.dispatch(
        'user/addToFriendsRequest',
        {id: id}
      )
      console.log(result)
    },
    isYou(item) {
      const {id} = this.$store.getters['user/getUser']
      return id === item.id
    },
    isAlreadyAFriend(item){
      const {friends} = this.$store.getters['user/getUser']
      return friends.includes(item.id)
    }
  }
}
</script>

<style scoped>

</style>
