import axios from "axios";
import { TallyCard } from "../models/tallyCard";
import authHeader from "./auth-header";
import { BaseService } from "./base-service";

export class TallyService extends BaseService{
  protected static getTallies(): Promise<void | TallyCard[]> {
    return axios.get(`${this.root}/tally/all`, {headers: authHeader()})
  }

  static getTallyBySpaceId(filter: string): Promise<void | TallyCard[]> {
    return axios.get(`${this.root}/tally?spaceId=${filter}`, {headers: authHeader()}).then((res) => {
      if(res.statusText !== 'OK') {
        throw new Error(`Bad response code ${res.status} returned`)
      }
      return res.data
    }).catch((err) => {
      this.logError(err.message, `${this.root}/space?userId=${filter}`, err.stack)
      alert(err.message)
    })
  }

  static createTally(tally: TallyCard): Promise<void | TallyCard> {
    return axios.post(`${this.root}/tally`, tally, {headers: authHeader()})
  }

  static patchTally(tally: TallyCard): Promise<void | TallyCard> {
    return axios.patch(`${this.root}/tally/${tally._id}`, tally, {headers: authHeader()})
  }

  static deleteTally(id: string): Promise<void | string> {
    return axios.delete(`${this.root}/tally/${id}`, {headers: authHeader()})
  }
}