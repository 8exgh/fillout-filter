var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import axios from "axios";
import { filterSubmissions } from "./filterSubmissions.js";
const server = express();
const PORT = 3000;
const baseUrl = "https://api.fillout.com";
const apiKey = process.env.FILLOUT_API_KEY;
if (!apiKey) {
    throw new Error("Set FILLOUT_API_KEY environment variable.");
}
const config = {
    headers: {
        Authorization: `Bearer ${apiKey}`
    }
};
server.get('/:formId/filteredResponses', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const formId = req.params.formId;
    const filtersStr = req.query.filters;
    const filters = filtersStr ? JSON.parse(filtersStr) : [];
    if (!formId) {
        res.status(400).json({ error: "formId is required" });
    }
    try {
        const response = yield axios.get(`${baseUrl}/v1/api/forms/${formId}/submissions`, config);
        if (response.status === 200) {
            const filtered = filterSubmissions(response.data, filters);
            res.json(filtered);
        }
        else {
            res.status(500).json({ error: "Failed to fetch submissions" });
        }
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
}));
server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
