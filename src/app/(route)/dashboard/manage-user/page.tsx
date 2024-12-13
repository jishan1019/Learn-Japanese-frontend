"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Ban, ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  useGetAllUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from "@/redux/features/auth/authApi";
import Loader from "@/components/loader";

export default function ManageUserTable() {
  const [page, setPage] = useState(1);
  const limit = 10;

  const queryParams = [
    { name: "page", value: page },
    { name: "limit", value: limit },
  ];

  const { data: userData, isLoading } = useGetAllUserQuery(queryParams);
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const totalPages = userData?.data?.meta?.totalPage || 1;
  const users = userData?.data?.result || [];

  const handleRoleToggle = async (user: any) => {
    const newRole = user.role === "user" ? "admin" : "user";
    try {
      // Prepare the payload for updating the user
      const payload = {
        _id: user._id,
        role: newRole,
      };

      // Call the updateUser function with the payload
      await updateUser(payload).unwrap();

      // Update the local state or handle success
      toast.success(`User role updated to ${newRole} successfully.`);
    } catch (error) {
      toast.error("Failed to update user role.");
    }
  };

  const handleDelete = async (userId: string) => {
    try {
      await deleteUser(userId).unwrap();
      toast.success("User deleted successfully.");
    } catch (error) {
      toast.error("Failed to delete user.");
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="w-full h-full mx-auto">
      <div className="container mx-auto p-4 bg-white shadow rounded-md border mt-10">
        <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    Loading users...
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user: any) => (
                  <TableRow key={user._id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleRoleToggle(user)}
                        >
                          <Ban className="w-4 h-4 mr-2" />
                          {user.role === "user"
                            ? "Promote to Admin"
                            : "Demote to User"}
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(user._id)}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="flex justify-center items-center mt-8 space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <span>
          Page {page} of {totalPages}
        </span>

        <Button
          variant="outline"
          size="icon"
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
