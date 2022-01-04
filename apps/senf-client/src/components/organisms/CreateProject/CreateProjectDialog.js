/** @format */

import React, { useState, useRef, useCallback } from "react";
import styled from "styled-components";
import { CustomIconButton } from "../../atoms/CustomButtons/CustomButton";
import MainDialog from "../../atoms/Layout/MainDialog";
import CreateProjectPage1 from "./CreateProjectPage1";
import CreateProjectPage2 from "./CreateProjectPage2";

import { useTranslation } from "react-i18next";
import { useOnClickOutside } from "../../../hooks/useOnClickOutside";

import { useTransition, animated } from "@react-spring/web";
import { SubmitButton } from "../../atoms/CustomButtons/SubmitButton";

const InnerWrapper = styled.div`
  text-align: center;
  margin-top: 60px;
  position: relative;
  @media (min-width: 768px) {
    margin-top: 40px;
  }
`;

const ProgressLine = styled.div`
  height: 10px;
  width: 50%;
  margin-left: 25%;
  background-color: rgb(255, 255, 255, 0.4);
  border-radius: 10px;
  position: relative;
  top: 40px;
`;
const CurrentStep = styled.div`
  height: 100%;

  width: ${(props) => props.index && `${props.index}%`};
  transition: 1s;
  border-radius: 5px;
  background-color: white;
`;

const CreateProjectDialog = ({
  setCreateProjectDialogIsOpen,
  isCreateProjectDialogIsOpen,
}) => {
  const { t } = useTranslation();
  const [outsideClick, setOutsideClick] = useState(false);

  const [index, set] = useState(0);
  const [fromValue, setFrom] = useState(-100);
  const [leaveValue, setLeave] = useState(15);
  const onClickPrev = useCallback(() => {
    set((state) => state - 1);
    setFrom(-30);
    setLeave(15);
  }, []);
  const onClickNext = useCallback(() => {
    set((state) => state + 1);
    setFrom(30);
    setLeave(-15);
  }, []);

  const transitions = useTransition(index, {
    from: {
      opacity: 0,
      transform: `translateX(${fromValue}%)`,
      config: { duration: 1000, mass: 100 },
    },
    enter: { opacity: 1, transform: "translateX(0%)" },
    leave: {
      opacity: 0,
      transform: `translateX(${leaveValue}%)`,
      config: { duration: 300 },
    },
  });

  const outerRef = useRef();
  useOnClickOutside(outerRef, () => {
    setOutsideClick(true);
    setTimeout(() => {
      setOutsideClick(false);
    }, 10000);
  });

  const pages = [
    ({ style }) => (
      <animated.div
        style={{
          ...style,

          width: "100%",
          position: "absolute",
        }}
      >
        <CreateProjectPage1
          outsideClick={outsideClick}
          setOutsideClick={setOutsideClick}
        />

        <SubmitButton
          text={t("next")}
          zIndex="9"
          backgroundColor="white"
          textColor="#353535"
          position="relative"
          top={document.body.clientWidth > 768 ? "100px" : "70px"}
          left="0"
          handleButtonClick={onClickNext}
          // disabled={!formikCreateProjectStore.isValid}
          //   keySubmitRef={keySubmitRef}
        />
      </animated.div>
    ),
    ({ style }) => (
      <animated.div
        style={{
          ...style,

          width: "100%",
          position: "absolute",
        }}
      >
        <CreateProjectPage2
          outsideClick={outsideClick}
          setOutsideClick={setOutsideClick}
        />

        <SubmitButton
          text={t("next")}
          zIndex="9"
          backgroundColor="white"
          textColor="#353535"
          position="relative"
          top={document.body.clientWidth > 768 ? "100px" : "70px"}
          left="0"
          handleButtonClick={onClickNext}
          // disabled={!formikCreateProjectStore.isValid}
          // keySubmitRef={keySubmitRef}
        />
      </animated.div>
    ),
    // ({ style }) => (
    //   <animated.div
    //     style={{
    //       ...style,

    //       width: "100%",
    //       position: "absolute",
    //     }}
    //   >
    //     <SubmitButton
    //       text={t("back")}
    //       zIndex="9"
    //       backgroundColor="white"
    //       textColor="#353535"
    //       position="relative"
    //       top={document.body.clientWidth > 768 ? "100px" : "70px"}
    //       left="0"
    //       handleButtonClick={onClickPrev}
    //       // disabled={!formikCreateProjectStore.isValid}
    //       // keySubmitRef={keySubmitRef}
    //     />
    //   </animated.div>
    // ),
  ];

  const currentStep = (100 / pages.length) * (index + 1);

  return (
    <MainDialog
      setIsOpen={setCreateProjectDialogIsOpen}
      isOpen={isCreateProjectDialogIsOpen}
    >
      {" "}
      <div ref={outerRef}>
        <ProgressLine>
          <CurrentStep index={currentStep} />
        </ProgressLine>
        {index === 0 ? (
          <CustomIconButton
            name="Close"
            position="fixed"
            margin={document.body.clientWidth > 768 ? "40px" : "10px"}
            left="0"
            handleButtonClick={() => setCreateProjectDialogIsOpen(false)}
          />
        ) : (
          <CustomIconButton
            name="ArrowLeft"
            position="fixed"
            margin={document.body.clientWidth > 768 ? "40px" : "10px"}
            left="0"
            handleButtonClick={onClickPrev}
          />
        )}

        <InnerWrapper>
          {transitions((style, i) => {
            const Page = pages[i];
            return <Page style={style} />;
          })}
        </InnerWrapper>
      </div>
    </MainDialog>
  );
};

export default CreateProjectDialog;
