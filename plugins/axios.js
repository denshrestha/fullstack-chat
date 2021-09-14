export default function({ $axios, redirect }) {
  $axios.onRequest(async (config) => {
    return config
  })

  $axios.onResponseError( (err) => {
    const code = parseInt(err.response && err.response.status)
    if (code === 401) {
      redirect('/auth')
    }

    if (code === 404) {
      redirect('/not-found')
    }

    if (code === 500) {
      redirect('/error')
    }
  })
}
