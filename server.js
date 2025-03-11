import express from "express";
import bodyParser from "body-parser";
import { createTransport } from "nodemailer";
//

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

// Маршрут для главной страницы
app.get("/", (_req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// Маршрут для обработки формы
app.post("/submit-form", (req, res) => {
  const { name, email, message } = req.body;

  //res.send({ name, email, message });

  //Настройка Nodemailer
  //rJLYy5ZTrSG6SQEEieaG
  const transporter = createTransport({
    host: "smtp.mail.ru", // Например, Gmail
    port: 465,
    ssl: true,
    auth: {
      user: "testops@bk.ru",
      pass: "rJLYy5ZTrSG6SQEEieaG", // move to .env
    },
  });

  const mailOptions = {
    from: "testops@bk.ru",
    to: "vpetruin@inbox.ru",
    subject: "Новое сообщение с лендинга",
    text: `Имя: ${name}\nEmail: ${email}\nСообщение: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send("Ошибка при отправке формы.");
    } else {
      console.log("Письмо отправлено: " + info.response);
      res.send("Форма успешно отправлена!");
    }
  });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
