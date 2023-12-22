import { SimpleGrid, Table, TableScrollContainer, rem } from "@mantine/core";
import { useListState } from "@mantine/hooks";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { IconGripVertical } from "@tabler/icons-react";
import classes from "./DndTable.module.css";
import { useEffect } from "react";
import { useState } from "react";

export interface DndTablePrpos {
  header: dndTableHeadersProps[];
  onChange?: (e?: any) => void;
  value?: any[];
  width?: any;
  mah?: number;
}

export interface dndTableHeadersProps {
  label?: string;
  key?: any;
  width?: string | number;
}

const defaultHeader: dndTableHeadersProps[] = [
  {
    label: "#",
    key: "dnd",
    width: 40,
  },
];

export function DndTable({
  header,
  onChange,
  value,
  width,
  mah,
}: DndTablePrpos) {
  const [isDragEnd, setIsDragEnd] = useState<boolean>(false);
  const [state, handlers] = useListState(value);

  useEffect(() => {
    if (!isDragEnd && value !== state) {
      // console.log("awal");
      handlers.setState(value!);
    }
    if (isDragEnd && value !== state) {
      // console.log("drag");
      onChange && onChange(state);
      setIsDragEnd(false);
    }
  }, [handlers, isDragEnd, onChange, state, value]);

  const Items = ({ header, value }: DndTablePrpos) => {
    return value?.map((itemData, itemIndex) => (
      <Draggable
        key={itemIndex}
        index={itemIndex}
        draggableId={String(itemIndex)}
      >
        {(provided) => (
          <Table.Tr
            className={classes.item}
            ref={provided.innerRef}
            {...provided.draggableProps}
          >
            {header.map((headData, headIndex: number) => {
              if (headData.key === "dnd")
                return (
                  <Table.Td
                    className="align-top"
                    miw={headData.width || 100}
                    maw={headData.width || 100}
                    key={headIndex}
                  >
                    <div {...provided.dragHandleProps}>
                      <IconGripVertical
                        style={{ width: rem(18), height: rem(18) }}
                        stroke={1.5}
                      />
                    </div>
                  </Table.Td>
                );
              if (headData.key === "index")
                return (
                  <Table.Td
                    className="align-top"
                    miw={headData.width || 100}
                    maw={headData.width || 100}
                    key={headIndex}
                  >
                    {itemIndex + 1}
                  </Table.Td>
                );
              if (typeof headData.key === "function")
                return (
                  <Table.Td
                    className="align-top"
                    miw={headData.width || 100}
                    maw={headData.width || 100}
                    key={headIndex}
                  >
                    {headData.key(itemData, itemIndex)}
                  </Table.Td>
                );
              return (
                <Table.Td
                  className="align-top"
                  miw={headData.width || 100}
                  maw={headData.width || 100}
                  key={headIndex}
                >
                  {itemData?.[headData?.key]}
                </Table.Td>
              );
            })}
          </Table.Tr>
        )}
      </Draggable>
    ));
  };

  return (
    <SimpleGrid>
      <DragDropContext
        onDragEnd={({ destination, source }) => {
          setIsDragEnd(true);
          handlers.reorder({
            from: source.index,
            to: destination?.index || 0,
          });
        }}
      >
        <TableScrollContainer
          className="break-words overflow-hidden"
          minWidth={"100%"}
          mah={mah || 550}
        >
          <Table
            striped
            stickyHeader
            stickyHeaderOffset={-0.3}
            highlightOnHover
            withTableBorder
            withColumnBorders
          >
            <Table.Thead className="z-[5]">
              <Table.Tr>
                {header
                  ? defaultHeader
                      ?.concat(header)
                      ?.map((headData, headIndex: number) => {
                        return (
                          <Table.Th key={headIndex}>{headData.label}</Table.Th>
                        );
                      })
                  : defaultHeader?.map((headData, headIndex: number) => {
                      return (
                        <Table.Th key={headIndex}>{headData.label}</Table.Th>
                      );
                    })}
              </Table.Tr>
            </Table.Thead>
            <Droppable droppableId="dnd-list" direction="vertical">
              {(provided) => (
                <Table.Tbody
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <Items header={defaultHeader.concat(header)} value={state} />
                  {provided.placeholder}
                </Table.Tbody>
              )}
            </Droppable>
          </Table>
        </TableScrollContainer>
      </DragDropContext>
    </SimpleGrid>
  );
}
