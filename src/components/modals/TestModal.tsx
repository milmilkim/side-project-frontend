interface TestProps {
  message: string;
}

const TestModal: React.FC<TestProps> = ({ message }) => {
  return <div>{message}</div>;
};

export default TestModal;
