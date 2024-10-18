export interface Task {
    title_hello ? : any;
    taskTitle(arg0: string, taskTitle: any): import("react").ReactNode | Iterable<import("react").ReactNode>;
    id: string;
    title: string;
    description: string;
    creationDate: Date;
    tags: string[];
    completed: boolean;
    get uncompleted(): boolean;
  }