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
