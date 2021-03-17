import { object, string } from 'yup'

const updateUserSchema = object({
    username: string().required().trim().min(8).max(100),
    first_name: string().trim().lowercase().min(3).max(100).matches(/^[a-z]+$/),
    last_name: string().trim().lowercase().min(3).max(100).matches(/^[a-z]+$/),
    title: string().trim().uppercase().min(3).max(100)
})

export {updateUserSchema};