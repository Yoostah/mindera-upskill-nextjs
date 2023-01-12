import {MongoClient, ObjectId} from "mongodb"

const dbPassword = "wBrYwEU2hUHJXBZo"

export default async function handler(req, res) {
    if(req.method === "PUT") {

        const data = req.body

        const client = await MongoClient.connect(
            "mongodb+srv://ThulioUpskill:"+dbPassword+"@cluster0.piaazo3.mongodb.net/todos?retryWrites=true&w=majority")

        const db = client.db();

        const todosCollection = db.collection("todos")

        
        const result = await todosCollection.updateOne(
            { _id: ObjectId(data.id)},
            { $set: {completed: true}}
        )        
            
        
        client.close()
        
        res.status(201).json({ message: "Todo marked as Done" })
    }
  }
  