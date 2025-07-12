//Data Transfer Objects (DTO)

import { Major } from '@prisma/client'
export type CreateMajorDto = Pick<Major, 'name' | 'code' | 'description'>
export type UpdateMajorDto = Pick<Major, 'name' | 'code' | 'description'>

 