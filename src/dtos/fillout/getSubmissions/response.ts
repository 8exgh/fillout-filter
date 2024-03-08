export interface ApiResponse {
    responses: Response[];
    totalResponses: number;
    pageCount: number;
}

export interface Response {
    submissionId: string;
    submissionTime: string;
    lastUpdatedAt: string;
    questions: Question[];
    calculations: any[]; // Specify further if structure is known
    urlParameters: any[]; // Specify further if structure is known
    quiz: Record<string, unknown>; // Use a more specific type if the structure of quiz is known
    documents: any[]; // Specify further if structure is known
}

export type QuestionType = 'LongAnswer' | 'ShortAnswer' | 'DatePicker' | 'NumberInput' | 'MultipleChoice' | 'EmailInput';

export interface Question {
    id: string;
    name: string;
    type: QuestionType;
    value: string | number | null; // Adjust based on possible values
}