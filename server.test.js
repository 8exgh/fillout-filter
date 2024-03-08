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
test('equals', () => __awaiter(void 0, void 0, void 0, function* () {
    const filter = [
        {
            condition: "equals",
            id: "4KC356y4M6W8jHPKx9QfEy",
            value: "Nothing much to share yet!"
        }
    ];
    const response = yield axios.get(`http://localhost:3000/cLZojxk94ous/filteredResponses&filters=${JSON.stringify(filter)}`);
    console.log("response", response.data);
    expect(response.data.pageCount).toEqual(1);
}));
