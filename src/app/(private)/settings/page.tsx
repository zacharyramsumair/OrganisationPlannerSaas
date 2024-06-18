import { fetchAllUsers, getCurrentUser } from "@/action/user";
import { getSession } from "@/lib/getSession";
import { User } from "@/models/User";
import { redirect } from "next/navigation";

const Settings = async () => {
  const user = await getCurrentUser();
  // const user = session?.user;
  console.log(user)

  if (!user) return redirect("/login");
  if (user?.role !== "admin") return redirect("/dashboard");

  const allUsers = await fetchAllUsers();

  console.log(allUsers)

// const allUsers = [
//     {_id:123,firstName: "John", lastName:"Terry" },
//     {_id:123,firstName: "John", lastName:"Terry" },
//     {_id:123,firstName: "John", lastName:"Terry" }
// ]

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">users</h1>
      <table className="w-full rounded shadow">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Name</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {allUsers?.map((user) => (
            <tr key={user._id}>
              <td className="p-2">{user.name}</td>
              <td className="p-2">
                <form
                  action={async () => {
                    "use server";
                    await User.findByIdAndDelete(user._id);
                  }}
                >
                  <button className="px-2 py-1 text-red-500 hover:bg-red-100 rounded focus:outline-none">
                    Delete
                  </button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Settings;