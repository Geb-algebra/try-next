import { revalidatePath } from "next/cache"

export default async function Home() {
  const res = await fetch('http://localhost:3000/api/employees') // relative url '/api/employees' doesn't work
  const employees = await res.json()

  async function createEmployee(formData) {
    "use server"
    const res = await fetch('http://localhost:3000/api/employees', {
      method: 'POST',
      body: JSON.stringify(Object.fromEntries(formData)),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    revalidatePath('/api/employees')
  }

  if (!employees) return <p>Loading...</p>

  return (
    <div>
      <h1>Employees</h1>
      <ul>
        {employees.map((employee) => (
          <li key={employee.id}>
            {employee.name} ({employee.position}) - ${employee.salary}
          </li>
        ))}
      </ul>
      <form action={createEmployee} method="post">
        <input name="name" placeholder="Name" />
        <input name="position" placeholder="Position" />
        <input name="salary" placeholder="Salary" />
        <button type="submit">Add Employee</button>
      </form>
    </div>
  )
}
