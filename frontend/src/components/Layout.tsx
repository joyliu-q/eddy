import { ToolBar } from "./ToolBar";

type Props = {
  children?: React.ReactNode;
  onSwitchMode?: () => void;
};

export const Layout: React.FC<Props> = ({children, onSwitchMode = () => {}}) => {
  return (
    <div>
      <ToolBar onSwitchMode={onSwitchMode} />
      {children}
    </div>
  );
};
