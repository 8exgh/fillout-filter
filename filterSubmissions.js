export const filterSubmissions = (submissions, filter) => {
    const included = [];
    const { responses } = submissions;
    responses.filter(response => {
        for (let i = 0; i < filter.length; i++) {
            const currentFilter = filter[i];
            const question = response.questions.find(question => question.id === currentFilter.id);
            if (!question) {
                continue;
            }
            if (currentFilter.condition === 'equals' && question.value === currentFilter.value) {
                included.push(response);
            }
            else if (currentFilter.condition === 'does_not_equal' && question.value !== currentFilter.value) {
                included.push(response);
            }
            else if (currentFilter.condition === 'greater_than' && question.value && question.value > currentFilter.value) {
                included.push(response);
            }
            else if (currentFilter.condition === 'less_than' && question.value && question.value < currentFilter.value) {
                included.push(response);
            }
        }
    });
    return {
        responses: included,
        totalResponses: included.length,
        pageCount: submissions.pageCount
    };
};
