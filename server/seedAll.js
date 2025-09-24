// require("dotenv").config();
// const mongoose = require("mongoose");
// const Work = require("./Models/workModel"); // adjust path if needed

// async function seed() {
//   try {
//     await mongoose.connect(process.env.db_url);
//     console.log("MongoDB connected");
//     const consumerId = "68d3c60e6d4630d25b77e972"; // consumer userId
//     const providerIds = [
//       "68d3c19f6d4630d25b77e968", // provider 1 userId
//       "68d3c5c86d4630d25b77e96d", // provider 2 userId
//     ];

//     const statuses = ["pending", "accepted", "in-progress", "completed", "cancelled"];
//     const payments = ["pending", "paid", "failed"];
//     const categories = ["Plumbing", "Electrical", "Carpentry", "Cleaning"];

//     // Clear old orders (optional)
//     // await Work.deleteMany({});
//     // console.log(" Cleared old orders");

//     const orders = [];
//     for (let i = 0; i < 50; i++) {
//       orders.push({
//         consumerId,
//         providerId: providerIds[i % providerIds.length],
//         serviceCategory: categories[i % categories.length],
//         price: Math.floor(Math.random() * 1500) + 500,
//         paymentStatus: payments[i % payments.length],
//         status: statuses[i % statuses.length],
//         scheduledDate: new Date(Date.now() + i * 86400000), // spread across future days
//         completedAt: i % 5 === 0 ? new Date() : null,
//         review: i % 7 === 0 ? {
//           rating: Math.floor(Math.random() * 5) + 1,
//           comment: "Sample review",
//           createdAt: new Date(),
//         } : null,
//       });
//     }

//     await Work.insertMany(orders);
//     console.log(`Inserted ${orders.length} fake orders`);
//     await mongoose.disconnect();
//     process.exit(0);
//   } catch (err) {
//     console.error("Error seeding data:", err);
//     process.exit(1);
//   }
// }

// seed();
