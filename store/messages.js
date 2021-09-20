
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
    const {id = '', message = [], peers = []} = data
    commit('setMessages', message)
    commit('setChatId', id)
    commit('setPeers', peers)
  },
  SOCKET_enterSuccess({commit}, data){
    console.log(data)
  },
  async getMessageHistory({commit}, friendId) {
    return this.$axios.get(`/api/messages/getMessages/${friendId}`)
      .then((resp) => {
        if(resp.data){
          const {data} = resp.data
          const {id = '', message = [], peers = []} = data
          commit('setMessages', message)
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
  }
}
