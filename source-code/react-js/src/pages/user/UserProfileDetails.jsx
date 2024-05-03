import UserProfilProgress from "./UserProfilProgress.jsx";
import UpdateUserPassword from "./UpdateUserPassword.jsx";
export default function UserProfileDetails({ data: userData }) {
  return (
    <section className="py-4 px-6 bg-gray-100 flex h-full w-full flex-col">
      <h1 className="font-bold text-2xl mb-3">Edit Profile</h1>
      <main className="grid gap-6" style={{ gridTemplateColumns: "1fr auto" }}>
        <UpdateUserPassword userData={userData} />
        <UserProfilProgress userData={userData} />
      </main>
    </section>
  );
}
