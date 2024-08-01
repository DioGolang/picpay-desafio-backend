import { Observable } from "rxjs";

export interface IMessageBroker{
  publish(pattern: string, payload: any):Promise<void>;
  send<T>(pattern: string, payload: any): Observable<T>;
}