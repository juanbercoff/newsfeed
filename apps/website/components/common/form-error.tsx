type FormErrorProps = {
  children: React.ReactNode;
};

const FormError = ({ children }: FormErrorProps) => {
  return <span className="text-red-500">{children}</span>;
};

export default FormError;
