/* eslint-disable @typescript-eslint/ban-types */
import { IconContext } from 'react-icons';
import { MdOutlineSave } from 'react-icons/md';
type Props = {
  onClick?: Function;
};

export const SaveButton = (props: Props) => {
  return (
    <IconContext.Provider
      value={{
        size: '17px',
        style: { cursor: 'pointer', margin: '0 5px', color: '#187DE4' },
      }}
    >
      <MdOutlineSave
        onClick={() => props.onClick && props.onClick()}
      ></MdOutlineSave>
    </IconContext.Provider>
  );
};
