import { Flex } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { Handle, Position } from "reactflow";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { THEME_COLORS } from "../util";
import "./Node.css";

export interface CustomNodeData {
  sentences: string[];
}

export const CustomNode = ({
  data,
  id,
}: {
  data: CustomNodeData;
  id: string;
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const onChange = useCallback((evt: any) => {
    console.log(evt.target.value);
  }, []);

  return (
    <>
      <Handle type="target" position={Position.Top} />
      <Flex
        width="175px"
        className="Node"
        cursor="pointer"
        fontSize=".5rem"
        textAlign="center"
        flexDir="column"
        textColor={THEME_COLORS.salmon}
      >
        <Flex
          bgColor={THEME_COLORS.peach}
          border={`1px solid ${THEME_COLORS.peach}`}
          borderBottom="none"
          fontWeight={600}
          justifyContent="space-between"
          p={1}
          borderRadius={collapsed ? "8px" : "8px 8px 0 0"}
          onClick={() => setCollapsed((a) => !a)}
        >
          <p>{id}</p>
          {collapsed ? (
            <ChevronDownIcon
              _hover={{
                color: THEME_COLORS.eggshell,
              }}
              boxSize={3}
            />
          ) : (
            <ChevronUpIcon
              _hover={{
                color: THEME_COLORS.eggshell,
              }}
              boxSize={3}
            />
          )}
        </Flex>
        {!collapsed && (
          <Flex
            bgColor={THEME_COLORS.eggshell}
            border={`1px solid ${THEME_COLORS.peach}`}
            borderRadius="0 0 12px 12px"
            p={1}
          >
            <ul>
              {data.sentences.map((sentence: string, index: number) => (
                <li key={index}>{sentence}</li>
              ))}
            </ul>
          </Flex>
        )}
      </Flex>
      <Handle
        className="Handle"
        type="source"
        position={Position.Bottom}
        id="a"
      />
    </>
  );
};
