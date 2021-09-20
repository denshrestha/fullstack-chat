
export const state = () => ({
  message: '',
  color: ''
})

export const mutations = {
  setNotification(state, {message, color}) {
    state.message = message
    state.color = color
  }
}
