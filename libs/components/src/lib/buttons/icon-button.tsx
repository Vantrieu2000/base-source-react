/* eslint-disable @typescript-eslint/ban-types */
import { IconContext } from 'react-icons';

type Props = {
  onClick?: Function;
  style?: React.CSSProperties;
  icon: any;
};

export const IconButton = (props: Props) => {
  const Icon = props.icon;
  return (
    <IconContext.Provider
      value={{
        size: '15px',
        style: { cursor: 'pointer', margin: '0 5px', ...props.style },
      }}
    >
      <Icon onClick={() => props.onClick && props.onClick()}></Icon>
    </IconContext.Provider>
  );
};
