// const { pool } = require("../../../models/db/connect");
// const { isValidEmail } = require("../../../utils/validation/emailValidation");
// const uuid = require('uuid');
// const { sendEmail } = require("../emailService"); // Assuming you have an email service module

// const resendVerificationEmail = async(req, res) => {
//     const { email } = req.body;

//     // Check if email is valid
//     if (!isValidEmail(email)) {
//         return res.status(400).json({
//             message: "Invalid email format!"
//         });
//     }

//     try {
//         // Check if the email is registered
//         const [result] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
//         if (!result || !result[0]) {
//             return res.status(400).json({
//                 message: "The provided email isn't registered yet!"
//             });
//         }

//         // Generate verification token
//         const verificationToken = generateVerificationToken();

//         // Save verification token and its expiry in the database
//         await saveVerificationToken(email, verificationToken);

//         // Send verification email
//         await sendVerificationEmail(email, verificationToken);

//         res.status(200).json({
//             message: 'Verification email sent successfully'
//         });
//     } catch (error) {
//         console.error('Error sending verification email:', error);
//         res.status(500).json({
//             message: 'Error sending verification email'
//         });
//     }
// };

// function generateVerificationToken() {
//     return uuid.v4();
// }

// async function saveVerificationToken(email, verificationToken) {
//     try {
//         // Store the verification token in the database
//         await pool.query('UPDATE users SET verification_token = ? WHERE email = ?', [verificationToken, email]);
//     } catch (error) {
//         throw { message: 'Error storing the verification token in the database' };
//     }
// }

// module.exports = resendVerificationEmail;