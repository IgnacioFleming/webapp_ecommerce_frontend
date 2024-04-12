import useFetch from "../../utils/hooks/useFetch";
const MyTickets = () => {
  const myTickets = useFetch("http://localhost:8080/api/tickets", "GET");
  console.log(myTickets.payload?.[0]);
  return <div>{JSON.stringify(myTickets.payload)}</div>;
};

export default MyTickets;
