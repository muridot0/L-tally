import axios from "axios";
import { Space } from "../models/space";
import authHeader from "./auth-header";
import { BaseService } from "./base-service";

export class SpaceService extends BaseService{
  protected static getSpaces(): Promise<void | Space[]> {
    return axios.get(`${this.root}/spaces/all`, {headers: authHeader()})
  }

  static getSpacesByUserId(filter: string): Promise<Space[]> {
    return axios.get(`${this.root}/space?userId=${filter}`, {headers: authHeader()}).then((res) => {
      if(res.statusText !== 'OK') {
        throw new Error(`Bad response code ${res.status} returned`)
      }
      return res.data
    }).catch((err) => {
      this.logError(err.message, `${this.root}/space?userId=${filter}`, err.stack)
      alert(err.message)
    })
  }

  static createSpace(space: Space): Promise<void | Space>{
    return axios.post(`${this.root}/space`, space, {headers: authHeader()})
  }

  static patchSpace(space: Space): Promise<void | Space>{
    return axios.patch(`${this.root}/space/${space._id}`, space, {headers: authHeader()})
  }

  static deleteSpace(id: string): Promise<void | string>{
    return axios.delete(`${this.root}/space/${id}`, {headers: authHeader()})
  }
}