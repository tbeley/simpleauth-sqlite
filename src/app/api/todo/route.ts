import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(req: Request) {
  const todo = await req.json();
  const response = await prisma.todo.update({
    where: {
      id: todo.id,
    },
    data: {
      completed: !todo.completed,
    },
  });
  return NextResponse.json({ status: 200, todo: response });
}

export async function POST(req: Request) {
  const newTodo = await req.json();
  const response = await prisma.todo.create({
    data: {
      title: newTodo.title,
      completed: false,
    },
  });
  return NextResponse.json({ status: 200, todo: response });
}

export async function DELETE(req: Request) {
  const todo = await req.json();
  const response = await prisma.todo.delete({
    where: {
      id: todo.id,
    },
  });
  return NextResponse.json({ status: 204, todo: response });
}
