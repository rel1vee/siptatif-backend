import express, { Application, Request, Response, NextFunction} from "express";

const app: Application = express()
const port: Number = 3000

app.use("/", (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send({
        status: "200",
        message: "Hello, World!"
    })
})

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})