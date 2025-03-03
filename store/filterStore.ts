import { create } from 'zustand';
import useIssueStore from './issueStore';

// 定义过滤条件的状态接口
interface FilterState {
    id: string;
    backlog: string;
    assignee: string[];
    setId: (newId: string) => void;
    setBacklog: (newBacklog: string) => void;
    setAssignee: (newAssignee: string[]) => void;
    clearFilters: () => void;
}

// 创建 zustand store
const useFilterStore = create<FilterState>((set) => ({
    id: '',
    backlog: '',
    assignee: [],
    setId: (newId) => set(() => ({ id: newId })),
    setBacklog: (newBacklog) => set(() => ({ backlog: newBacklog })),
    setAssignee: (newAssignee) => set(() => ({ assignee: newAssignee })),
    clearFilters: () => set(() => ({ id: '', backlog: '', assignee: [] })),
    // setAssigneeOptions: (newAssigneeOptions) => set(() => ({ assigneeOptions: [...new Set(newAssigneeOptions)] })),
}));

export default useFilterStore;
