import { object, string, number } from 'yup'

const updateTasksSchema = object({
    id: number().required().positive(),
    name: string().required().trim().lowercase().min(3).max(100).matches(/^[a-z]+$/),
    content: string().trim().min(10).max(200).matches(/^[a-zA-Z0-9_ ]*$/)
})

export {updateTasksSchema};