import { Issue } from '@/model/save';
import data from '@/service/data';
import { NextRequest, NextResponse } from 'next/server';

// 处理DELETE请求的函数
export async function DELETE(request: NextRequest) {
    try {
        // 解析请求体，获取参数
        const id = await request.json();

        await data.deleteIssue(`${id}`)
        return NextResponse.json('删除成功', { status: 200 });
    } catch (error) {
        console.error('删除数据时出错:', error);
        return NextResponse.json('删除数据时出错', { status: 500 });
    }
}

// 处理GET请求的函数
export async function GET() {
    try {
        const issues = await data.getIssues();
        return NextResponse.json(issues, { status: 200 });
    } catch (error) {
        console.error('获取数据时出错:', error);
        return NextResponse.json('获取数据时出错', { status: 500 });
    }
}

// 处理POST请求的函数
export async function POST(request: NextRequest) {
    try {
        const newIssue: Issue = await request.json();
        const issues = await data.getIssues();
        if (issues.find(issue => issue.id === newIssue.id)) {
            return NextResponse.json('id已存在', { status: 400 });
        }
        await data.createIssue(newIssue);
        return NextResponse.json('创建成功', { status: 201 });
    } catch (error) {
        console.error('添加数据时出错:', error);
        return NextResponse.json('添加数据时出错', { status: 500 });
    }
}

// 处理PATCH请求的函数
export async function PATCH(request: NextRequest) {
    try {
        const updatedData = await request.json();
        await data.updateIssue(updatedData);
        return NextResponse.json('更新成功', { status: 200 });
    } catch (error) {
        console.error('更新数据时出错:', error);
        return NextResponse.json('更新数据时出错', { status: 500 });
    }
}
