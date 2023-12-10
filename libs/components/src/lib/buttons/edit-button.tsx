/* eslint-disable @typescript-eslint/ban-types */
import { IconContext } from 'react-icons';
import { MdOutlineModeEditOutline } from 'react-icons/md';

type Props = {
  onClick?: Function;
};

export const EditButton = (props: Props) => {
  return (
    <IconContext.Provider
      value={{
        size: '15px',
        style: { cursor: 'pointer', margin: '0 5px', color: '#187DE4' },
      }}
    >
      <MdOutlineModeEditOutline
        onClick={() => props.onClick && props.onClick()}
      ></MdOutlineModeEditOutline>
    </IconContext.Provider>
  );
};
