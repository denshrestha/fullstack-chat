export default ({ app, store }, inject) => {
  inject('notifier', {
    showMessage ({ message = '', color = '' }) {
      store.commit('notifications/setNotification', { message, color })
    }
  })
}
