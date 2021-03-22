import { object, string, number } from 'yup'

const getTaskById = object({
    id: number().required().positive()
})

export {getTaskById};