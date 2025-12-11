import 'dotenv/config'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'
import { PrismaClient } from '../generated/prisma/client'

const adapter = new PrismaMariaDb({
    host: "localhost",
    port: 3306,
    connectionLimit: 5,
    user: "root",
    password: "nirmal123",
    database: "todo"
})
export const prisma = new PrismaClient({ adapter })