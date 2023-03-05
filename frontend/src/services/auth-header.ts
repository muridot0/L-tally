export default function authHeader(){
  let user = window.localStorage.getItem('user');

  if(!user){
    throw new Error(`Cannot parse null of user`)
  }

  const parsedUser = JSON.parse(user);

  if(parsedUser && parsedUser.accessToken) {
    return { Authorization: `Bearer ${parsedUser.accessToken}`}
  } else {
    return {};
  }
}
