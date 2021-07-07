import { createAction, props} from "@ngrx/store";
import { Task} from "../../shared/interfaces";
import * as moment from "moment";


export const GetCurrentTaskByDay=createAction(
  '[Task] GetCurrentTaskByDay',
  props<{date:moment.Moment}>()
);


export const GetCurrentTaskByMonth=createAction(
  '[Task] GetCurrentTaskByMonth',
  props<{dir:number}>()
);

export const GetInitialTask=createAction(
  '[Task] GetTask'
);

export const GetTaskSuccess=createAction(
  '[Task] GetTaskSuccess',
  props<{task:Task}>()
)

export const GetAllTasks=createAction(
  '[Task] GetAllTasks'
)


export const GetAllTasksSuccess=createAction(
  '[Task] GetAllTasksSuccess',
  props<{tasks:string[]}>()
);


export const CreateTask=createAction(
  '[Task] CreateTask',
  props<{task:Task}>()
);

export const CreateTaskSuccess=createAction(
  '[Task] CreateTaskSuccess',
  props<{task:Task}>()
);

export const UpdateTask=createAction(
  '[Task] UpdateTask',
  props<{task:Task}>()
);

export const RemoveTask=createAction(
  '[Task] RemoveTask',
  props<{date:string}>()
)

export const RemoveTaskSuccess=createAction(
  '[Task] RemoveTaskSuccess',
  props<{date:string}>()
)



