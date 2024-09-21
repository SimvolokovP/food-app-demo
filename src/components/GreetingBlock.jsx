import { useTg } from "../hooks/useTg";

const GreetingBlock = () => {
  const { user } = useTg();
  return (
    <div className="greeting">
      Привет, {user?.first_name} {user?.last_name}
    </div>
  );
};

export default GreetingBlock;
