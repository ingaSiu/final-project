const AnswerCard = ({ liked, onClick, editable }) => {
  return (
    <AnswerWrapper>
      <AnswerContainer>
        <IconsWrapper>
          {item.liked === 1 ? (
            <BsArrowUpCircleFill onClick={() => rateAnswer({ answerId: item._id, rating: 1 })} />
          ) : (
            <BsArrowUpCircle onClick={() => rateAnswer({ answerId: item._id, rating: 1 })} />
          )}

          <RatingCount>{item.rating}</RatingCount>

          {item.liked === -1 ? (
            <BsArrowDownCircleFill onClick={() => rateAnswer({ answerId: item._id, rating: -1 })} />
          ) : (
            <BsArrowDownCircle onClick={() => rateAnswer({ answerId: item._id, rating: -1 })} />
          )}
        </IconsWrapper>

        <TextField>{answer}</TextField>
      </AnswerContainer>
      {editable && <AddAnswerForm answer={item.answer} answerId={item._id} questionId={questionData._id} />}
    </AnswerWrapper>
  );
};

export default AnswerCard;
