import { useSelector } from "react-redux";

export default function Profile() {
  const user = useSelector((state) => state.auth.user);

  return (
    <div>
      <h1 className="text-2xl font-bold">Profile</h1>
      <p className="mt-2">Name: {user?.name}</p>
      <p>Email: {user?.email}</p>
    </div>
  );
}
