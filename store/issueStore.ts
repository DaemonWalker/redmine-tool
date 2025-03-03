import { ResponseModel } from "@/model/responseModel";
import { Issue } from "@/model/save";
import { callCreate, callDelete, callGet, callUpdate } from "@/service/apiClient";
import { create } from "zustand";
import useFilterStore from "./filterStore"
import useSeenStore from "./seenStore";

interface IssueState {
    data: Issue[];
    issues: any[];
    setData: (newData: Issue[]) => void;
    setIssues: (newIssues: any[]) => void;
    deleteIssue: (id: string) => Promise<ResponseModel>;
    createIssue: (newIssue: Issue) => Promise<ResponseModel>;
    updateIssue: (updatedIssue: Issue) => Promise<ResponseModel>;
    assigneeOptions: (data: Issue[]) => { label: string, value: string }[]
}

const useIssueStore = create<IssueState>((set) => ({
    data: [],
    issues: [],
    setData: (newData) => set(() => ({ data: newData })),
    setIssues: (newIssues) => set(() => ({ issues: newIssues })),
    deleteIssue: async (id: string) => {
        let result = new ResponseModel();
        try {
            result = await callDelete(id);
            if (result.ok) {
                const newData = await callGet();
                set(() => ({ data: newData }));
            }
        } catch (error) {
            console.error('删除 issue 时出错:', error);
        }
        return result;
    },
    createIssue: async (newIssue: Issue) => {
        let result = new ResponseModel();
        try {
            result = await callCreate(newIssue);
            if (result) {
                const newData = await callGet();
                set(() => ({ data: newData }));
                const { setSeen } = useSeenStore.getState();
                setSeen(newIssue.id, new Date());
            }
        } catch (error) {
            console.error('创建 issue 时出错:', error);
        }
        return result;
    },
    updateIssue: async (updatedIssue: Issue) => {
        let result = new ResponseModel();
        try {
            result = await callUpdate(updatedIssue);
            if (result) {
                const newData = await callGet();
                set(() => ({ data: newData }));
            }
        } catch (error) {
            console.error('更新 issue 时出错:', error);
        }
        return result;
    },
    assigneeOptions: (data: Issue[]) => {
        const assigneeList = data.flatMap(item => item.assignee);
        return [...new Set(assigneeList)].map(assignee => ({ label: assignee, value: assignee }));
    }
}));

export default useIssueStore;
