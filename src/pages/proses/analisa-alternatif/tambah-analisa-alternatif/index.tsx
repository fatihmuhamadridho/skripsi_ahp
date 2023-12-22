import DataTable, {
  tableHeadersProps,
} from "@/components/atoms/DataTable/DataTable";
import { DndTable } from "@/components/atoms/DndTable/DndTable";
import DefaultTemplate from "@/components/templates/Default/Default";
import { useGetAllAlternatif } from "@/services/alternatifService";
import { AnalisaAlternatifService } from "@/services/analisaAlternatifService";
import { useGetAllAnalisaKriteria } from "@/services/analisaKriteriaService";
import { KriteriaService } from "@/services/kriteriaService";
import {
  Button,
  Divider,
  Fieldset,
  NumberInput,
  Paper,
  Select,
  Stack,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useQueryClient } from "react-query";
import util from "util";

const TambahAnalisaAlternatif = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: listKategori } = useGetAllAnalisaKriteria();
  const { data: listAlternatif } = useGetAllAlternatif();
  const [alternatif, setAlternatif] = useState<any>([
    {
      alternatif_id: 0,
      bobot: [
        { kriteria_id: 0, bobot: 0, value: 0 },
        { kriteria_id: 0, bobot: 0, value: 0 },
        { kriteria_id: 0, bobot: 0, value: 0 },
      ],
      total_bobot: 0,
    },
    {
      alternatif_id: 0,
      bobot: [
        { kriteria_id: 0, bobot: 0, value: 0 },
        { kriteria_id: 0, bobot: 0, value: 0 },
        { kriteria_id: 0, bobot: 0, value: 0 },
      ],
      total_bobot: 0,
    },
    {
      alternatif_id: 0,
      bobot: [
        { kriteria_id: 0, bobot: 0, value: 0 },
        { kriteria_id: 0, bobot: 0, value: 0 },
        { kriteria_id: 0, bobot: 0, value: 0 },
      ],
      total_bobot: 0,
    },
  ]);

  const handleTambahData = async (values: any) => {
    try {
      const payload = values.alternatif.map((item: any) => ({
        ...item,
        kategori_id: JSON.parse(values.kategori).kategori_id,
        dataJson: undefined,
      }));
      const response = await AnalisaAlternatifService.postAnalisaAlternatif(
        payload
      );
      if (response.status === 200) {
        await queryClient.invalidateQueries(["useGetAllAnalisaAlternatif"]);
        alert("Berhasil handleTambahData!");
        router.push("/data/data-alternatif");
      }
    } catch (error: any) {
      alert(error.stack);
    }
  };

  const listSelectAlternatif = (selected: any, values: any) => {
    if (selected?.alternatif_id !== 0)
      return [selected]
        .concat(
          listAlternatif?.filter(
            (itemFilter: any) =>
              !values.some(
                (selectedItem: any) =>
                  selectedItem?.alternatif_id === itemFilter?.alternatif_id
              )
          ) || []
        )
        ?.map((item: any) => ({
          label: `${item?.alternatif_id} - ${Object.values(item?.dataJson)[0]}`,
          value: String(item?.alternatif_id),
        }));
    return (
      listAlternatif
        ?.filter(
          (itemFilter: any) =>
            !values.some(
              (selectedItem: any) =>
                selectedItem.alternatif_id === itemFilter.alternatif_id
            )
        )
        ?.map((item: any) => ({
          label: `${item?.alternatif_id} - ${Object.values(item?.dataJson)[0]}`,
          value: String(item?.alternatif_id),
        })) || []
    );
  };

  return (
    <DefaultTemplate title="TambahAnalisaAlternatif">
      <Formik
        initialValues={{
          kategori: "",
          alternatif: [
            {
              alternatif_id: 0,
              bobot: [
                { kriteria_id: 0, bobot: 0, value: 0 },
                { kriteria_id: 0, bobot: 0, value: 0 },
                { kriteria_id: 0, bobot: 0, value: 0 },
              ],
              total_bobot: 0,
            },
            {
              alternatif_id: 0,
              bobot: [
                { kriteria_id: 0, bobot: 0, value: 0 },
                { kriteria_id: 0, bobot: 0, value: 0 },
                { kriteria_id: 0, bobot: 0, value: 0 },
              ],
              total_bobot: 0,
            },
            {
              alternatif_id: 0,
              bobot: [
                { kriteria_id: 0, bobot: 0, value: 0 },
                { kriteria_id: 0, bobot: 0, value: 0 },
                { kriteria_id: 0, bobot: 0, value: 0 },
              ],
              total_bobot: 0,
            },
          ],
        }}
        onSubmit={(values: any) =>
          // console.log(
          //   util.inspect(alternatif, {
          //     showHidden: false,
          //     depth: null,
          //     colors: true,
          //   })
          // )
          handleTambahData(values)
        }
      >
        {({ handleSubmit, values, setFieldValue }) => (
          <Form onSubmit={handleSubmit}>
            <Stack>
              <Paper p={16}>
                <Select
                  maw={400}
                  label="Nama Kriteria"
                  required
                  data={listKategori?.map((item: any) => ({
                    label: `${item.kategori_id} - ${item.name}`,
                    value: JSON.stringify(item),
                  }))}
                  onChange={(e) => setFieldValue("kategori", e)}
                  value={values?.kategori}
                />
              </Paper>
              <Divider />
              <Paper p={16}>
                <Fieldset
                  legend="Input Bobot Pada Alternatif"
                  disabled={values?.kategori?.length > 1 ? false : true}
                >
                  <DataTable
                    header={[
                      {
                        label: "Alternatif",
                        key: (_: any, index: number) => (
                          <Select
                            data={listSelectAlternatif(
                              values.alternatif[index],
                              values.alternatif
                            )}
                            onChange={(e) => {
                              const findAlternatif = listAlternatif.find(
                                (item: any) => item.alternatif_id === Number(e)
                              );
                              setFieldValue(`alternatif[${index}]`, {
                                ...values.alternatif[index],
                                ...findAlternatif,
                                bobot: JSON?.parse(
                                  values?.kategori
                                )?.AnalisaKriteria?.prioritas_bobot?.map(
                                  (item: any) => ({
                                    kriteria_id: item.kriteria?.kriteria_id,
                                    bobot: 0,
                                    value: 0,
                                  })
                                ),
                              });
                              const newAlternatif = alternatif;
                              newAlternatif[index] = {
                                ...alternatif[index],
                                ...findAlternatif,
                                bobot: JSON?.parse(
                                  values?.kategori
                                )?.AnalisaKriteria?.prioritas_bobot?.map(
                                  (item: any) => ({
                                    kriteria_id: item.kriteria?.kriteria_id,
                                    bobot: 0,
                                    value: 0,
                                  })
                                ),
                              };
                              setFieldValue(`alternatif`, newAlternatif);
                            }}
                            value={
                              String(values.alternatif[index].alternatif_id) ||
                              ""
                            }
                            allowDeselect={false}
                          />
                        ),
                        width: 200,
                      },
                      ...Array.from(
                        values.kategori.length > 1
                          ? Array.from(
                              JSON.parse(values.kategori)?.AnalisaKriteria
                                ?.prioritas_bobot
                            ).map((item: any, index: number) => ({
                              label: item.kriteria.name,
                              key: (_: any, j: number) => (
                                <NumberInput
                                  onChange={(e) => {
                                    const newAlternatif = values.alternatif;
                                    newAlternatif[j].bobot[index].bobot = e;
                                    newAlternatif[j].bobot[index].value =
                                      Number(item.value) * Number(e);
                                    newAlternatif[j].total_bobot =
                                      newAlternatif[j].bobot.reduce(
                                        (a: any, b: any) => a + b.value,
                                        0
                                      );
                                    setFieldValue("alternatif", newAlternatif);
                                  }}
                                />
                              ),
                              width: 150,
                            }))
                          : [
                              {
                                label: "A",
                                key: () => <NumberInput />,
                                width: 150,
                              },
                              {
                                label: "B",
                                key: () => <NumberInput />,
                                width: 150,
                              },
                              {
                                label: "C",
                                key: () => <NumberInput />,
                                width: 150,
                              },
                            ]
                      ),
                    ]}
                    data={values.alternatif.map((item: any) => ({
                      ...item,
                      fullname: item.dataJson?.fullname || "",
                    }))}
                  />
                </Fieldset>
              </Paper>
              <Divider />
              <Paper p={16}>
                <Fieldset legend="Hasil Bobot Pada Alternatif">
                  <DataTable
                    header={[
                      {
                        label: "Alternatif",
                        key: "fullname",
                      },
                      ...Array.from(
                        values.kategori.length > 1
                          ? Array.from(
                              JSON.parse(values.kategori)?.AnalisaKriteria
                                ?.prioritas_bobot
                            ).map((item: any, index: number) => ({
                              label: item.kriteria.name,
                              key: (_: any, j: number) => (
                                <Text>
                                  {
                                    new Array(...values.alternatif).sort(
                                      (a: any, b: any) =>
                                        b.total_bobot - a.total_bobot
                                    )[j].bobot[index].value
                                  }
                                </Text>
                              ),
                              width: 150,
                            }))
                          : [
                              {
                                label: "A",
                                key: (_: any, j: number) => <Text>0</Text>,
                                width: 150,
                              },
                              {
                                label: "B",
                                key: (_: any, j: number) => <Text>0</Text>,
                                width: 150,
                              },
                              {
                                label: "C",
                                key: (_: any, j: number) => <Text>0</Text>,
                                width: 150,
                              },
                            ]
                      ),
                      {
                        label: "Total",
                        key: "total_bobot",
                      },
                      {
                        label: "Ranking",
                        key: "ranking",
                      },
                    ]}
                    data={new Array(...values.alternatif)
                      .sort((a: any, b: any) => b.total_bobot - a.total_bobot)
                      .map((item: any, index: number) => ({
                        ...item,
                        fullname: item.dataJson?.fullname || "",
                        ranking: index + 1,
                      }))}
                  />
                </Fieldset>
              </Paper>
              <Divider />
              <Button
                type="submit"
                w={"100%"}
                maw={200}
                variant="filled"
                color="teal"
              >
                Submit
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </DefaultTemplate>
  );
};

export default TambahAnalisaAlternatif;
