import axios from "axios";
import {ApiResponse} from "./dtos/fillout/getSubmissions/response.js";
import {FilterClauseType} from "./dtos/localhost/getFilteredResponses/request.js";

const baseUrl = "http://localhost:3000";
// const baseUrl = "https://fillout-filter-ckds.onrender.com";
const endpoint = `${baseUrl}/cLZojxk94ous/filteredResponses`;
describe('filter', () => {
    it('should filter equals', async () => {
        const filter: FilterClauseType[] = [
            {
                condition: "equals",
                id: "4KC356y4M6W8jHPKx9QfEy",
                value: "Nothing much to share yet!"
            },


        ]

        const response = await axios.get<ApiResponse>(
            `${endpoint}?filters=${JSON.stringify(filter)}`);

        console.log("response", response.data);

        expect(response.data.pageCount).toEqual(1);
        expect(response.data.responses[0].submissionId).toEqual("ab9959b2-73e8-4994-85b9-56e780b89ce3")
        expect(response.data.totalResponses).toEqual(response.data.responses.length);
    });

    it('should filter not equals', async () => {
        const filter: FilterClauseType[] = [
            {
                condition: "does_not_equal",
                id: "4KC356y4M6W8jHPKx9QfEy",
                value: "I'm excited for it!"
            }
        ]

        const response = await axios.get<ApiResponse>(
            `${endpoint}?filters=${JSON.stringify(filter)}`);

        console.log("response", response.data);

        expect(response.data.responses.length).toBeGreaterThan(1);
        const filteredOut = response.data.responses.find(response => response.submissionId === "f9b8b405-6ca9-41f3-a03f-d5a563dfa0f6");
        expect(filteredOut).toBeUndefined();
    })

    it('should filter greater than', async () => {
        const filter: FilterClauseType[] = [
            {
                condition: "greater_than",
                id: "4KC356y4M6W8jHPKx9QfEy",
                value: "g"
            }
        ]

        const response = await axios.get<ApiResponse>(
            `${endpoint}?filters=${JSON.stringify(filter)}`);

        console.log("response", response.data);

        expect(response.data.responses.length).toEqual(1);
    })

    it('should filter less than', async () => {
        const filterText = "g";
        const filter: FilterClauseType[] = [
            {
                condition: "less_than",
                id: "4KC356y4M6W8jHPKx9QfEy",
                value: "g"
            }
        ]

        const response = await axios.get<ApiResponse>(
            `${endpoint}?filters=${JSON.stringify(filter)}`);

        console.log("response", response.data);

        expect(response.data.responses.length).toEqual(11);
    })

    it('should filter combinations', async () => {
        const filter: FilterClauseType[] = [
            {
                condition: "equals",
                id: "4KC356y4M6W8jHPKx9QfEy",
                value: "g"
            },
            {
                condition: "equals",
                id: "bE2Bo4cGUv49cjnqZ4UnkW",
                value: "Johnny"
            },
        ]

        const response = await axios.get<ApiResponse>(
            `${endpoint}?filters=${JSON.stringify(filter)}`);

        console.log("response", response.data);

        expect(response.data.responses.length).toEqual(1);
        expect(response.data.responses[0].submissionId).toEqual('ab9959b2-73e8-4994-85b9-56e780b89ce3');
    })
});