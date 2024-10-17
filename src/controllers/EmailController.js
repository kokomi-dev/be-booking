const { StatusCodes } = require("http-status-codes");
const nodemailer = require("nodemailer");

const sendEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_NAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    const info = await transporter.sendMail({
      from: '"KoKoTravel 👻" <nguyenthean12062002@gmail.com>',
      to: email,
      subject: "Xác thực thanh toán!",
      text: "Chào mừng bạn đến với KoKoTravel",
      html: `
         <p>KoKoTravel</p>
         <p>Chào bạn ${email},</p>
         <p>Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi. Để hoàn tất quá trình thanh toán, vui lòng sử dụng mã xác thực sau:</p>
         <h2>${code}</h2>
         <p>Mã xác thực này sẽ hết hạn sau 10 phút.</p>
         <p>Nếu bạn không yêu cầu xác thực này, vui lòng bỏ qua email này.</p>
         <p>Trân trọng,</p>
         <p>Đội ngũ hỗ trợ khách hàng</p>
    `,
    });
    return res.status(StatusCodes.OK).json({
      idEmail: info.messageId,
      message: "Gửi email thành công",
      code: Math.floor(100000 + Math.random() * 900000),
      toEmail: email,
    });
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Xảy ra lỗi khi thực hiện gửi email",
      error: error,
    });
  }
};
module.exports = { sendEmail };
