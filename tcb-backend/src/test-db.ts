import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function testDB() {
  const users = await prisma.users.findMany();
  console.log(users);
}

testDB()
  .catch(console.error)
  .finally(() => prisma.$disconnect());