import DefaultTemplate from "@/components/templates/Default/Default";
import { KriteriaService } from "@/services/kriteriaService";
import {
  Box,
  Button,
  Divider,
  Fieldset,
  Flex,
  Paper,
  Select,
  Space,
  Stack,
  TextInput,
  rem,
} from "@mantine/core";
import { IconGripVertical, IconTrash } from "@tabler/icons-react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useQueryClient } from "react-query";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import {
  AttributeService,
  useGetAllAttribute,
  useGetAllAttributeTypes,
} from "@/services/attributeService";
import util from "util";

const SettingPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: listTypes } = useGetAllAttributeTypes();
  const { data: listAttribute } = useGetAllAttribute();

  const Items = ({ values, callback }: { values: any; callback: any }) =>
    values?.fields?.map((item: any, index: number) => (
      <Draggable
        key={index}
        index={index}
        draggableId={String(index)}
        isDragDisabled={values.fields.length < 2}
      >
        {(provided) => (
          <Flex ref={provided.innerRef} {...provided.draggableProps} gap={16}>
            <Box {...provided.dragHandleProps}>
              <Space h={34} />
              <IconGripVertical
                style={{
                  width: rem(18),
                  height: rem(18),
                }}
                stroke={1.5}
              />
            </Box>
            <Box>
              <Space h={25} />
              <Button variant="default">{index + 1}</Button>
            </Box>
            <TextInput
              w={"100%"}
              label="Label"
              required
              onChange={(e) =>
                callback(`fields[${index}].label`, e.target.value)
              }
              value={item.label || ""}
            />
            <TextInput
              w={"100%"}
              label="Key"
              required
              pattern="^[a-zA-Z0-9_]+$"
              onChange={(e) => callback(`fields[${index}].key`, e.target.value)}
              value={item.key || ""}
            />
            <Select
              w={"100%"}
              label="Tipe Data"
              required
              data={listTypes}
              onChange={(e) => callback(`fields[${index}].type`, e)}
              value={item.type || ""}
            />
            <Box>
              <Space h={25} />
              <Button
                variant="default"
                onClick={() =>
                  callback(
                    "fields",
                    values.fields.filter(
                      (currentItem: any) => currentItem !== item
                    )
                  )
                }
                disabled={values.fields.length < 2}
              >
                <IconTrash size={20} />
              </Button>
            </Box>
          </Flex>
        )}
      </Draggable>
    ));

  const handleTambahData = async (payload: any) => {
    try {
      const finalPayload = payload.fields.map((item: any, index: number) => {
        return { ...item, index: index };
      });
      const response = await AttributeService.updateAttribute({
        fields: finalPayload,
      });
      if (response.status === 200) {
        await queryClient.invalidateQueries(["useGetAllKriteria"]);
        alert("Berhasil handleTambahData!");
        // router.push("/data/data-kriteria");
      }
    } catch (error: any) {
      alert(error.stack);
    }
  };

  return (
    <DefaultTemplate title="SettingPage">
      <Paper p={16}>
        <Formik
          enableReinitialize
          initialValues={{
            fields: listAttribute || [
              { label: "", key: "", type: "", index: 0 },
            ],
          }}
          onSubmit={(values: any) => {
            handleTambahData(values);
            console.log(
              util.inspect(values, {
                showHidden: false,
                depth: null,
                colors: true,
              })
            );
          }}
        >
          {({ handleSubmit, values, setFieldValue }) => (
            <DragDropContext
              onDragEnd={({ destination, source }) => {
                const reorderedFields = [...values?.fields];
                if (destination) {
                  const [movedField] = reorderedFields.splice(source.index, 1);
                  reorderedFields.splice(destination.index, 0, movedField);
                  setFieldValue("fields", reorderedFields);
                }
              }}
            >
              <Form onSubmit={handleSubmit}>
                <Stack>
                  <Fieldset legend="Atribut Data Alternatif">
                    <Stack>
                      <Droppable droppableId="dnd-list" direction="vertical">
                        {(provided) => (
                          <Stack
                            gap={4}
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                          >
                            <Items values={values} callback={setFieldValue} />
                            {provided.placeholder}
                          </Stack>
                        )}
                      </Droppable>
                      <Button
                        onClick={() =>
                          setFieldValue(
                            "fields",
                            values.fields.concat([
                              {
                                label: "",
                                key: "",
                                type: "",
                                index: 0,
                              },
                            ])
                          )
                        }
                      >
                        Tambah Atribut
                      </Button>
                    </Stack>
                  </Fieldset>
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
            </DragDropContext>
          )}
        </Formik>
      </Paper>
    </DefaultTemplate>
  );
};

export default SettingPage;
