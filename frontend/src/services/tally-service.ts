import axios from "axios";
import { Tally } from "../models/tally";
import authHeader from "./auth-header";
import { AuthService } from "./auth-service";

export class TallyService extends AuthService{
  protected static getTallies(): Promise<void | Tally[]> {
    return axios.get(`${this.root}/tally/all`, {headers: authHeader()})
  }

  static getTallyBySpaceId(filter: string): Promise<void | Tally[]> {
    return axios.get(`${this.root}/tally?${filter}`, {headers: authHeader()})
  }

  static patchTally(tally: Tally): Promise<void | Tally>{
    return axios.patch(`${this.root}/tally/${tally._id}`, tally)
  }
}