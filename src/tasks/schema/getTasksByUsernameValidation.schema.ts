import { object, string } from 'yup'

const getTasksByUsername = object({
    username: string().required().trim().min(8).max(100),
})

export {getTasksByUsername};