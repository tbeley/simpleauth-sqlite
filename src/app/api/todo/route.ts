import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { auth } from "@clerk/nextjs";
import { notFound } from "next/navigation";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const access = searchParams.get("access");

  if (access === "public") {
    const response = await prisma.publicTodo.findMany({
      orderBy: {
        id: "asc",
      },
    });
    return NextResponse.json({ status: 200, todos: response });
  } else if (access === "private") {
    const { userId } = auth();
    if (!userId) return notFound();
    const response = await prisma.privateTodo.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        id: "asc",
      },
    });
    return NextResponse.json({ status: 200, todos: response });
  } else if (access === "registered") {
    const response = await prisma.registeredTodo.findMany({
      orderBy: {
        id: "asc",
      },
    });
    return NextResponse.json({ status: 200, todos: response });
  } else {
    return NextResponse.json({ status: 400, message: "Invalid access type" });
  }
}

export async function PUT(req: Request) {
  const todo = await req.json();

  const { userId } = auth();
  if (!userId && todo.access !== "public") {
    return new Response("Unauthorized", { status: 401 });
  }

  if (todo.access === "public") {
    const response = await prisma.publicTodo.update({
      where: {
        id: todo.id,
      },
      data: {
        completed: !todo.completed,
      },
    });
    return NextResponse.json({ status: 200, todo: response });
  } else if (todo.access === "registered") {
    const response = await prisma.registeredTodo.update({
      where: {
        id: todo.id,
      },
      data: {
        completed: !todo.completed,
      },
    });
    return NextResponse.json({ status: 200, todo: response });
  } else if (todo.access === "private") {
    const response = await prisma.privateTodo.update({
      where: {
        id: todo.id,
      },
      data: {
        completed: !todo.completed,
      },
    });
    return NextResponse.json({ status: 200, todo: response });
  } else {
    return NextResponse.json({ status: 400, message: "Invalid access type" });
  }
}

export async function POST(req: Request) {
  const newTodo = await req.json();

  const { userId } = auth();
  if (!userId && newTodo.access !== "public") {
    return new Response("Unauthorized", { status: 401 });
  }

  if (newTodo.access === "public") {
    const data: Prisma.PublicTodoCreateInput = {
      title: newTodo.title,
      completed: false,
    };
    const response = await prisma.publicTodo.create({ data });
    return NextResponse.json({ status: 200, todo: response });
  } else if (newTodo.access === "registered") {
    const data: Prisma.RegisteredTodoCreateInput = {
      title: newTodo.title,
      completed: false,
    };
    const response = await prisma.registeredTodo.create({ data });
    return NextResponse.json({ status: 200, todo: response });
  } else if (newTodo.access === "private") {
    const data: Prisma.PrivateTodoCreateInput = {
      title: newTodo.title,
      completed: false,
      userId: newTodo.userId,
    };
    const response = await prisma.privateTodo.create({ data });
    return NextResponse.json({ status: 200, todo: response });
  } else {
    return NextResponse.json({ status: 400, message: "Invalid access type" });
  }
}

export async function DELETE(req: Request) {
  const { id, access } = await req.json();

  const { userId } = auth();
  if (!userId && access !== "public") {
    return new Response("Unauthorized", { status: 401 });
  }

  if (access === "public") {
    const response = await prisma.publicTodo.delete({
      where: {
        id,
      },
    });
    return NextResponse.json({ status: 200, todo: response });
  } else if (access === "registered") {
    const response = await prisma.registeredTodo.delete({
      where: {
        id,
      },
    });
    return NextResponse.json({ status: 200, todo: response });
  } else if (access === "private") {
    const response = await prisma.privateTodo.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json({ status: 200, todo: response });
  } else {
    return NextResponse.json({ status: 400, message: "Invalid access type" });
  }
}
