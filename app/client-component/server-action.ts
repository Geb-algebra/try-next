"use server"
export async function addEmployee(employee) {
  const res = await fetch('http://localhost:3000/api/employees', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(employee)
  })
  return await res.json()
}
