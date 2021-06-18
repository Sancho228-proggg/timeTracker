export interface User{
  email:string,
  password:string,
  returnSecureToken?:boolean
}
export interface FbAuthResponse{
  idToken:string,
  expiresIn:string
}

export interface Task{
  id?:string,
  text:string,
  date?:string
}

export interface FbCreateResponse{
  name:string
}
