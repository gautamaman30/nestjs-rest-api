import { object, string } from 'yup'

const deleteUsersByUsernameSchema = object({
    username: string().required().trim().min(8).max(100)
})

export {deleteUsersByUsernameSchema};