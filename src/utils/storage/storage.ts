class Storage{

    set<T>(key: string, value: T): void{
        try {
            localStorage.setItem(
                key,
                JSON.stringify(value)
            );
        } catch (error) {
            console.error("Failed to save to localStorage.", error); 
        }
    }

    get<T> (key: string) : T | null {
        try {
            
            const value = localStorage.getItem(key);
            if(!value) return null;
    
            return JSON.parse(value) as T;

        } catch (error) {
            console.error("Failed to read the localStorage", error);
            return null;
        }
    }

    remove(key: string): void {
        localStorage.removeItem(key);
    }

    clear(): void {
        localStorage.clear();
    }
}

export default new Storage();