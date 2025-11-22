export default function Users() {
  return (
    <div>
      <h1>Quản lý người dùng</h1>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Vai trò</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>admin@gmail.com</td>
            <td>Admin</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
