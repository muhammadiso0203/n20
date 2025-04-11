import { connect } from "mongoose";
import { config } from "../config/index.js";

export async function mongoConnection (){
    try {
        await connect(config.db.url)
        console.log(`Mongo connected sucessfully`);
    } catch (error) {
        console.error(`Mongo Connection failed`)
        process.exit(1)
    }
}