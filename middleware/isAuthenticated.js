export default function ({redirect, route}){
  const status = !!localStorage.getItem('token')
  if(!status && route.path){
    return redirect('/auth')
  }
}
