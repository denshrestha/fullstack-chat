
export const state = () => ({
  message: '',
  color: ''
})

export const mutations = {
  setNotification(state, {message, color}) {
    state.message = message
    state.color = color
  },
  SOCKET_newFriendNotification(state, {message, color}) {
    state.message = message
    state.color = color
  },
  SOCKET_friendshipRequestAccepted(state, id) {
    console.log('request accepted', id)
  }
}
