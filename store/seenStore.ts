import { SeenHistory } from "@/model/seenHistory";
import { create } from "zustand"

const KEY = "seen";

const getSeen = () => {
    const seen = localStorage.getItem(KEY);
    if (seen) {
        return JSON.parse(seen);
    } else {
        return {}
    }
}

const saveSeen = (seen: Record<string, Date>) => {
    localStorage.setItem(KEY, JSON.stringify(seen));
}

interface SeenState {
    seen: Record<string, Date>,
    setSeen: (id: string, date: Date) => void,
    init: () => void,
}

const useSeenStore = create<SeenState>((set, get) => ({
    seen: {},
    setSeen: (id, date) => {
        const { seen } = get();
        const newSeen = { ...seen, [id]: date };
        set(newSeen);
        saveSeen(newSeen);
    },
    init: () => set({ seen: getSeen() })
}))

export default useSeenStore;