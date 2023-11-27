const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const main = async () => {
  await prisma.user.create({
    data: { fullname: "admin", username: "admin", password: "admin" },
  });
  console.log({ status: true, message: "Berhasil reset database!" });
  console.log("Berhasil reset database!");
};

main();
