
export const state = () => ({
  messages: [],
  chatId: '',
  peers: []
})

export const getters = {
  getMessages: state => state.messages,
  getChatId: state => state.chatId,
  getPeers: state => state.peers
}

export const mutations = {
  setMessages(state, messages){
    state.messages = [...messages]
  },
  setChatId(state, id){
    state.chatId = id
  },
  setPeers(state, peers){
    state.peers = [...peers]
  },
  setNewMessage(state, message) {
    state.messages.push(message)
  }
}

export const actions = {
  SOCKET_message({commit}, data){
    const {messages = {}} = data
    commit('setNewMessage', messages)
  },
  SOCKET_enterSuccess({commit}, data){
    console.log(data)
  },
  async getMessageHistory({commit}, chatId) {
    return this.$axios.get(`/api/chat/${chatId}`)
      .then((resp) => {
        if(resp.data){
          const {data} = resp.data
          const {id = '', messages = [], peers = []} = data
          commit('setMessages', messages)
          commit('setChatId', id)
          commit('setPeers', peers)
          return true
        }
        return false
      })
      .catch((err) => {
        console.log(err)
        return false
      })
  },
  async getChatID({commit}, dataId) {
    return this.$axios.get(`/api/chat/${dataId.userID}/${dataId.friendID}`)
      .then((resp) => {
        if(resp.data){
          const {data} = resp.data
          console.log(data)
          return data
        }
        return false
      })
      .catch((err) => {
        console.log(err)
        return false
      })
  }
}
