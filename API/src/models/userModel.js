const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function addUser(data, password) {
  const newUser = await prisma.user.create({
    data: {
      email: data.email,
      password: password,
      role: data.role,
    },
  });

  return newUser;
}

module.exports = { addUser };
