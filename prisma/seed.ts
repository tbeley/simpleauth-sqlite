import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.publicTodo.create({
    data: {
      title: "Learn Next.js",
    },
  });
  await prisma.registeredTodo.create({
    data: {
      title: "Learn Prisma",
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
