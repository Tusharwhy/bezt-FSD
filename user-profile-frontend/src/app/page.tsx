import { Button } from "../components/Button";

export default function Home() {
  console.log("JHHH");
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Welcome to User Directory</h1>
      <Button href="/users">Users Directory</Button>
    </div>
  );
}
