<template>
  <v-navigation-drawer
    v-model="drawer"
    :mini-variant.sync="mini"
    permanent
    app
  >
    <v-list-item class="px-2">
      <v-list-item-avatar>
        <v-btn icon>
          <v-icon color="primary">mdi-leaf</v-icon>
        </v-btn>
      </v-list-item-avatar>

      <v-list-item-title>{{user.fullName}}</v-list-item-title>

      <v-btn
        icon
        @click.stop="mini = !mini"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
    </v-list-item>

    <v-list dense>
      <v-list-item
        v-for="(item, index) in items"
        :key="index"
        link
        :class="$route.path === item.path ? 'primary' : ''"
        :to="item.path"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title class="font-weight-bold text-body-1">{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "side-bar",
  data: () => ({
    drawer: true,
    mini: true,
    items: [
      {icon: 'mdi-account-circle', title: 'Profile', path: '/profile'},
      {icon: 'mdi-message-text-outline', title: 'Messages', path: '/messages'},
    ]
  }),
  computed: {
    user(){
      return this.$store.state.auth.user || ' '
    }
  }
}
</script>

<style scoped>

</style>
