import React, { useState } from "react";
import styled from "styled-components";
const Container = styled.div``;
const InputWrapper = styled.div``;
const InputWrapperGuide = styled.h1`
  font-size: 14px;
  font-weight: 400;
  color: gray;
`;
const InputWrapperError = styled.h1``;
const InputContainer = styled.div`
  min-height: 30px;
  display: flex;
  border: 1px solid lightgray;
  border-radius: 8px;
  padding: 8px;

  width: 800px;
  float: right;
  overflow-x: hidden;
`;
const TextInput = styled.input`
  outline: none;
  border: none;
  size: 14px;
  font-weight: 400;
  width: 100%;
`;
const TextArrayContainer = styled.div`
  display: flex;
  width: 100%;
`;
const SingleTextContainer = styled.div`
  margin-right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: teal;
  border-radius: 6px;
  padding: 6px;
`;
const SingleText = styled.h1`
  font-size: 12px;
  color: white;
  font-weight: 400;
`;
const CancelContainer = styled.div`
  height: 12px;
  width: 12px;
  border-radius: 50%;
  margin-left: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  opacity: 0.8;
  cursor: pointer;
`;
const CancelIcon = styled.span`
  font-size: 10px;
`;
const BottomContainer = styled.div``;
const ErrorContainer = styled.h1`
  font-size: 14px;
  font-weight: 400;

  color: red;
`;

const MultiTagInput = ({ maxTags = 10, validationFunction, minLength }) => {
  const [inputValue, setInputValue] = useState("");
  const [textArray, setTextArray] = useState(["Germany", "Poland"]);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    "                                             "
  );

  //Insertion and deletion from array
  const onKeyDownHandler = (e) => {
    if (e.key === "Enter") {
      if (!validationFunction(e.target.value)) {
        setError(true);
        setErrorMessage("The input is not validated!!");
      } else if (textArray.length === maxTags) {
        setError(true);
        setErrorMessage("Max tags limit reached !");
      } else {
        if (textArray.indexOf(e.target.value) > -1) {
          setError(true);
          setErrorMessage("Duplicate tags not allowed");
        } else {
          setError(false);
          setTextArray([...textArray, inputValue]);
          setInputValue("");
        }
      }
    } else if (e.key === "Backspace") {
      if (!inputValue && textArray.length > 0) {
        setInputValue(textArray[textArray.length - 1]);
        setTextArray(textArray.slice(0, -1));
      }
    }
  };

  //cancel Icons
  const removeItem = (value) => {
    setTextArray(textArray.filter((item) => item !== value));
  };
  return (
    <Container>
      <InputWrapper>
        <InputContainer>
          <TextArrayContainer>
            {textArray.map((item) => {
              return (
                <SingleTextContainer>
                  <SingleText>{item}</SingleText>
                  <CancelContainer onClick={() => removeItem(item)}>
                    <CancelIcon>X</CancelIcon>
                  </CancelContainer>
                </SingleTextContainer>
              );
            })}
            <TextInput
              type="text"
              value={inputValue}
              onKeyDown={onKeyDownHandler}
              onChange={(e) => {
                setError(false);
                setInputValue(e.target.value);
              }}
            />
          </TextArrayContainer>
        </InputContainer>
        <BottomContainer>
          {error ? (
            <ErrorContainer>{errorMessage}</ErrorContainer>
          ) : (
            <InputWrapperGuide>
              Hit 'Enter' to insert a Tag of minimum length {minLength} (Max{" "}
              {maxTags} Tags)
            </InputWrapperGuide>
          )}
        </BottomContainer>
      </InputWrapper>
    </Container>
  );
};

export default MultiTagInput;
