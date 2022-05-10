class CommunityServices {
  endPoints = {
    likeOrComment: "post/likeAndComment",
    likeOrCommentList: "post/likeAndCommentList",
    getPollDetailsById: "post/getPollDetailsById",
    submitAnswer: "post/createSurveyAnswer",
    getSurveyDetailsById: "post/getSurveyDetailsById",
    getPostDetailsById: "post/getPostDetailsById",
    likeParticipants: "post/likeParticipants",
  };

  modifyPollDetail = (data, isAnswered, index) =>
    new Promise((resolve, reject) => {
      const {
        __v,
        createdBy,
        isDeleted,
        optionA,
        optionB,
        optionC,
        optionD,
        answerData,
        ...rest
      } = data[0].data[0];

      console.log(data);

      const answers = (key) => {
        let x = data.find((item) => item._id.answer === key);
        if (x === undefined) {
          return false;
        } else {
          return true;
        }
      };

      const percentage = (key) => {
        let x = data.find((item) => item._id.answer === key);
        if (x === undefined) {
          return "0";
        } else {
          return x?._id?.percentage;
        }
      };

      let x = [
        {
          text: optionA,
          isAnswered: isAnswered == index || answers("A"),
          percentage: percentage("A"),
        },
        {
          text: optionB,
          isAnswered: isAnswered == index || answers("B"),
          percentage: percentage("B"),
        },
        {
          text: optionC,
          isAnswered: isAnswered == index || answers("C"),
          percentage: percentage("C"),
        },
        {
          text: optionD,
          isAnswered: isAnswered == index || answers("D"),
          percentage: percentage("D"),
        },
      ];

      let options = x.filter((item) => item.text.trim() !== "");
      let pollDetails = {
        ...rest,
        options,
      };
      resolve(pollDetails);
    });
}
export default new CommunityServices();
