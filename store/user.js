
export const state = () => ({
  user: '',
  searchUsersResult: [],
  requests: []
})

export const getters = {
  getUser: state => state.user,
  getUsersSearchResult: state => state.searchUsersResult,
  getUserRequests: state => state.requests
}

export const mutations = {
  setUser(state, userData){
    state.user = {...userData}
  },
  setUserRequests(state, requests){
    state.requests = [...requests]
  },
  setUsersSearchResult(state, users){
    state.searchUsersResult = users.map((item) => {
      const {
        fullName,
        avatar,
        online,
        id
      } = item
      return {
        fullName,
        avatar,
        online,
        id
      }
    })
  }
}

export const actions = {
  async findUser({commit}, query){
    return await this.$axios.get(`/api/users/search/${query}`)
      .then((resp) => {
        if(resp.data) {
          const {data} = resp.data
          commit('setUsersSearchResult', data)
          return true
        }
        return false
      })
      .catch((err) => {
        console.log(err)
        return false
      })
  },
  async addToFriendsRequest ({commit}, id) {
    return await this.$axios.post('/api/user/request/friends', id)
      .then((resp) => {
        return !!resp.data;
      })
      .catch((err) => {
        console.log(err)
        return false
      })
  },

  async fetchUser({commit}) {
    return await this.$axios.get('api/user')
      .then((resp) => {
        if (resp.data) {
          const {data} = resp.data
          const {requests = [] } = data
          commit('setUser', data)
          commit('setUserRequests', requests)
          return true
        }
        return false
      })
      .catch((err) => {
        commit('setError', err.response.data.message)
        return false
      })
  },

  async handleRequest({commit}, {endpoint, idData}) {
    return await this.$axios.post(`api/user/request/friends/${endpoint}`, idData)
      .then((resp) => {
        if (resp.data) {
          console.log(resp.data)
          return true
        }
        return false
      })
      .catch((err) => {
        commit('setError', err.response.data.message)
        return false
      })
  },

  async getFriendsDate({commit}, id){
    return this.$axios.get(`/api/user/${id}/friends`)
      .then((resp) => {
        if(resp.data) {
          const {data} = resp.data
          if(data.length){
            return data
          }
          return false
        }
      })
      .catch((err) => {
        console.log(err)
        commit('setError', err.response.data.message)
      })
  }
}
