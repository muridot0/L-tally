import axios from "axios";
import { User } from "../contexts/login"
import authHeader from "./auth-header";
import { AuthService } from "./auth-service";
import { BaseService } from "./base-service";

export class UserService extends AuthService{
  static getTallies() {
    const url = this.root;
    return axios.get(`${url}/tally`, {headers: authHeader()})
  }
}