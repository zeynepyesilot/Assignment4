export function fetchTasks() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            
            const rawData = [
                { id: 1, title: "Study JavaScript", completed: false },
                { id: 2, title: "Practice DOM", completed: true },
                { id: 3, title: "Read Async Patterns", completed: false }
            ];
            
            resolve(rawData);
            
        }, 1500);
    });
}