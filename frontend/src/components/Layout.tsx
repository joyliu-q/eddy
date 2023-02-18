import Navbar from "./Navbar";

type Props = {
  children?: React.ReactNode;
};
export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};
