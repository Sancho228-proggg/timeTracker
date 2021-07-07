import { User} from '../../shared/interfaces';

export interface UserState{
  user:User
}

export const initialUserState:UserState={
  user:null
}
