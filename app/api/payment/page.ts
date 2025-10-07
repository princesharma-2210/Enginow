// import Razorpay from "razorpay";

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID!,
//   key_secret: process.env.RAZORPAY_KEY_SECRET!,
// });

// export default async function handler(req, res) {
//   const { amount, courseId } = req.body;
//   const options = {
//     amount: amount * 100,
//     currency: "INR",
//     receipt: courseId,
//   };
//   const order = await razorpay.orders.create(options);
//   res.status(200).json(order);
// }
