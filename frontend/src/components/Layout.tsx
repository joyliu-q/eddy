import { Box } from "@chakra-ui/react";
import { ToolBar } from "./ToolBar";

type Props = {
  children?: React.ReactNode;
};

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <Box position={"relative"}>
      <ToolBar />
      {children}
    </Box>
  );
};
