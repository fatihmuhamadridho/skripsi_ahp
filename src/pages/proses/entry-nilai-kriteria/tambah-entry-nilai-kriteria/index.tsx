import DataTable, {
  tableHeadersProps,
} from "@/components/atoms/DataTable/DataTable";
import { DndTable } from "@/components/atoms/DndTable/DndTable";
import DefaultTemplate from "@/components/templates/Default/Default";
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
import React from "react";

const TambahEntryNilaiKriteria = () => {
  const { data: listKriteria }: { data: any[] } = useGetAllKriteria();

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
      label: "Kriteria",
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
      label: "Kriteria Dituju",
      key: "kriteria_id",
    },
    {
      label: "Kriteria Pembanding",
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
          Kriteria: [0, 0, 0],
          bobot_kriteria: [
            { kriteria_id: 5, kriteria_pembanding_id: 7, bobot: 3 },
            { kriteria_id: 5, kriteria_pembanding_id: 8, bobot: 5 },
            { kriteria_id: 7, kriteria_pembanding_id: 8, bobot: 3 },
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
          nilai_jumlah_kriteria: [1, 2, 3],
          nilai_prioritas_kriteria: [4, 5, 6],
          nilai_eigen_kriteria: [7, 8, 9],
          total_matriks_nilai_kriteria: [1, 1, 1, 1, 1, 1],
          ci: 0,
          ri: 0,
          cr: 0,
        }}
        onSubmit={(values: any) => console.log(values)}
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
                                    if (values.Kriteria.includes(Number(e))) {
                                      return alert(
                                        "Tidak bisa memilih kriteria yang sama"
                                      );
                                    }

                                    // Set nilai Kriteria sesuai dengan perubahan
                                    const newKriteria = [...values.Kriteria];
                                    newKriteria[index] = Number(e);
                                    setFieldValue("Kriteria", newKriteria);

                                    // Update bobot_kriteria secara otomatis
                                    setFieldValue(
                                      "bobot_kriteria",
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
                                    if (values.Kriteria.length === 3)
                                      return alert(
                                        "Anda harus memiliki 3 kriteria yang dipilih"
                                      );
                                    const newKriteria = values.Kriteria.filter(
                                      (_: any, itemIndex: number) =>
                                        itemIndex !== index
                                    );
                                    setFieldValue("Kriteria", newKriteria);
                                    setFieldValue(
                                      "bobot_kriteria",
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
                          setFieldValue("Kriteria", e);
                          setFieldValue(
                            "bobot_kriteria",
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
                        value={values.Kriteria}
                      />
                      <Button
                        onClick={() => {
                          const newKriteria = values.Kriteria.concat([0]);
                          setFieldValue("Kriteria", newKriteria);
                          setFieldValue(
                            "bobot_kriteria",
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
                                newKriteria.map(() => 0).concat([0, 0, 0]),
                              ])
                          );
                        }}
                      >
                        Tambah Data
                      </Button>
                    </Stack>
                  </Fieldset>
                  <Fieldset
                    legend="Masukkan Bobot Kriteria"
                    disabled={values.Kriteria.includes(0)}
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
                                console.log(value);
                                return (
                                  <NumberInput
                                    onChange={(e) => {
                                      setFieldValue(
                                        `bobot_kriteria[${index}].bobot`,
                                        e
                                      );

                                      // Update matriks_kriteria
                                      const kriteriaId =
                                        values.bobot_kriteria[index]
                                          .kriteria_id;
                                      const kriteriaPembandingId =
                                        values.bobot_kriteria[index]
                                          .kriteria_pembanding_id;

                                      const row =
                                        values.Kriteria.indexOf(kriteriaId);
                                      const col =
                                        values.Kriteria.indexOf(
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
                                          i < values.Kriteria.length;
                                          i++
                                        ) {
                                          updatedMatriksKriteria[i][i] = 1;

                                          // Set values below the diagonal to reciprocal values
                                          for (
                                            let j = i + 1;
                                            j < values.Kriteria.length;
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

                                        setFieldValue(
                                          "total_matriks_nilai_kriteria",
                                          reciprocalMatriksKriteria[0].map(
                                            (_: any, i: number) =>
                                              reciprocalMatriksKriteria
                                                .map((row: any) => row[i])
                                                .reduce(
                                                  (acc: any, el: any) =>
                                                    acc + el,
                                                  0
                                                )
                                          )
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
                        data={values.bobot_kriteria.map((item: any) => {
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
                  <Fieldset legend="Matriks Perbandingan Kriteria">
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
                            {values?.Kriteria?.map((item: any, index: any) => {
                              const kriteria = listKriteria?.find(
                                (k) => k.kriteria_id === item
                              );
                              return (
                                <Table.Th key={index}>
                                  {kriteria?.name ||
                                    String.fromCharCode(65 + index)}
                                </Table.Th>
                              );
                            })}
                          </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                          {values?.Kriteria?.concat(["Total"]).map(
                            (item: any, index: any) => {
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
                            }
                          )}
                        </Table.Tbody>
                      </Table>
                    </Table.ScrollContainer>
                  </Fieldset>
                  <Fieldset legend="Matriks Nilai Perbandingan Kriteria">
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
                            {values.Kriteria?.map((item: any, index: any) => {
                              const kriteria = listKriteria?.find(
                                (k) => k.kriteria_id === item
                              );
                              return (
                                <Table.Th key={index}>
                                  {kriteria?.name ||
                                    String.fromCharCode(65 + index)}
                                </Table.Th>
                              );
                            })}
                            <Table.Th>Jumlah</Table.Th>
                            <Table.Th>Prioritas</Table.Th>
                            <Table.Th>Eigen Value</Table.Th>
                          </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                          {values.Kriteria?.concat(["Total"])?.map(
                            (item: any, index: any) => {
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
                                </Table.Tr>
                              );
                            }
                          )}
                        </Table.Tbody>
                      </Table>
                    </Table.ScrollContainer>
                  </Fieldset>
                  <Flex maw={300} direction={"row"} align={"end"} gap={8}>
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
                    <Text>{values.cr < 0.1 ? "KONSTAN" : "TIDAK KONSTAN"}</Text>
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
