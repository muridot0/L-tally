import axios from 'axios';
import { User } from '../contexts/login'

export class AuthService {
  protected static root = "http://localhost:3030";

  static login<User>(username: string, password: string, strategy: string): Promise<void | User> {
    const url = `${this.root}/authentication`;
    return axios.post(url, {strategy, username, password}).then(res => {
      if(res.data.accessToken){
        localStorage.setItem("user", JSON.stringify(res.data));
      }
      return res.data
    })
  }

 static logout() {
    localStorage.removeItem("user");
  }

  static register<User>(username: string, email: string, password: string): Promise<void | User> {
    const url = `${this.root}/users`
    return axios.post(url, {username, email, password})
  }

  static getCurrentUser(): Promise<void | null> {
    const user = localStorage.getItem('user');
    if(!user){
      throw new Error()
    }
    return JSON.parse(user);
  }

}
