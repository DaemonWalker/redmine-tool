import { Issue } from "@/model/save";

const headers = new Headers({
    "X-Redmine-API-Key": "1deec205866697d5e25a49932402b3bc5fc7a717"
});

export async function getIssues(ids: string[]): Promise<any[]> {
    const tasks = ids.map(item => getIssue(item));
    return await Promise.all(tasks);
}
export async function getIssue(id: string) {
    const response = await fetch(`http://localhost:8080/issues/${id}.json?include=journals`, {
        headers: headers
    });
    const data = await response.json();
    return { ...data.issue, id: `${data.issue.id}` };
}

export const getLastUpdated = (issue: any) => {
    const journals = issue.journals;
    if (journals.length === 0) {
        return { "at": new Date(issue.updated_on), "by": issue.author.name };
    } else {
        return { "at": new Date(journals[journals.length - 1].created_on), "by": journals[journals.length - 1].user.name };
    }
}

export const getIssuesAtClient = async (ids: string[]): Promise<any[]> => {
    const res = await fetch("/api/redmine", {
        method: "POST",
        body: JSON.stringify(ids)
    });
    return await res.json();
}