import * as moment from "moment";

export interface User{
  email:string,
  password:string,
  returnSecureToken?:boolean
}
export interface FbAuthResponse{
  idToken:string,
  expiresIn:string,
  localId?:string,
  email?:string,
  password?:string
}
export interface FbUserResponse{
  users:VerifiableUser[]
}
export interface VerifiableUser{
  localId:string
}

export interface Task{
  id?:string,
  time:string,
  text:string,
  date:string
}

export interface FbCreateResponse{
  name:string
}
export interface Day {
  value: moment.Moment
  active: boolean
  disabled: boolean
  selected: boolean
  withTask: boolean
}

export interface Week {
  days: Day[]
}
