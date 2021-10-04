<template>
  <div></div>
</template>

<script>
export default {
  name: "index",
  async created(){
    const user = await this.$store.dispatch('user/fetchUser')
    if(user){
      await this.$router.push(`/profile/${user.id}`)
    } else {
      await this.$router.push('/error')
    }
  }

}
</script>

<style scoped>

</style>
