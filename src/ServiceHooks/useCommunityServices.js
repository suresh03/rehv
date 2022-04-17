import React, { useState } from "react";
import useApiServices from "../Services/useApiServices";
import CommunityServices from "../Services/CommunityServices";
import { Alert } from "react-native";
import SnackbarHandler from "../Utils/SnackbarHandler";
import Lang from "../Language";

function useCommunityServices() {
  const [loading, setLoading] = useState(false);
  const { ApiPostMethod } = useApiServices();

  const handleResponse = (res) => {
    console.log("likeAndComment res ", res);
    if (res?.statusCode === 200) {
      setLoading(false);
      return res.data;
    } else {
      console.log("error => ", res);
      //  SnackbarHandler.errorToast(Lang.MESSAGE, res.message ?? res.responseType);
      setLoading(false);
      return res;
    }
  };

  const handleError = async (error) => {
    console.log(error);
    SnackbarHandler.errorToast(Lang.MESSAGE, error?.message??'');
console.log('error?.message',error?.message)
    setLoading(false);
    return error;
  };

  const likeOrComment = async (action, postId, selectedCommunityId, val) => {
    console.log(action, postId, selectedCommunityId, val);
    setLoading(true);
    let likePayload = {
      postId: postId,
      communityId: selectedCommunityId,
      isLike: true,
    };

    let commentPayload = {
      postId: postId,
      communityId: selectedCommunityId,
      isLike: false,
      comments: val,
    };
    try {
      const res = await ApiPostMethod(
        CommunityServices.endPoints.likeOrComment,
        action === "like" ? likePayload : commentPayload
      );
      setLoading(false);
      return handleResponse(res);
    } catch (error) {
      handleError(error);
    }
  };

  const likeContest = async (action, postId, val) => {
    setLoading(true);
    let likePayload = {
      postId: postId,
      participantId: participantId,
      isLike: true,
    };

    try {
      const res = await ApiPostMethod(
        CommunityServices.endPoints.likeParticipants,
        action === likePayload
      );
      setLoading(false);
      return handleResponse(res);
    } catch (error) {
      handleError(error);
    }
  };

  const likeOrCommentHome = async (action, postId, val) => {
    setLoading(true);
    let likePayload = {
      postId: postId,
      isLike: true,
    };

    let commentPayload = {
      postId: postId,
      isLike: false,
      comments: val,
    };
    try {
      const res = await ApiPostMethod(
        CommunityServices.endPoints.likeOrComment,
        action === "like" ? likePayload : commentPayload
      );
      setLoading(false);
      return handleResponse(res);
    } catch (error) {
      handleError(error);
    }
  };

  const likeOrCommentList = async (postId, isLike) => {
    setLoading(true);
    let data = {
      postId: postId,
      isLike: isLike,
    };
    try {
      const res = await ApiPostMethod(
        CommunityServices.endPoints.likeOrCommentList,
        data
      );
      setLoading(false);
      return handleResponse(res);
    } catch (error) {
      handleError(error);
    }
  };

  const getPollDetails = async (postId) => {
    setLoading(true);
    let data = {
      postId: postId,
    };
    try {
      const res = await ApiPostMethod(
        CommunityServices.endPoints.getPollDetailsById,
        data
      );
      setLoading(false);
      return handleResponse(res);
    } catch (error) {
      handleError(error);
    }
  };

  const getSurveyDetailsById = async (postId) => {
    setLoading(true);
    let data = {
      postId: postId,
    };
    try {
      const res = await ApiPostMethod(
        CommunityServices.endPoints.getSurveyDetailsById,
        data
      );
      setLoading(false);
      return handleResponse(res);
    } catch (error) {
      handleError(error);
    }
  };

  const getPostDetailsById = async (postId) => {
    setLoading(true);
    let data = {
      postId: postId,
    };
    try {
      const res = await ApiPostMethod(
        CommunityServices.endPoints.getPostDetailsById,
        data
      );
      setLoading(false);
      return handleResponse(res);
    } catch (error) {
      handleError(error);
    }
  };

  const submitAnswer = async (postId, questionId, eventType, answer) => {
    setLoading(true);
    let data = {
      postId,
      questionId,
      eventType: eventType.toUpperCase(),
      answer,
    };
    try {
      const res = await ApiPostMethod(
        CommunityServices.endPoints.submitAnswer,
        data
      );
      return handleResponse(res);
    } catch (error) {
      handleError(error);
    }
  };

  return {
    likeOrComment,
    likeOrCommentList,
    getPollDetails,
    submitAnswer,
    loading,
    getSurveyDetailsById,
    likeOrCommentHome,
    getPostDetailsById,
    likeContest,
  };
}

export default useCommunityServices;
