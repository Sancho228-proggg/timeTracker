export interface User{
  email:string,
  password:string,
  returnSecureToken?:boolean
}
export interface FbAuthResponse{
  idToken:string,
  expiresIn:string,
  localId?:string,
  email?:string
}
export interface FbUserResponce{
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
