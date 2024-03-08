import express, { Request, Response } from 'express';
import axios from "axios";
import {filterSubmissions} from "./filterSubmissions.js";

const server = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : undefined;
const baseUrl= "https://api.fillout.com"
const apiKey = process.env.FILLOUT_API_KEY;

if(!PORT) {
    throw new Error("Set PORT environment variable.");
}

if(!apiKey) {
    throw new Error("Set FILLOUT_API_KEY environment variable.");
}

const config = {
    headers: {
        Authorization: `Bearer ${apiKey}`
    }
}

server.get('/:formId/filteredResponses', async (req: Request, res: Response) => {

    const formId = req.params.formId;
    const filtersStr = req.query.filters as string;
    const filters = filtersStr ? JSON.parse(filtersStr) : [];

    if(!formId) {
        res.status(400).json({ error: "formId is required" });
    }

    try {
        const response = await axios.get(`${baseUrl}/v1/api/forms/${formId}/submissions`, config);

        if(response.status === 200) {
            const filtered = filterSubmissions(response.data, filters);
            res.json(filtered);
        } else {
            res.status(500).json({ error: "Failed to fetch submissions" });
        }
    } catch(error) {
        res.status(500).json({ error: error })
    }
});

server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});