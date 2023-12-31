import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invaild email address." });
      return;
    }

    const client = await MongoClient.connect(
      "mongodb+srv://next-project:learning@cluster0.ljtn0wq.mongodb.net/newsletter?retryWrites=true&w=majority"
    );
    const db = client.db();
    await db.collection("emails").insertOne({ email: userEmail });
    client.close();

    res.status(201).json({ message: "Signed up!" });
  }
}
