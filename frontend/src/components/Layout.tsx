import { ToolBar } from "./ToolBar";

type Props = {
  children?: React.ReactNode;
};

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div>
      <ToolBar />
      {children}
    </div>
  );
};
