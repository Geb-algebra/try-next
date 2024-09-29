import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { PageConfig } from 'next';

export const runtime = 'edge'

const app = new Hono().basePath('/api')

const employees = [
  {
    id: 1,
    name: 'Alice',
    position: 'Software Engineer',
    salary: 100000
  },
  {
    id: 2,
    name: 'Bob',
    position: 'Product Manager',
    salary: 120000
  },
  {
    id: 3,
    name: 'Charlie',
    position: 'Designer',
    salary: 80000
  }
]

app.get('employees', (c) => {
  return c.json(employees)
});

app.get('employees/:id', (c) => {
  const id = c.req.param('id')
  const employee = employees.find((e) => e.id === parseInt(id))
  if (!employee) {
    return c.json({ error: 'Employee not found' }, 404)
  }
  return c.json(employee)
})

app.post('employees', async (c) => {
  const employee = await c.req.json()
  console.log(employee)
  if (!employee.name || !employee.position || !employee.salary) {
    return c.json({ error: 'Invalid employee' }, 400)
  }
  employees.push(employee)
  return c.json(employee, 201)
})

export const GET = handle(app)
export const POST = handle(app)
