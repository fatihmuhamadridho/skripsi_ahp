const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const main = async () => {
  await prisma.user.deleteMany();
  await prisma.user.create({
    data: {
      fullname: "admin",
      username: "admin",
      password: "admin",
      first_login: false,
    },
  });
  console.log({ status: true, message: "Berhasil reset database!" });
  console.log("Berhasil reset database!");
};

main();
