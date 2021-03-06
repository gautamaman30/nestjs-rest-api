import { object, string } from 'yup'

const createTaskSchema = object({
    name: string().required().trim().lowercase().min(3).max(100).matches(/^[a-z]+$/),
    content: string().required().trim().min(10).max(200).matches(/^[a-zA-Z0-9_ ]*$/)
})

export {createTaskSchema};