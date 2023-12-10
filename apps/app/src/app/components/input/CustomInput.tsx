import { Input, InputProps } from 'antd';

interface CustomInputProps extends InputProps {
  // Props tuỳ biến
}

interface CustomInputType extends React.FC<CustomInputProps> {
  Password: typeof Input.Password;
  TextArea: typeof Input.TextArea;
}

const CustomInput: CustomInputType = (props) => {
  const { ...restProps } = props;
  const isPasswordInput = 'password' in restProps;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ' ' && e.currentTarget.selectionStart === 0) {
      e.preventDefault();
    }
  };

  if (props.type === 'password') {
    return <Input.Password onKeyDown={handleKeyDown} {...restProps} />;
  }

  return (
    <Input
      onKeyDown={handleKeyDown}
      {...restProps}
      className={`ant-custom-input ${restProps.className}`}
    />
  );
};

CustomInput.Password = Input.Password;
CustomInput.TextArea = Input.TextArea;

export default CustomInput;
