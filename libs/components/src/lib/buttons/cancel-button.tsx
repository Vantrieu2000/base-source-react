/* eslint-disable @typescript-eslint/ban-types */
import { IconContext } from 'react-icons';
import { MdOutlineClose } from 'react-icons/md';
type Props = {
  onClick?: Function;
};

export const CancelButton = (props: Props) => {
  return (
    <IconContext.Provider
      value={{
        size: '19px',
        style: { cursor: 'pointer', margin: '0 5px', color: '#3f4254' },
      }}
    >
      <MdOutlineClose
        onClick={() => props.onClick && props.onClick()}
      ></MdOutlineClose>
    </IconContext.Provider>
  );
};
