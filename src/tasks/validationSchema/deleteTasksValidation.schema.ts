import { object, string, number } from 'yup'

const deleteTaskSchema = object({
    id: number().required().positive()
});

export {deleteTaskSchema};