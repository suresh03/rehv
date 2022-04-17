import { UPDATE_SURVEY, UPDATE_SURVEY_QA, DELETE_SURVEY_QA, UPDATE_PERSONAL_COMMUNITY } from "./types";

const initialState = {
    currentSurvey: null,
    surveyQA: [],
    selectedCommunity: null
}

export default mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_SURVEY:
            return {
                ...state,
                currentSurvey: action.payload
            }
        case UPDATE_SURVEY_QA:
            var result = state.surveyQA;
            let data = action.payload;
            if (result.length > 0) {
                let finder = result.find(x => x.questionId === action.payload.questionId);
                if (finder) {
                    let filteredData = result.filter(x => x.questionId != action.payload.questionId);
                    filteredData.push({
                        questionId: data.questionId,
                        answer: data.answer,
                        other: data.other,
                        PostId: data.PostId
                    });
                    result = filteredData;
                } else {
                    result.push({
                        questionId: data.questionId,
                        answer: data.answer,
                        other: data.other,
                        PostId: data.PostId
                    });
                }
            } else {
                result.push({
                    questionId: data.questionId,
                    answer: data.answer,
                    other: data.other,
                    PostId: data.PostId
                });
            }
            return {
                ...state,
                surveyQA: result
            }
        case DELETE_SURVEY_QA:
            return {
                ...state,
                surveyQA: []
            }

            case UPDATE_PERSONAL_COMMUNITY:
            return {
                ...state,
                selectedCommunity: action.payload
            }

        default:
            return state
    }
}