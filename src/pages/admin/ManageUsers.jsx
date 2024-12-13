// src/components/admin/ManageUsers.jsx
import React, { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { http } from "../../utils/http";
import { toast } from "react-toastify";
import UserOrdersList from "./UserOrdersList";
import UserInfoModal from "./UserInfoModal";
import AdminNavbar from "./AdminNavbar";

export default function ManageUsers() {
  const [editingUser, setEditingUser] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUserForInfo, setSelectedUserForInfo] = useState(null);

  // Fetch users
  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await http.get("users");
      console.log("data nn", response.data);
      return response.data;
    },
  });

  let userList = [];
  if (users) {
    userList = users.data.pageContent;
  }

  const handleViewOrders = (userId) => {
    setSelectedUserId(userId);
  };

  // Delete user mutation
  const deleteUserMutation = useMutation({
    mutationFn: async (userId) => {
      return http.delete(`/users/${userId}`);
    },
    onSuccess: () => {
      toast.success("User deleted successfully");
      refetch(); // Refresh the users list
    },
    onError: (error) => {
      toast.error("Failed to delete user");
      console.error("Delete error:", error);
    },
  });

  // Update user mutation
  const updateUserMutation = useMutation({
    mutationFn: async (userData) => {
      return http.put(`/users/${userData.userId}`, userData);
    },
    onSuccess: () => {
      toast.success("User updated successfully");
      setEditingUser(null); // Close edit mode
      refetch(); // Refresh the users list
    },
    onError: (error) => {
      toast.error("Failed to update user");
      console.error("Update error:", error);
    },
  });

  const handleDelete = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteUserMutation.mutate(userId);
    }
  };

  const handleEdit = (user) => {
    setEditingUser({ ...user });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    updateUserMutation.mutate(editingUser);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (isLoading) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  return (
    <div>
      <AdminNavbar />
    <div className="menu p-4">
      <h2 className="mb-4 text-2xl font-bold">Manage Users</h2>

      {selectedUserForInfo && (
        <UserInfoModal userId={selectedUserForInfo} onClose={() => setSelectedUserForInfo(null)} />
      )}

      {selectedUserId && <UserOrdersList userId={selectedUserId} onClose={() => setSelectedUserId(null)} />}
      {/* Edit User Modal */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-96 rounded-lg bg-white p-6">
            <h3 className="mb-4 text-xl font-bold">Edit User</h3>
            <form onSubmit={handleUpdate}>
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={editingUser.name || ""}
                  onChange={handleInputChange}
                  className="w-full rounded border p-2"
                />
              </div>
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={editingUser.email || ""}
                  onChange={handleInputChange}
                  className="w-full rounded border p-2"
                />
              </div>
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={editingUser.phone || ""}
                  onChange={handleInputChange}
                  className="w-full rounded border p-2"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setEditingUser(null)} className="rounded bg-gray-200 px-4 py-2">
                  Cancel
                </button>
                <button type="submit" className="rounded bg-blue-500 px-4 py-2 text-white">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Users Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full rounded-lg bg-white shadow-md">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Contact
              </th>

              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {userList?.map((user) => (
              <tr key={user.userId}>
                <td
                  onClick={() => setSelectedUserForInfo(user.userId)}
                  className="cursor-pointer whitespace-nowrap px-6 py-4 text-blue-600 hover:text-blue-900"
                >
                  {`${user.lastName || ""} ${user.firstName || ""}`} {!user.lastName && !user.firstName && "Guest"}
                </td>
                <td className="whitespace-nowrap px-6 py-4">{user.emailOrPhone}</td>
                <td className="whitespace-nowrap px-6 py-4">
                  {user.roles?.map((role) => (
                    <div key={role.roleName} className="whitespace-nowrap">
                      {role.roleName}
                    </div>
                  ))}
                </td>
                <td className="space-x-3 whitespace-nowrap px-6 py-4">
                  <button onClick={() => handleViewOrders(user.userId)} className="text-green-600 hover:text-green-900">
                    View Orders
                  </button>
                  <button onClick={() => handleEdit(user)} className="mr-3 text-blue-600 hover:text-blue-900">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(user.userId)} className="text-red-600 hover:text-red-900">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
}
