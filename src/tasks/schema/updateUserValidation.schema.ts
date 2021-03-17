import { object, string, number } from 'yup'

const updateTasksSchema = object({
    id: number().required().positive(),
    username: string().required().trim().min(8).max(100),
    name: string().trim().uppercase().min(3).max(100).matches(/^[a-z]+$/),
    content: string().trim().min(10).max(200).matches(/^[a-zA-Z0-9!@#$%&*]+$/)
})

export {updateTasksSchema};