import ButtonBack from "@/app/admin/components/button-back";
import UserAddForm from "@/app/admin/components/user-add-form";

export default function AdminUserAdd() {
  return (
    <div className="p-4 sm:p-8 sm:ml-64 mt-16 sm:mt-14 space-y-8">
      {/* Header */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Create User</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Fill out the form below to add a new user account. You can assign roles and set initial credentials.
          </p>
        </div>
        <ButtonBack />
      </header>

      {/* Form */}
      <UserAddForm />

      <footer className="text-center text-sm text-gray-500 dark:text-gray-400 pt-6">
        © {new Date().getFullYear()} – Add User
      </footer>
    </div>
  )
}
