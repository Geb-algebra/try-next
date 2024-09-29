'use client'
import { useEffect, useState } from 'react'
import { addEmployee } from './server-action'

export default function Home() {
  const [employees, setEmployees] = useState([])
  const fetchData = async () => {
    const res = await fetch('/api/employees')
    setEmployees(await res.json())
  }
  useEffect(() => {
    fetchData()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const res = await fetch('/api/employees', {
      method: 'POST',
      body: JSON.stringify(Object.fromEntries(formData)),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (res.ok) {
      fetchData()
      e.target.reset()
    }
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
      <form onSubmit={handleSubmit} action="/api/employees">
        <input name="name" placeholder="Name" />
        <input name="position" placeholder="Position" />
        <input name="salary" placeholder="Salary" />
        <button type="submit">Add Employee</button>
      </form>
      {/* server action */}
      <form action={addEmployee}>
        <input name="name" placeholder="Name" />
        <input name="position" placeholder="Position" />
        <input name="salary" placeholder="Salary" />
        <button type="submit">Add Employee</button>
      </form>
    </div>
  )
}
