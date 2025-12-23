export class Task {
    constructor(id, title, completed) {
        
        Object.defineProperty(this, 'id', {
            value: id,
            writable: false,
            configurable: false,
            enumerable: true
        });

        this.title = title;
        this.completed = completed;
    }

    // returns a neew task object 
    toggle() {
        return new Task(this.id, this.title, !this.completed);
    }
}

export class TaskManager {
    constructor() {
        this.tasks = [];
    }

    setTasks(newTasks) {
        // creates a copy to ensure we dont hold references to arrays
        this.tasks = [...newTasks]; 
    }

    // adds task immutably
    addTask(task) {
        this.tasks = [...this.tasks, task];
    }

    // filter returns a new array
    removeTask(taskId) {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
    }

    // map returns a new array
    toggleTask(taskId) {
        this.tasks = this.tasks.map(task => {
            if (task.id === taskId) {
                
                return task.toggle(); 
            }
            return task;
        });
    }
}