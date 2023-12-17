import DataTable, {
  tableHeadersProps,
} from "@/components/atoms/DataTable/DataTable";
import { DndTable } from "@/components/atoms/DndTable/DndTable";
import DefaultTemplate from "@/components/templates/Default/Default";
import { CategoryKriteriaService } from "@/services/categoryKriteriaService";
import { useGetAllKriteria } from "@/services/kriteriaService";
import {
  Box,
  Button,
  Divider,
  Fieldset,
  Flex,
  NativeSelect,
  NumberInput,
  Paper,
  Select,
  Stack,
  Table,
  Text,
  TextInput,
  UnstyledButton,
} from "@mantine/core";
import { MonthPickerInput } from "@mantine/dates";
import { IconTrash } from "@tabler/icons-react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { useQueryClient } from "react-query";

const randomConsistencyIndex = [
  0.0, 0.0, 0.58, 0.9, 1.12, 1.24, 1.32, 1.41, 1.45, 1.49,
];

const TambahEntryNilaiKriteria = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: listKriteria }: { data: any[] } = useGetAllKriteria();

  const handleTambahData = async (payload: any) => {
    try {
      const data = {
        periode: payload.periode,
        name: payload.name,
        BobotKriteria: { ...payload, periode: undefined, name: undefined },
      };
      const response = await CategoryKriteriaService.postCategoryKriteria(data);
      if (response.status === 200) {
        await queryClient.invalidateQueries(["useGetAllCategoryKriteria"]);
        alert("Berhasil handleTambahData!");
        router.push("/proses/entry-nilai-kriteria");
      }
    } catch (error: any) {
      alert(error.stack);
    }
  };

  const renderKriteria = ({
    data = [],
    onChange,
    value,
  }: {
    data: any[];
    onChange: (e: any) => void;
    value?: string;
  }) => (
    <Select
      maw={400}
      required
      data={data}
      onChange={onChange}
      value={String(value)}
    />
  );

  const listHeaderKriteriaOrder: tableHeadersProps[] = [
    {
      label: "No",
      key: "index",
      width: 50,
    },
    {
      label: "kriteria_order",
      key: "kriteria_id",
    },
    {
      label: "Aksi",
      key: "delete_kriteria",
      width: 50,
    },
  ];

  const listHeaderBobotKriteria: tableHeadersProps[] = [
    {
      label: "No",
      key: "index",
    },
    {
      label: "kriteria_order Dituju",
      key: "kriteria_id",
    },
    {
      label: "kriteria_order Pembanding",
      key: "kriteria_pembanding_id",
    },
    {
      label: "Bobot",
      key: "bobot",
    },
  ];

  return (
    <DefaultTemplate title="TambahEntryNilaiKriteria">
      <Formik
        enableReinitialize
        initialValues={{
          periode: new Date(),
          name: "",
          kriteria_order: [0, 0, 0],
          nilai_kriteria: [
            { kriteria_id: 0, kriteria_pembanding_id: 0, bobot: 0 },
            { kriteria_id: 0, kriteria_pembanding_id: 0, bobot: 0 },
            { kriteria_id: 0, kriteria_pembanding_id: 0, bobot: 0 },
          ],
          matriks_kriteria: [
            [1, 0, 0],
            [0, 1, 0],
            [0, 0, 1],
          ],
          total_matriks_kriteria: [1, 1, 1],
          matriks_nilai_kriteria: [
            [1, 0, 0],
            [0, 1, 0],
            [0, 0, 1],
          ],
          nilai_jumlah_kriteria: [1, 1, 1],
          nilai_prioritas_kriteria: [0.333, 0.333, 0.333],
          nilai_eigen_kriteria: [0.333, 0.333, 0.333],
          total_matriks_nilai_kriteria: [1, 1, 1, 1, 0.999, 0.999],
          ci: (0.999 - 3) / (3 - 1),
          ri: 0.58,
          cr: (0.999 - 3) / (3 - 1) / 0.58,
        }}
        onSubmit={(values: any) => handleTambahData(values)}
      >
        {({ handleSubmit, values, setFieldValue }) => (
          <Form onSubmit={handleSubmit}>
            <Stack>
              <Paper p={16}>
                <Stack>
                  <Stack gap={4}>
                    <MonthPickerInput
                      maw={400}
                      label="Pilih Bulan dan Tahun"
                      onChange={(e) => setFieldValue("periode", e)}
                      value={values.periode}
                      required
                    />
                    <TextInput
                      maw={400}
                      label="Nama Kategori"
                      onChange={(e) => setFieldValue("name", e.target.value)}
                      value={values.name!}
                      required
                    />
                  </Stack>
                  <Fieldset
                    legend="Masukkan kriteria yang ingin diambil"
                    disabled={values.name === ""}
                  >
                    <Stack>
                      <DndTable
                        width={"calc(100vw - 230px - 32px - 32px - 32px)"}
                        mah={300}
                        header={listHeaderKriteriaOrder?.map((header) => {
                          if (header.key === "kriteria_id")
                            return {
                              ...header,
                              key: (value: any, index: number) =>
                                renderKriteria({
                                  data: listKriteria?.map((item) => {
                                    return {
                                      label: `${item?.kriteria_id} - ${item?.name}`,
                                      value: String(item?.kriteria_id),
                                    };
                                  }),
                                  onChange: (e) => {
                                    if (
                                      values.kriteria_order.includes(Number(e))
                                    ) {
                                      return alert(
                                        "Tidak bisa memilih kriteria yang sama"
                                      );
                                    }

                                    // Set nilai kriteria_order sesuai dengan perubahan
                                    const newKriteria = [
                                      ...values.kriteria_order,
                                    ];
                                    newKriteria[index] = Number(e);
                                    setFieldValue(
                                      "kriteria_order",
                                      newKriteria
                                    );

                                    // Update nilai_kriteria secara otomatis
                                    setFieldValue(
                                      "nilai_kriteria",
                                      newKriteria.flatMap(
                                        (kriteria_id: number, i: number) => {
                                          return newKriteria
                                            .slice(i + 1)
                                            .map(
                                              (
                                                kriteria_pembanding_id: number
                                              ) => {
                                                return {
                                                  kriteria_id,
                                                  kriteria_pembanding_id,
                                                  bobot: 0, // Atur bobot ke nilai default
                                                };
                                              }
                                            );
                                        }
                                      )
                                    );
                                  },
                                  value: String(value),
                                }),
                            };
                          if (header.key === "delete_kriteria")
                            return {
                              ...header,
                              key: (_: any, index: number) => (
                                <UnstyledButton
                                  onClick={() => {
                                    if (values.kriteria_order.length === 3)
                                      return alert(
                                        "Anda harus memiliki 3 kriteria yang dipilih"
                                      );
                                    const newKriteria =
                                      values.kriteria_order.filter(
                                        (_: any, itemIndex: number) =>
                                          itemIndex !== index
                                      );
                                    setFieldValue(
                                      "kriteria_order",
                                      newKriteria
                                    );
                                    setFieldValue(
                                      "nilai_kriteria",
                                      newKriteria.flatMap(
                                        (
                                          kriteria_id: number,
                                          index: number
                                        ) => {
                                          return newKriteria
                                            .slice(index + 1)
                                            .map(
                                              (
                                                kriteria_pembanding_id: number
                                              ) => {
                                                return {
                                                  kriteria_id,
                                                  kriteria_pembanding_id,
                                                };
                                              }
                                            );
                                        }
                                      )
                                    );
                                  }}
                                >
                                  <IconTrash />
                                </UnstyledButton>
                              ),
                            };
                          return header;
                        })}
                        onChange={(e: any[]) => {
                          setFieldValue("kriteria_order", e);
                          setFieldValue(
                            "nilai_kriteria",
                            e.flatMap((kriteria_id: number, index: number) => {
                              return e
                                .slice(index + 1)
                                .map((kriteria_pembanding_id: number) => {
                                  return {
                                    kriteria_id,
                                    kriteria_pembanding_id,
                                  };
                                });
                            })
                          );
                        }}
                        value={values.kriteria_order}
                      />
                      <Button
                        onClick={() => {
                          if (values.kriteria_order.length === 5)
                            return alert(
                              "Maksimal kriteria yang dipilih hanya 5"
                            );
                          const newKriteria = values.kriteria_order.concat([0]);
                          setFieldValue("kriteria_order", newKriteria);
                          setFieldValue(
                            "nilai_kriteria",
                            newKriteria.flatMap(
                              (kriteria_id: number, index: number) => {
                                return newKriteria
                                  .slice(index + 1)
                                  .map((kriteria_pembanding_id: number) => {
                                    return {
                                      kriteria_id,
                                      kriteria_pembanding_id,
                                    };
                                  });
                              }
                            )
                          );
                          setFieldValue(
                            "nilai_jumlah_kriteria",
                            values.nilai_jumlah_kriteria.concat([1])
                          );
                          setFieldValue(
                            "nilai_prioritas_kriteria",
                            values.nilai_prioritas_kriteria.concat([0.333])
                          );
                          setFieldValue(
                            "nilai_eigen_kriteria",
                            values.nilai_eigen_kriteria.concat([0.333])
                          );

                          const newMatriksKriteria = values.matriks_kriteria
                            .map((row: any) => [...row, 0]) // Add a new row with zeros
                            .concat([
                              newKriteria.map((_: any, i: number) =>
                                i === values.matriks_kriteria.length ? 1 : 0
                              ),
                            ]); // Add a row with diagonal elements as 1

                          // Update matriks_kriteria
                          setFieldValue("matriks_kriteria", newMatriksKriteria);

                          const columnSums = newMatriksKriteria.reduce(
                            (acc: any, row: any) =>
                              row.map((el: any, i: number) => acc[i] + el),
                            Array(newKriteria.length).fill(0)
                          );

                          setFieldValue("total_matriks_kriteria", columnSums);

                          // Update matriks_nilai_kriteria
                          setFieldValue(
                            "matriks_nilai_kriteria",
                            values.matriks_nilai_kriteria
                              .map((row: any) => [...row, 0])
                              .concat([
                                newKriteria.map((_: any, i: number) =>
                                  i === values.matriks_kriteria.length ? 1 : 0
                                ),
                              ])
                          );

                          setFieldValue(
                            "ri",
                            randomConsistencyIndex[newKriteria.length]
                          );
                        }}
                      >
                        Tambah Data
                      </Button>
                    </Stack>
                  </Fieldset>
                  <Fieldset
                    legend="Masukkan Bobot kriteria_order"
                    disabled={values.kriteria_order.includes(0)}
                  >
                    <Stack>
                      <DataTable
                        width={"calc(100vw - 230px - 32px - 32px - 32px)"}
                        mah={300}
                        header={listHeaderBobotKriteria.map((header) => {
                          if (header.key === "bobot")
                            return {
                              ...header,
                              key: (value: any, index: number) => {
                                // console.log(value);
                                return (
                                  <NumberInput
                                    max={10}
                                    onChange={(e) => {
                                      setFieldValue(
                                        `nilai_kriteria[${index}].bobot`,
                                        e
                                      );

                                      // Update matriks_kriteria
                                      const kriteriaId =
                                        values.nilai_kriteria[index]
                                          .kriteria_id;
                                      const kriteriaPembandingId =
                                        values.nilai_kriteria[index]
                                          .kriteria_pembanding_id;

                                      const row =
                                        values.kriteria_order.indexOf(
                                          kriteriaId
                                        );
                                      const col =
                                        values.kriteria_order.indexOf(
                                          kriteriaPembandingId
                                        );

                                      if (row !== -1 && col !== -1) {
                                        const updatedMatriksKriteria =
                                          values.matriks_kriteria.map(
                                            (row: any) => row.slice()
                                          );
                                        updatedMatriksKriteria[row][col] = e;

                                        // Set diagonal elements to 1
                                        for (
                                          let i = 0;
                                          i < values.kriteria_order.length;
                                          i++
                                        ) {
                                          updatedMatriksKriteria[i][i] = 1;

                                          // Set values below the diagonal to reciprocal values
                                          for (
                                            let j = i + 1;
                                            j < values.kriteria_order.length;
                                            j++
                                          ) {
                                            updatedMatriksKriteria[j][i] =
                                              1 / updatedMatriksKriteria[i][j];
                                          }
                                        }

                                        setFieldValue(
                                          "matriks_kriteria",
                                          updatedMatriksKriteria
                                        );

                                        // Calculate total for each column
                                        const columnSums =
                                          updatedMatriksKriteria[0].map(
                                            (_: any, i: number) =>
                                              updatedMatriksKriteria
                                                .map((row: any) => row[i])
                                                .reduce(
                                                  (acc: any, el: any) =>
                                                    acc + el,
                                                  0
                                                )
                                          );

                                        // Set total_matriks_kriteria
                                        setFieldValue(
                                          "total_matriks_kriteria",
                                          columnSums
                                        );

                                        // Set matriks_nilai_kriteria
                                        const reciprocalMatriksKriteria =
                                          updatedMatriksKriteria.map(
                                            (row: any) =>
                                              row.map(
                                                (col: any, j: any) =>
                                                  col / columnSums[j]
                                              )
                                          );

                                        setFieldValue(
                                          "matriks_nilai_kriteria",
                                          reciprocalMatriksKriteria
                                        );

                                        // Hitung total pada setiap baris matriks_nilai_kriteria
                                        const rowTotals =
                                          reciprocalMatriksKriteria.map(
                                            (row: any) =>
                                              row.reduce(
                                                (acc: any, el: any) => acc + el,
                                                0
                                              )
                                          );

                                        // Masukkan total ke dalam nilai_jumlah_kriteria
                                        setFieldValue(
                                          "nilai_jumlah_kriteria",
                                          rowTotals
                                        );

                                        const rowPriority = rowTotals.map(
                                          (row: any) => row / 3
                                        );
                                        setFieldValue(
                                          "nilai_prioritas_kriteria",
                                          rowPriority
                                        );

                                        const rowEigenValue = rowPriority.map(
                                          (row: any, index: number) =>
                                            row * columnSums[index]
                                        );
                                        setFieldValue(
                                          "nilai_eigen_kriteria",
                                          rowEigenValue
                                        );

                                        const mergedMatrix =
                                          reciprocalMatriksKriteria.map(
                                            (row: any, index: number) => [
                                              ...row,
                                              rowTotals[index],
                                              rowPriority[index],
                                              rowEigenValue[index],
                                            ]
                                          );

                                        const totalMatriksNilaiKriteria =
                                          mergedMatrix[0].map(
                                            (_: any, columnIndex: number) =>
                                              mergedMatrix.reduce(
                                                (acc: any, row: any) =>
                                                  acc + row[columnIndex],
                                                0
                                              )
                                          );

                                        setFieldValue(
                                          "total_matriks_nilai_kriteria",
                                          totalMatriksNilaiKriteria
                                        );

                                        const ciValue =
                                          (rowEigenValue.reduce(
                                            (acc: any, el: any) => acc + el,
                                            0
                                          ) -
                                            values.kriteria_order.length) /
                                          (values.kriteria_order.length - 1);

                                        console.log({
                                          total: rowEigenValue.reduce(
                                            (acc: any, el: any) => acc + el,
                                            0
                                          ),
                                          length: values.kriteria_order.length,
                                        });

                                        setFieldValue("ci", ciValue);
                                        setFieldValue(
                                          "cr",
                                          ciValue / values.ri
                                        );
                                      }
                                    }}
                                    value={value.bobot}
                                  />
                                );
                              },
                            };
                          return header;
                        })}
                        data={values.nilai_kriteria.map((item: any) => {
                          const kriteria = listKriteria?.find(
                            (k) => k.kriteria_id === item.kriteria_id
                          );
                          const kriteriaPembanding = listKriteria?.find(
                            (k) => k.kriteria_id === item.kriteria_pembanding_id
                          );
                          return {
                            kriteria_id: kriteria?.name || "",
                            kriteria_pembanding_id:
                              kriteriaPembanding?.name || "",
                            bobot: item.bobot,
                          };
                        })}
                      />
                    </Stack>
                  </Fieldset>
                </Stack>
              </Paper>

              <Divider />

              <Paper p={16}>
                <Stack>
                  <Fieldset legend="Matriks Perbandingan kriteria_order">
                    <Table.ScrollContainer
                      minWidth={"100%"}
                      maw={"calc(100vw - 230px - 32px - 32px - 32px)"}
                      type="native"
                    >
                      <Table
                        striped
                        stickyHeader
                        stickyHeaderOffset={-0.3}
                        highlightOnHover
                        withTableBorder
                        withColumnBorders
                      >
                        <Table.Thead>
                          <Table.Tr>
                            <Table.Th></Table.Th>
                            {values?.kriteria_order?.map(
                              (item: any, index: any) => {
                                const kriteria = listKriteria?.find(
                                  (k) => k.kriteria_id === item
                                );
                                return (
                                  <Table.Th key={index}>
                                    {kriteria?.name ||
                                      String.fromCharCode(65 + index)}
                                  </Table.Th>
                                );
                              }
                            )}
                          </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                          {values?.kriteria_order
                            ?.concat(["Total"])
                            .map((item: any, index: any) => {
                              const kriteria = listKriteria?.find(
                                (k) => k?.kriteria_id === item
                              );
                              return (
                                <Table.Tr key={index}>
                                  <Table.Th>
                                    {kriteria?.name ||
                                      (item === "Total"
                                        ? "Total"
                                        : String.fromCharCode(65 + index))}
                                  </Table.Th>
                                  {item !== "Total" &&
                                    values?.matriks_kriteria[index]?.map(
                                      (item: any, index: any) => (
                                        <Table.Td key={index}>{item}</Table.Td>
                                      )
                                    )}
                                  {item === "Total" &&
                                    values?.total_matriks_kriteria?.map(
                                      (item: any, index: any) => (
                                        <Table.Td key={index}>{item}</Table.Td>
                                      )
                                    )}
                                </Table.Tr>
                              );
                            })}
                        </Table.Tbody>
                      </Table>
                    </Table.ScrollContainer>
                  </Fieldset>
                  <Fieldset legend="Matriks Nilai Perbandingan kriteria_order">
                    <Table.ScrollContainer
                      minWidth={"100%"}
                      maw={"calc(100vw - 230px - 32px - 32px - 32px)"}
                      type="native"
                    >
                      <Table
                        striped
                        stickyHeader
                        stickyHeaderOffset={-0.3}
                        highlightOnHover
                        withTableBorder
                        withColumnBorders
                      >
                        <Table.Thead>
                          <Table.Tr>
                            <Table.Th></Table.Th>
                            {values.kriteria_order?.map(
                              (item: any, index: any) => {
                                const kriteria = listKriteria?.find(
                                  (k) => k.kriteria_id === item
                                );
                                return (
                                  <Table.Th key={index}>
                                    {kriteria?.name ||
                                      String.fromCharCode(65 + index)}
                                  </Table.Th>
                                );
                              }
                            )}
                            <Table.Th>Jumlah</Table.Th>
                            <Table.Th>Prioritas</Table.Th>
                            <Table.Th>Eigen Value</Table.Th>
                          </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                          {values.kriteria_order
                            ?.concat(["Total"])
                            ?.map((item: any, index: any) => {
                              const kriteria = listKriteria?.find(
                                (k) => k.kriteria_id === item
                              );
                              return (
                                <Table.Tr key={index}>
                                  <Table.Th>
                                    {kriteria?.name ||
                                      (item === "Total"
                                        ? "Total"
                                        : String.fromCharCode(65 + index))}
                                  </Table.Th>
                                  {item !== "Total" &&
                                    values?.matriks_nilai_kriteria[index]?.map(
                                      (item: any, index: any) => (
                                        <Table.Td key={index}>{item}</Table.Td>
                                      )
                                    )}
                                  {item === "Total" &&
                                    values?.total_matriks_nilai_kriteria?.map(
                                      (item: any, index: any) => (
                                        <Table.Td key={index}>{item}</Table.Td>
                                      )
                                    )}
                                  {item !== "Total" && (
                                    <Table.Td>
                                      {values?.nilai_jumlah_kriteria[index]}
                                    </Table.Td>
                                  )}
                                  {item !== "Total" && (
                                    <Table.Td>
                                      {values?.nilai_prioritas_kriteria[index]}
                                    </Table.Td>
                                  )}
                                  {item !== "Total" && (
                                    <Table.Td>
                                      {values?.nilai_eigen_kriteria[index]}
                                    </Table.Td>
                                  )}
                                </Table.Tr>
                              );
                            })}
                        </Table.Tbody>
                      </Table>
                    </Table.ScrollContainer>
                  </Fieldset>
                  <Flex maw={500} direction={"row"} align={"end"} gap={8}>
                    <Table
                      striped
                      stickyHeader
                      stickyHeaderOffset={-0.3}
                      highlightOnHover
                      withTableBorder
                      withColumnBorders
                    >
                      <Table.Tbody>
                        <Table.Tr>
                          <Table.Th>CI</Table.Th>
                          <Table.Td>{values.ci}</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                          <Table.Th>RI</Table.Th>
                          <Table.Td>{values.ri}</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                          <Table.Th>CR</Table.Th>
                          <Table.Td>{values.cr}</Table.Td>
                        </Table.Tr>
                      </Table.Tbody>
                    </Table>
                    <Text>
                      {values.cr < 0.1 ? "KONSISTEN" : "TIDAK KONSISTEN"}
                    </Text>
                  </Flex>
                </Stack>
              </Paper>

              <Divider />

              <Paper p={16}>
                <Button
                  type="submit"
                  w={"100%"}
                  maw={200}
                  variant="filled"
                  color="teal"
                >
                  Submit
                </Button>
              </Paper>
            </Stack>
          </Form>
        )}
      </Formik>
    </DefaultTemplate>
  );
};

export default TambahEntryNilaiKriteria;
