export default function ({redirect, store, router}){
  const status = store.state.auth.authenticated
  if(!status && router.path !== '/register'){
    return redirect('/auth')
  }
}
