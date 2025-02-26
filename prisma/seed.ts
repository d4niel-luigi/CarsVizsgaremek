import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'
const prisma = new PrismaClient()

async function main() {
  await rawSql();
  const user1 = await prisma.user.create({
    data: {
      email: faker.internet.email(),
      password: faker.internet.password(),
      isAdmin: true
    }
  })
 const user2 = await prisma.user.create({
  data: {
    email: faker.internet.email(),
    password: faker.internet.password()
  }
 })
 const booking = await prisma.booking.create({
  data: {
    startDate: faker.date.recent(),
    endDate: faker.date.future(),
    carId: faker.number.int({min: 1, max: 36}),
    userId: 1
  }
 })
}

async function rawSql() {
  const result = await prisma.$executeRaw`INSERT INTO cars (id, manufacturer, model, type, number_of_seats, number_of_suitcases, fuel_type, clutch_type, price_for_one_day,is_available) VALUES
  (1, 'Toyota', 'Aygo', 'Economical ', 5, 2, 'Petrol', 'Manual', 5000, 1),
  (2, 'Opel', 'Corsa', 'Economical ', 5, 1, 'Petrol', 'Automatic', 6500,1),
  (3, 'Citroen ', 'C2', 'Economical', 4, 1, 'Petrol', 'Manual', 7000,1),
  (4, 'Volkswagen', 'Polo', 'Economical', 5, 1, 'Petrol', 'Automatic', 9000,1),
  (5, 'Hyundai ', 'i10', 'Economical', 4, 1, 'Petrol', 'Manual', 5500,1),
  (6, 'Fiat', 'Panda', 'Economical', 5, 1, 'Petrol', 'Manual', 6000,1),
  (7, 'Skoda', 'Scala', 'Standard', 5, 2, 'Petrol', 'Manual', 12000,1),
  (8, 'Peugeot', '308', 'Standard', 5, 2, 'diesel', 'Automatic', 15000,1),
  (9, 'Toyota', 'Corolla', 'Standard', 5, 3, 'Petrol', 'Manual', 14000,1),
  (10, 'Audi', 'A3', 'Standard', 5, 2, 'Petrol', 'Manual', 18000,1),
  (11, 'Hyundai ', 'Elantra', 'Standard', 5, 3, 'Petrol', 'Manual', 15500,1),
  (12, 'Volkswagen', 'Jetta', 'Standard', 5, 2, 'Diesel', 'Manual', 16500,1),
  (13, 'Toyota ', 'RAV4', 'SUV', 5, 3, 'Petrol', 'Automatic', 19000,1),
  (14, 'Ford', 'Escape', 'SUV', 5, 3, 'Petrol', 'Manual', 21000,1),
  (15, 'Jeep ', 'Grand Cherokee', 'SUV', 5, 4, 'Petrol', 'Automatic', 24000,1),
  (16, 'Mazda', 'CX-60', 'SUV', 5, 3, 'Diesel', 'Automatic', 18000,1),
  (17, 'Opel ', 'Mokka', 'SUV', 5, 3, 'Petrol', 'Manual', 15500,1),
  (18, 'Suzuki', 'SX4 S-Cross', 'SUV', 5, 2, 'Petrol', 'Manual', 15000,1),
  (19, 'Dodge ', 'Grand Caravan', 'Small bus', 7, 4, 'Diesel', 'Automatic', 31000,1),
  (20, 'Ford', 'Galaxy', 'Small bus', 7, 4, 'Diesel', 'Manual', 29500,1),
  (21, 'Volskwagen ', 'Touran', 'Small bus', 7, 4, 'Petrol', 'Manual', 30000,1),
  (22, 'Chrysler', 'Pacifica', 'Small bus', 7, 5, 'Petrol', 'Automatic', 35000,1),
  (23, 'Opel ', 'Zafira', 'Small bus', 7, 3, 'Diesel', 'Manual', 27000,1),
  (24, 'Mercedes', 'Vito', 'Small bus', 7, 4, 'Diesel', 'Automatic', 38500,1),
  (25, 'Ford ', 'Mustang Convertible', 'Cabrio', 4, 2, 'Petrol', 'Automatic', 30000,11),
  (26, 'Chrysler', 'Sebring Cabrio', 'Cabrio', 4, 2, 'Petrol', 'Manual', 21000,1),
  (27, 'Fiat ', '500 Cabrio', 'Cabrio', 4, 1, 'Petrol', 'Manual', 18000,1),
  (28, 'Audi', 'A3 Cabrio', 'Cabrio', 4, 2, 'Petrol', 'Automatic', 22500,1),
  (29, 'Honda ', 'S2000', 'Cabrio', 4, 2, 'Petrol', 'Manual', 33500,1),
  (30, 'Volkswagen', 'T-ROC Cabrio', 'Cabrio', 5, 2, 'Petrol', 'Manual', 24500,1),
  (31, 'Mercedes ', 'E-class', 'Comfort', 5, 3, 'Petrol', 'Automatic', 34500,1),
  (32, 'Audi', 'A6', 'Comfort', 5, 3, 'Petrol', 'Manual', 32000,1),
  (33, 'BMW ', '5 Series', 'Comfort', 5, 3, 'Petrol', 'Automatic', 35000,1),
  (34, 'Honda', 'Accord', 'Comfort', 5, 4, 'Petrol', 'Manual', 28500,1),
  (35, 'Mercedes', 'C-Class CLA 63', 'Comfort', 5, 3, 'Petrol', 'Automatic', 41000,1),
  (36, 'Ford', 'Mondeo', 'Comfort', 5, 4, 'Diesel', 'Automatic', 29000,1);`
  console.log({ result })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
