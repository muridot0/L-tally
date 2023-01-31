import authHeader from "./auth-header";

export class BaseService {
  protected static root = "http://localhost:3030";

  protected static getSingle<Type>(url: string): Promise<void | Type> {
    url = `${this.root}/${url}`;
    return fetch(url).then(res => {
      if(res.status !== 200) {
        throw new Error(`Bad response code ${res.status} returned`)
      }
      return res.json();
    }).then((data: Type) => {
      return data;
    }).catch(err => {
      this.logError(err.message, url, err.stack);
    } )
  }

  protected static post<Type>(url: string, body: unknown): Promise<void | Type> {
    url = `${this.root}/${url}`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authHeader()}`
    },
      body: JSON.stringify(body)
    };
    return fetch(url, options).then(res => {
      if(res.status !== 200){
        throw new Error(`Bad response code ${res.status} returned`);
      }
      return res.json();
    }).then((data: Type) => {
      return data;
    }).catch(err => {
      this.logError(err.message, url, err.stack);
    })
  }

  protected static logError(message: string, url: string, stack: string): void {
    console.log(`Service call error "${message}"`)
    console.log(`Endpoint is "${url}"`)
    console.log(`Stack is "${stack}"`)
  }
}