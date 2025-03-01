import { ResponseModel } from "@/model/responseModel";
import { Issue } from "@/model/save";

export const callGet = async (): Promise<Issue[]> => {
    const res = await fetch("/api/data");
    return await res.json();
}

export const callDelete = async (id: string): Promise<ResponseModel> => {
    const res = await fetch("/api/data", {
        method: "DELETE",
        body: JSON.stringify(id)
    })
    return { ok: res.ok, message: await res.json() }
}

export const callUpdate = async (newData: Issue): Promise<ResponseModel> => {
    const res = await fetch("/api/data", {
        method: "PATCH",
        body: JSON.stringify(newData)
    })
    return { ok: res.ok, message: await res.json() }
}

export const callCreate = async (newData: Issue): Promise<ResponseModel> => {
    const res = await fetch("/api/data", {
        method: "POST",
        body: JSON.stringify(newData)
    })
    return { ok: res.ok, message: await res.json() }
}