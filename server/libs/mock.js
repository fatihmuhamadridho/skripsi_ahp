const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const main = async () => {
  await prisma.karyawan.create({
    data: { fullname: "Fatih Muhamad Ridho", handphone: "+6282110797472" },
  });
  const kriteriaResponse = await prisma.kriteria.create({
    data: { name: "Absensi" },
  });
  const subkriteriaResponse = await prisma.subkriteria.create({
    data: { name: "<15 hari" },
  });
  await prisma.kriteriaSubkriteria.create({
    data: {
      value: 5,
      kriteria_id: kriteriaResponse.kriteria_id,
      subkriteria_id: subkriteriaResponse.subkriteria_id,
    },
  });
  const categoryKriteriaResponse = await prisma.categoryKriteria.create({
    data: {
      name: "Karyawan Terbaik Oktober 2023",
      periode: new Date(),
    },
  });
  await prisma.categoryKriteriaKriteria.create({
    data: {
      value: 5,
      category_kriteria_id: categoryKriteriaResponse.category_kriteria_id,
      kriteria_id: kriteriaResponse.kriteria_id,
    },
  });
  console.log({ status: true, message: "Berhasil mock database!" });
  console.log("Berhasil mock database!");
};

main();
