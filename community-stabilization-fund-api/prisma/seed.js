
const {PrismaClient} = require('@prisma/client');
const { api_keys } = require('./data.js')
const prisma = new PrismaClient();

// const load = async () => {
//   try {
//     await prisma.category.deleteMany()
//     console.log('Deleted records in category table')
//
//     await prisma.product.deleteMany()
//     console.log('Deleted records in product table')
//
//     await prisma.$queryRaw`ALTER TABLE Product AUTO_INCREMENT = 1`
//     console.log('reset product auto increment to 1')
//
//     await prisma.$queryRaw`ALTER TABLE Category AUTO_INCREMENT = 1`
//     console.log('reset category auto increment to 1')
//
//     await prisma.category.createMany({
//       data: [api_user_1]
//     })
//     console.log('Added category data')
//
//     await prisma.product.createMany({
//       data: [api_key_1]
//     })
//     console.log('Added product data')
//   } catch (e) {
//     console.error(e)
//     process.exit(1)
//   } finally {
//     await prisma.$disconnect()
//   }
// }

const load = async () => {
  try{
    await prisma.api_key.createMany({
      data: api_keys
    })

  }catch(e){

  } finally {
    await prisma.$disconnect()

  }
}

load()