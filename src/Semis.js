import { Semi } from "./components/Semi";

export const Semis = ({ positions }) => {
  return (
    <>
      <Semi positions={positions} number={1} />
      <Semi positions={positions} number={2} />
      <Semi positions={positions} number={3} />
      <Semi positions={positions} number={4} />
    </>
  );
};
