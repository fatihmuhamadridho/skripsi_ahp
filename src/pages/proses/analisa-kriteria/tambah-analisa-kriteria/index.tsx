import DataTable from "@/components/atoms/DataTable/DataTable";
import { DndTable } from "@/components/atoms/DndTable/DndTable";
import DefaultTemplate from "@/components/templates/Default/Default";
import {
  AnalisaKriteriaService,
  useGetAllNilaiPreferensi,
} from "@/services/analisaKriteriaService";
import { useGetAllKriteria } from "@/services/kriteriaService";
import {
  Button,
  Divider,
  Fieldset,
  Paper,
  Select,
  Stack,
  Text,
  TextInput,
  UnstyledButton,
} from "@mantine/core";
import { MonthPickerInput } from "@mantine/dates";
import { IconTrash } from "@tabler/icons-react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useQueryClient } from "react-query";
import { isEqual } from "lodash";

const TambahAnalisaKriteria = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: listKriteria } = useGetAllKriteria();
  const { data: listNliaiPreferensi } = useGetAllNilaiPreferensi();
  const [analisaKonsistensi, setAnalisaKonsistensi] = useState<any>();

  const handleTambahData = async (values: any) => {
    const payload = { ...values, matriks_perbandingan: undefined };
    try {
      const response = await AnalisaKriteriaService.postAnalisaKriteria({
        ...payload,
        ...analisaKonsistensi,
      });
      if (response.status === 200) {
        await queryClient.invalidateQueries(["useGetAllAnalisaKriteria"]);
        alert("Berhasil handleTambahData!");
        router.push("/proses/analisa-kriteria");
      }
    } catch (error: any) {
      alert(error.stack);
    }
  };

  const handleCheckKonsistensi = async (payload: any) => {
    try {
      const response = await AnalisaKriteriaService.checkConsistent(payload);
      if (response.status === 200) {
        alert("Berhasil handleCheckKonsistensi!");
        setAnalisaKonsistensi(response.data.data);
      }
    } catch (error: any) {
      alert(error.stack);
    }
  };

  const listSelectKriteria = (selected: any, values: any) => {
    if (selected?.kriteria_id !== 0)
      return [selected]
        .concat(
          listKriteria?.filter(
            (itemFilter: any) =>
              !values.kriteria.some(
                (selectedItem: any) =>
                  selectedItem?.kriteria_id === itemFilter?.kriteria_id
              )
          ) || []
        )
        ?.map((item: any) => ({
          label: item?.name,
          value: String(item?.kriteria_id),
        }));
    return (
      listKriteria
        ?.filter(
          (itemFilter: any) =>
            !values.kriteria.some(
              (selectedItem: any) =>
                selectedItem.kriteria_id === itemFilter.kriteria_id
            )
        )
        ?.map((item: any) => ({
          label: item?.name,
          value: String(item?.kriteria_id),
        })) || []
    );
  };

  const handleNewMatriksPerbandingan = (callback: any, newKriteria: any) => {
    callback(
      "matriks_perbandingan",
      newKriteria.flatMap((kriteria: any, i: number) => {
        return newKriteria.slice(i + 1).map((kriteria_pembanding: any) => {
          return {
            kriteria_id: kriteria?.kriteria_id,
            kriteria_pembanding_id: kriteria_pembanding?.kriteria_id,
            value: null,
          };
        });
      })
    );
  };

  const onChangeSelectKriteria = (
    callback: any,
    e: any,
    index: number,
    values: any
  ) => {
    const findKriteria = listKriteria.find(
      (item: any) => item.kriteria_id === Number(e)
    );
    callback(`kriteria[${index}]`, findKriteria);

    const newKriteria = [...values.kriteria];
    newKriteria[index] = findKriteria;
    handleNewMatriksPerbandingan(callback, newKriteria);
  };

  const handleDeleteSelectKriteria = (
    callback: any,
    values: any,
    index: number
  ) => {
    const newKriteria = values.kriteria.filter(
      (_: any, kriteriaIndex: number) => kriteriaIndex !== index
    );
    callback("kriteria", newKriteria);
    handleNewMatriksPerbandingan(callback, newKriteria);
  };

  const handleTambahSelectKriteria = (callback: any, values: any) => {
    const newKriteria = values.kriteria.concat([
      {
        name: String.fromCharCode(65 + values.kriteria.length),
        kriteria_id: 0,
      },
    ]);
    callback("kriteria", newKriteria);
    handleNewMatriksPerbandingan(callback, newKriteria);
  };

  return (
    <DefaultTemplate title="TambahAnalisaKriteria">
      <Formik
        initialValues={{
          name: "",
          periode: new Date(),
          kriteria: [
            { kriteria_id: 0, name: "A" },
            { kriteria_id: 0, name: "B" },
            { kriteria_id: 0, name: "C" },
          ],
          matriks_perbandingan: [
            {
              kriteria_id: 0,
              kriteria_pembanding_id: 0,
              value: 0,
            },
            {
              kriteria_id: 0,
              kriteria_pembanding_id: 0,
              value: 0,
            },
            {
              kriteria_id: 0,
              kriteria_pembanding_id: 0,
              value: 0,
            },
          ],
        }}
        onSubmit={(values: any) => handleTambahData(values)}
      >
        {({ handleSubmit, values, setFieldValue }) => (
          <Form onSubmit={handleSubmit}>
            <Stack>
              <Paper p={16} pt={8}>
                <Stack gap={4}>
                  <TextInput
                    maw={400}
                    label="Nama Kategori Kriteria"
                    required
                    onChange={(e) => setFieldValue("name", e.target.value)}
                    value={values.name}
                  />
                  <MonthPickerInput
                    maw={400}
                    label="Priode Kategori Kriteria"
                    required
                    onChange={(e) => setFieldValue("name", e)}
                    value={new Date()}
                  />
                </Stack>
              </Paper>
              <Divider />
              <Paper p={16}>
                <Fieldset legend="Pilih Kriteria">
                  <Stack gap={12}>
                    <DndTable
                      header={[
                        { label: "No", key: "index", width: 30 },
                        {
                          label: "Kriteria",
                          key: (_: any, index: number) => (
                            <Select
                              data={listSelectKriteria(
                                values.kriteria[index],
                                values
                              )}
                              onChange={(e) =>
                                onChangeSelectKriteria(
                                  setFieldValue,
                                  e,
                                  index,
                                  values
                                )
                              }
                              value={String(
                                values.kriteria[index]?.kriteria_id
                              )}
                              allowDeselect={false}
                            />
                          ),
                          width: "100%",
                        },
                        {
                          label: "Aksi",
                          key: (_: any, index: any) => (
                            <UnstyledButton
                              onClick={() =>
                                handleDeleteSelectKriteria(
                                  setFieldValue,
                                  values,
                                  index
                                )
                              }
                              disabled={values.kriteria.length < 4}
                            >
                              <IconTrash
                                color={
                                  values.kriteria.length < 4 ? "gray" : "black"
                                }
                              />
                            </UnstyledButton>
                          ),
                          width: 50,
                        },
                      ]}
                      onChange={(e) => setFieldValue("Kriteria", e)}
                      value={values.kriteria}
                    />
                    <Button
                      onClick={() =>
                        handleTambahSelectKriteria(setFieldValue, values)
                      }
                      disabled={values.kriteria.length > 4}
                    >
                      Tambah Kriteria
                    </Button>
                  </Stack>
                </Fieldset>
              </Paper>
              <Divider />
              <Paper p={16}>
                <Fieldset legend="Input Bobot Kriteria">
                  <DataTable
                    header={[
                      {
                        label: "Kriteria",
                        key: "kriteria_id",
                        width: "15vw",
                      },
                      {
                        label: "Dibandingkan",
                        key: (_: any, index: number) => (
                          <Select
                            data={
                              listNliaiPreferensi?.map((item: any) => {
                                return {
                                  label: `${item.value} - ${item.label}`,
                                  value: String(item.value),
                                };
                              }) || []
                            }
                            onChange={(e) =>
                              setFieldValue(
                                `matriks_perbandingan[${index}].value`,
                                Number(e)
                              )
                            }
                            value={
                              values.matriks_perbandingan[index].value
                                ? String(
                                    values.matriks_perbandingan[index].value
                                  )
                                : null
                            }
                            required
                          />
                        ),
                        width: "25vw",
                      },
                      {
                        label: "Kriteria Pembanding",
                        key: "kriteria_pembanding_id",
                        width: "15vw",
                      },
                    ]}
                    data={values.matriks_perbandingan.map((item: any) => {
                      const kriteria = listKriteria?.find(
                        (k: any) => k.kriteria_id === item.kriteria_id
                      );
                      const kriteriaPembanding = listKriteria?.find(
                        (k: any) =>
                          k.kriteria_id === item.kriteria_pembanding_id
                      );
                      return {
                        kriteria_id: kriteria?.name || String.fromCharCode(65),
                        kriteria_pembanding_id:
                          kriteriaPembanding?.name || String.fromCharCode(66),
                        value: item.value,
                      };
                    })}
                  />
                </Fieldset>
              </Paper>
              {!isEqual(
                values?.matriks_perbandingan,
                analisaKonsistensi?.matriks_perbandingan
              ) && (
                <React.Fragment>
                  <Divider />
                  <Paper p={16}>
                    <Button
                      w={"100%"}
                      maw={200}
                      variant="filled"
                      color="orange"
                      onClick={() => handleCheckKonsistensi(values)}
                    >
                      Check Konsistensi
                    </Button>
                  </Paper>
                </React.Fragment>
              )}
              {isEqual(
                values?.matriks_perbandingan,
                analisaKonsistensi?.matriks_perbandingan
              ) && (
                <React.Fragment>
                  <Divider />
                  <Paper p={16}>
                    <Fieldset legend="Matriks Perbandingan Berpasangan">
                      <DataTable
                        header={[{ label: "", key: "header" }].concat(
                          values.kriteria.map((item: any, index: number) => {
                            return { label: item.name, key: String(index) };
                          })
                        )}
                        data={values.kriteria
                          .map((item: any, index: number) => {
                            return {
                              header: item.name,
                              ...analisaKonsistensi
                                .matriks_perbandingan_berpasangan[index],
                            };
                          })
                          .concat([
                            {
                              header: "Jumlah",
                              ...analisaKonsistensi.total_matriks_perbandingan.map(
                                (item: any) => item.value
                              ),
                            },
                          ])}
                      />
                    </Fieldset>
                  </Paper>
                  <Divider />
                  <Paper p={16}>
                    <Fieldset legend="Matriks Nilai Kriteria">
                      <DataTable
                        header={[{ label: "", key: "header" }]
                          .concat(
                            values.kriteria.map((item: any, index: number) => {
                              return { label: item.name, key: String(index) };
                            })
                          )
                          .concat([
                            {
                              label: "Jumlah",
                              key: String(values.kriteria.length + 1),
                            },
                            {
                              label: "Prioritas",
                              key: String(values.kriteria.length + 2),
                            },
                            {
                              label: "Eigen Value",
                              key: String(values.kriteria.length + 3),
                            },
                          ])}
                        data={values.kriteria
                          .map((item: any, index: number) => {
                            return {
                              header: item.name,
                              ...analisaKonsistensi?.matriks_bobot[index]?.map(
                                (itemMap: any) => itemMap.value
                              ),
                              [String(values.kriteria.length + 1)]:
                                analisaKonsistensi?.total_bobot[index].value,
                              [String(values.kriteria.length + 2)]:
                                analisaKonsistensi?.prioritas_bobot[index]
                                  .value,
                              [String(values.kriteria.length + 3)]:
                                analisaKonsistensi?.eigen_bobot[index].value,
                            };
                          })
                          .concat([
                            {
                              header: "Jumlah",
                              ...analisaKonsistensi.total_bobot.map(
                                (item: any) => item.value
                              ),
                              [String(values.kriteria.length + 1)]:
                                analisaKonsistensi?.total_bobot?.reduce(
                                  (a: any, b: any) => a + b.value,
                                  0
                                ),
                              [String(values.kriteria.length + 2)]:
                                analisaKonsistensi?.prioritas_bobot?.reduce(
                                  (a: any, b: any) => a + b.value,
                                  0
                                ),
                              [String(values.kriteria.length + 3)]:
                                analisaKonsistensi?.eigen_bobot?.reduce(
                                  (a: any, b: any) => a + b.value,
                                  0
                                ),
                            },
                          ])}
                      />
                    </Fieldset>
                  </Paper>
                  <Divider />
                  <Paper p={16}>
                    <Fieldset legend="Perhitungan Konsistensi CR">
                      <DataTable
                        maw={350}
                        header={[
                          { label: "", key: "header" },
                          { label: "", key: "value" },
                        ]}
                        data={[
                          {
                            header: <Text>CI</Text>,
                            value: analisaKonsistensi.ci,
                          },
                          {
                            header: <Text>RI</Text>,
                            value: analisaKonsistensi.ri,
                          },
                          {
                            header: <Text>CR</Text>,
                            value: analisaKonsistensi.cr,
                          },
                        ]}
                      />
                    </Fieldset>
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
                </React.Fragment>
              )}
            </Stack>
          </Form>
        )}
      </Formik>
    </DefaultTemplate>
  );
};

export default TambahAnalisaKriteria;
