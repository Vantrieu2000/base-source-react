/* eslint-disable @typescript-eslint/ban-types */
import { IconContext } from 'react-icons';
import { IoTrash } from 'react-icons/io5';

type Props = {
  onClick?: Function;
};

export const TrashButton = (props: Props) => {
  return (
    <IconContext.Provider
      value={{
        size: '15px',
        style: { cursor: 'pointer', margin: '0 5px', color: '#EE2D41' },
      }}
    >
      <IoTrash onClick={() => props.onClick && props.onClick()}></IoTrash>
    </IconContext.Provider>
  );
};
