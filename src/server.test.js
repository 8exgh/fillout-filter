var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from "axios";
describe('filter', () => {
    it('should filter equals', () => __awaiter(void 0, void 0, void 0, function* () {
        const filter = [
            {
                condition: "equals",
                id: "4KC356y4M6W8jHPKx9QfEy",
                value: "Nothing much to share yet!"
            },
        ];
        const response = yield axios.get(`http://localhost:3000/cLZojxk94ous/filteredResponses?filters=${JSON.stringify(filter)}`);
        console.log("response", response.data);
        expect(response.data.pageCount).toEqual(1);
        expect(response.data.responses[0].submissionId).toEqual("ab9959b2-73e8-4994-85b9-56e780b89ce3");
        expect(response.data.totalResponses).toEqual(response.data.responses.length);
    }));
    it('should filter not equals', () => __awaiter(void 0, void 0, void 0, function* () {
        const filter = [
            {
                condition: "does_not_equal",
                id: "4KC356y4M6W8jHPKx9QfEy",
                value: "I'm excited for it!"
            }
        ];
        const response = yield axios.get(`http://localhost:3000/cLZojxk94ous/filteredResponses?filters=${JSON.stringify(filter)}`);
        console.log("response", response.data);
        expect(response.data.responses.length).toBeGreaterThan(1);
        const filteredOut = response.data.responses.find(response => response.submissionId === "f9b8b405-6ca9-41f3-a03f-d5a563dfa0f6");
        expect(filteredOut).toBeUndefined();
    }));
    it('should filter greater than', () => __awaiter(void 0, void 0, void 0, function* () {
        const filter = [
            {
                condition: "greater_than",
                id: "4KC356y4M6W8jHPKx9QfEy",
                value: "g"
            }
        ];
        const response = yield axios.get(`http://localhost:3000/cLZojxk94ous/filteredResponses?filters=${JSON.stringify(filter)}`);
        console.log("response", response.data);
        expect(response.data.responses.length).toEqual(1);
    }));
    it('should filter less than', () => __awaiter(void 0, void 0, void 0, function* () {
        const filterText = "g";
        const filter = [
            {
                condition: "less_than",
                id: "4KC356y4M6W8jHPKx9QfEy",
                value: "g"
            }
        ];
        const response = yield axios.get(`http://localhost:3000/cLZojxk94ous/filteredResponses?filters=${JSON.stringify(filter)}`);
        console.log("response", response.data);
        expect(response.data.responses.length).toEqual(11);
    }));
    it('should filter combinations', () => __awaiter(void 0, void 0, void 0, function* () {
        const filter = [
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
        ];
        const response = yield axios.get(`http://localhost:3000/cLZojxk94ous/filteredResponses?filters=${JSON.stringify(filter)}`);
        console.log("response", response.data);
        expect(response.data.responses.length).toEqual(1);
        expect(response.data.responses[0].submissionId).toEqual('ab9959b2-73e8-4994-85b9-56e780b89ce3');
    }));
});
