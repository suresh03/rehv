import { UPDATE_SURVEY, UPDATE_SURVEY_QA, DELETE_SURVEY_QA, UPDATE_PERSONAL_COMMUNITY } from "./types";

export const updateSurvey = (payload) => {
    return {
        type: UPDATE_SURVEY,
        payload: payload
    }
}

export const updateQA = (payload) => {
    return {
        type: UPDATE_SURVEY_QA,
        payload: payload
    }
}

export const deleteQA = (payload) => {
    return {
        type: DELETE_SURVEY_QA
    }
}

export const updatePersonalCommunity = (payload) => {
    return {
        type: UPDATE_PERSONAL_COMMUNITY,
        payload: payload
    }
}