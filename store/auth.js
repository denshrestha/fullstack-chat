// const namespaced = true

export const state = () => ({
  authenticated: false,
  user: null,
  errorMessage: ''
})

export const getters = {
  loginStatus: (state) => state.authenticated,
  getUser: (state) => state.user
}

export const mutations = {
  setLoginStatus(state, status){
    state.authenticated = status
  },
  setUser(state, user){
    state.user = {...user}
  },
  setError(state, error){
    state.errorMessage = error
  }
}

export const actions = {
  async login({commit}, data){
    return await this.$axios.post('/api/login', data)
      .then((resp) => {
        if (resp.data) {
          const {data, token} = resp.data
          this.$axios.setToken(token, 'Bearer')
          const tokenExpTime = new Date().getTime() + 7200000
          localStorage.setItem('token', token)
          localStorage.setItem('tokenEndTime', tokenExpTime.toString())
          commit('setUser', data)
          commit('setLoginStatus', true)
          return true
        }

        return false
      })
      .catch((err) => {
        console.log(err)
        return false
      })
  },

  async register({commit}, user){
    return await this.$axios.post('/api/register', user)
      .then((resp) => {
        if(resp.data){
          const {data} = resp.data
          return !!data;
        }
      })
      .catch((err) => {
        commit('setError', err.response.data.message)
        return false
      })
  },

  async logOut({commit}, id){
    return this.$axios.post('api/logout', {id: id})
      .then((resp)=>{
        if(resp.data){
          const {data} = resp.data
          commit('setLoginStatus', false)
          return !!data;
        }
      })
      .catch((err) => {
        commit('setError', err.response.data.message)
        return false
      })
  }
}
