import DefaultTemplate from "@/components/templates/Default/Default";
import {
  AlternatifService,
  useGetOneAlternatif,
} from "@/services/alternatifService";
import { useGetAllAttribute } from "@/services/attributeService";
import {
  Button,
  Divider,
  NumberInput,
  Paper,
  Select,
  Stack,
  TextInput,
  Textarea,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { useQueryClient } from "react-query";

const EditDataAlternatif = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { alternatif_id }: { [key: string]: any } = router.query;
  const { data: detailAlternatif } = useGetOneAlternatif(alternatif_id!);
  const { data: listAttribute }: { data: any[] } = useGetAllAttribute();

  const handleEditData = async (payload: any) => {
    try {
      const response = await AlternatifService.putAlternatif(
        {
          dataJson: payload,
        },
        alternatif_id
      );
      if (response?.status === 200) {
        await queryClient.invalidateQueries(["useGetAllAlternatif"]);
        alert("Berhasil handleEditData!");
        router.push("/data/data-alternatif");
      }
    } catch (error: any) {
      alert(error.stack);
    }
  };

  return (
    <DefaultTemplate title="EditDataAlternatif">
      <Paper p={16}>
        <Formik
          enableReinitialize
          initialValues={
            listAttribute && detailAlternatif
              ? Object.fromEntries(
                  listAttribute?.map((item) => [
                    item?.key,
                    detailAlternatif?.dataJson?.[item?.key],
                  ])
                )
              : {}
          }
          onSubmit={(values: any) => handleEditData(values)}
        >
          {({ handleSubmit, values, setFieldValue }) => (
            <Form onSubmit={handleSubmit}>
              <Stack>
                <Stack gap={4}>
                  {listAttribute?.map((item: any, index: number) => {
                    if (item.key === "gender")
                      return (
                        <Select
                          key={index}
                          maw={400}
                          label={item?.label}
                          data={["PRIA", "WANITA"]}
                          required
                          onChange={(e) => setFieldValue(item.key, e)}
                          value={values?.[item.key]}
                        />
                      );
                    if (item.type === "number")
                      return (
                        <NumberInput
                          key={index}
                          maw={400}
                          label={item?.label}
                          required
                          onChange={(e) => setFieldValue(item.key, e)}
                          value={Number(values?.[item.key]) || 0}
                        />
                      );
                    if (item.type === "date")
                      return (
                        <DatePickerInput
                          key={index}
                          maw={400}
                          label={item?.label}
                          required
                          onChange={(e) => setFieldValue(item.key, e)}
                          value={
                            values?.[item?.key]
                              ? new Date(values?.[item?.key])
                              : new Date()
                          }
                        />
                      );
                    return (
                      <TextInput
                        key={index}
                        maw={400}
                        label={item?.label}
                        required
                        onChange={(e) =>
                          setFieldValue(item.key, e.target.value)
                        }
                        value={values?.[item.key] || ""}
                      />
                    );
                  })}
                </Stack>
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
      </Paper>
    </DefaultTemplate>
  );
};

export default EditDataAlternatif;
