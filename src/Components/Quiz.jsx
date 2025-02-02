import React, { useState, useRef, useEffect } from "react";
import "./Quiz.css";
import { data } from "../assets/data";
import Timer from "./Timer";

function Quiz() {
  const [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(data[index]);
  let [lock, setLock] = useState(false);
  let [score, setScore] = useState(0);
  let [result, setResult] = useState(false);
  let [timeUp, setTimeUp] = useState(false);

  let Option1 = useRef(null);
  let Option2 = useRef(null);
  let Option3 = useRef(null);
  let Option4 = useRef(null);

  //   let [result, setResult] = useState(false);

  let option_arry = [Option1, Option2, Option3, Option4];

  useEffect(() => {
    if (timeUp) {
      setLock(true);
      option_arry[question.ans + 1].current.classList.add("correct");
      // next();
    }
  }, [timeUp]);

  const checkAns = (e, ans) => {
    if (lock === false) {
      if (question.ans === ans) {
        e.target.classList.add("correct");
        setLock(true);
        setScore((prev) => prev + 1);
      } else {
        e.target.classList.add("wrong");
        setLock(true);
        option_arry[question.ans - 1].current.classList.add("correct");
      }

      setLock(true);
    }
  };

  // next button ******

  //   const next = () => {
  //     if (lock === true) {
  //       if (index === data.length - 1) {
  //         setResult(true);
  //         return 0;
  //       }

  //       setIndex(++index);
  //       setQuestion(data[index]);
  //       setLock(false);
  //       option_arry.map((option) => {
  //         option.current.classList.remove("wrong");
  //         option.current.classList.remove("correct");
  //         return null;
  //       });
  //     }
  //   };
  // /NEXT BUTTON ***********
  const next = () => {
    if (lock === true) {
      setIndex((prevIndex) => {
        const newIndex = prevIndex + 1;

        if (newIndex === data.length) {
          setResult(true);
          // return prevIndex; // Keep the index the same if it's the last question
        }

        //  else {
        // setIndex(newIndex);
        // setQuestion(data[newIndex]);
        // setLock(false);
        // setTimeUp(false);
        // option_arry.forEach((option) => {
        //   option.current.classList.remove("wrong");
        //   option.current.classList.remove("correct");
        // });
        setQuestion(data[newIndex]);
        setLock(false);
        setTimeUp(false);
        option_arry.forEach((option) => {
          option.current.classList.remove("wrong");
          option.current.classList.remove("correct");
        });

        return newIndex;
      });
    }
  };
  // *************
  const reset = () => {
    setIndex(0);
    setQuestion(data[0]);
    setScore(0);
    setLock(false);
    setResult(false);
    setTimeUp(false);

    option_arry.forEach((option) => {
      option.current.classList.remove("wrong");
      option.current.classList.remove("correct");
    });
  };

  return (
    <div className="container">
      <h1>Quiz App</h1>
      <hr />

      {result ? (
        <></>
      ) : (
        <>
          <Timer setTimeUp={setTimeUp} />
          <h2>
            {index + 1}.{question.question}
          </h2>

          <ul>
            <li ref={Option1} onClick={(e) => checkAns(e, 1)}>
              {question.option1}
            </li>
            <li ref={Option2} onClick={(e) => checkAns(e, 2)}>
              {question.option2}
            </li>
            <li ref={Option3} onClick={(e) => checkAns(e, 3)}>
              {question.option3}
            </li>
            <li ref={Option4} onClick={(e) => checkAns(e, 4)}>
              {question.option4}
            </li>
          </ul>

          <button onClick={next}>Next</button>

          <div className="index">
            {index + 1} of {data.length} questions
          </div>
        </>
      )}
      {result ? (
        <>
          <h2>
            You Scored {score}/{data.length}
          </h2>
          <button onClick={reset}>Reset</button>
        </>
      ) : (
        <> </>
      )}
    </div>
  );
}

export default Quiz;
