import { FC, ReactNode } from "react";

interface IProps {
  icon: ReactNode;
  children: ReactNode;
}

export const ModuleTitle: FC<IProps> = (props) => {
  const { children, icon } = props;

  return (
    <h2 className="text-2xl text-left flex items-center">
      {icon}
      <span className="ml-2">{children}</span>
    </h2>
  );
};
