import axios from 'axios';
import authHeader from './auth-header';

export class AuthService {
  protected static root = "http://localhost:3030";

  static login(username: string, password: string, strategy: string): Promise<void> {
    const url = `${this.root}/authentication`;
    return axios.post(url, {strategy, username, password}).then(res => {
      if(res.data.accessToken){
        localStorage.setItem("user", JSON.stringify(res.data));
      }
      return res.data
    })
  }

 static logout() {
    localStorage.clear();
  }

  static register(username: string, email: string, password: string): Promise<void> {
    const url = `${this.root}/users`
    return axios.post(url, {username, email, password})
  }

  static getCurrentUser() {
    const user = localStorage.getItem('user');
    if(!user){
      throw new Error()
    }
    return JSON.parse(user);
  }

  protected static getAllUsers<T>(): Promise<T[]>{
    const url = `${this.root}/users/all`
    return axios.get(url, {headers: authHeader()}).then(res => {
      if(res.data.accessToken){
        localStorage.setItem("user", JSON.stringify(res.data));
      }
      const users: T[] = []
      users.push(res.data)
      return users;
    })
  }

}
