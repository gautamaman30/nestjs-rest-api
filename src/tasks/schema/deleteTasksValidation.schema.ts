import { object, string, number } from 'yup'

const deleteTaskSchema = object({
    username: string().required().trim().min(8).max(100),
    id: number().required().positive()
});

export {deleteTaskSchema};