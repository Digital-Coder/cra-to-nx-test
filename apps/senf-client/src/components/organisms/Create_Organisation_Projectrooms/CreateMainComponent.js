/** @format */

import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useTransition, animated } from "@react-spring/web";

//firebase
import firebase from "firebase/app";
import "firebase/firestore";

//Components
import { PageWrapper } from "./styles/sharedStyles";
import TopNavigation from "./Components/TopNavigation";
import { CustomIconButton } from "../../atoms/CustomButtons/CustomButton";
import MainDialog from "../../atoms/Layout/MainDialog";
import CreateProjectPage0 from "./CreateProjectRoom_components/CreateProjectPage0";
import CreateProjectPage0a from "./CreateProjectRoom_components/CreateProjectPage0a";
import CreateProjectPage1 from "./CreateProjectRoom_components/CreateProjectPage1";
import CreateProjectPage2 from "./CreateProjectRoom_components/CreateProjectPage2";
import CreateProjectPage3 from "./CreateProjectRoom_components/CreateProjectPage3";
import CreateProjectPage4 from "./CreateProjectRoom_components/CreateProjectPage4";
import CreateProjectPagePreview from "./CreateProjectRoom_components/CreateProjectPreview";
import CreateOrganizationPage0 from "./Organization_components/CreateOrganizationPage0";
import CreateOrganizationPage0a from "./Organization_components/CreateOrganizationPage0a";
import CreateOrganizationPage0b from "./Organization_components/CreateOrganizationPage0b";
import CreateOrganizationPage1 from "./Organization_components/CreateOrganizationPage1";
import CreateOrganizationPage2 from "./Organization_components/CreateOrganizationPage2";
import CreateOrganizationPage3 from "./Organization_components/CreateOrganizationPage3";
import CreateOrganizationPage4 from "./Organization_components/CreateOrganizationPage4";
import CreateOrganizationPagePreview from "./Organization_components/CreateOrganizationPreview";

//Redux
import FinishedCreatingOrganization from "./Organization_components/FinishedCreatingOrganization";
import { stateCreateOrganizationsFunc } from "../../../redux/actions/organizationActions";
import { openCreateProjectRoomFunc } from "../../../redux/actions/projectActions";

const CreateProjectDialog = ({ type }) => {
  const openCreateProjectRoom = useSelector(
    (state) => state.UI.openCreateProjectRoom
  );
  const openCreateOrganization = useSelector(
    (state) => state.UI.openCreateOrganization
  );
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [title, setTitle] = useState(null);

  const [index, set] = useState(1);

  useEffect(() => {
    async function fetchData() {
      const db = firebase.firestore();
      if (openCreateProjectRoom) {
        if (localStorage.getItem("createProjectPostEdit")) {
          set(pages.length - 1);
        } else {
          set(0);
        }
        if (
          typeof Storage !== "undefined" &&
          localStorage.getItem("createProjectRoomId")
        ) {
          const ref = await db
            .collection("organizations")
            .doc(localStorage.getItem("createProjectRoomOrganizationId"))
            .collection("projectRooms")
            .doc(localStorage.getItem("createProjectRoomId"))
            .get();

          if (!ref.exists) {
            console.log("No such document!");
          } else {
            const data = ref.data();
            setTitle(data.title);
          }
        }
      } else if (openCreateOrganization) {
        if (localStorage.getItem("createOrganizationPostEdit")) {
          console.log(localStorage);
          set(pages.length - 1);
        } else {
          set(0);
        }

        if (
          typeof Storage !== "undefined" &&
          localStorage.getItem("createOrganizationId")
        ) {
          const ref = await db
            .collection("organizations")
            .doc(localStorage.getItem("createOrganizationId"))
            .get();

          if (!ref.exists) {
            console.log("No such document!");
          } else {
            const data = ref.data();
            setTitle(data.title);
          }
        }
      }
    }
    fetchData();
  }, []);

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
    // from: {
    //   opacity: 0,
    //   transform: `translateX(${fromValue}%)`,
    //   config: { duration: 1000, mass: 100 },
    // },
    enter: {
      opacity: 1,
    },
    // leave: {
    //   opacity: 0,
    //   transform: `translateX(${leaveValue}%)`,
    //   config: { duration: 300 },
    // },
  });

  const setClose = () => {
    dispatch(openCreateProjectRoomFunc(false));
    dispatch(stateCreateOrganizationsFunc(false));

    localStorage.removeItem("createProjectPostEdit");
    localStorage.removeItem("createOrganizationPostEdit");
  };

  const pages =
    type === "projectRoom"
      ? [
          ({ style }) => (
            <PageWrapper>
              <CreateProjectPage0 set={set} />
            </PageWrapper>
          ),
          ({ style }) => (
            <PageWrapper>
              <CreateProjectPage0a onClickNext={onClickNext} />
            </PageWrapper>
          ),
          ({ style }) => (
            <PageWrapper>
              <CreateProjectPage1 onClickNext={onClickNext} />
            </PageWrapper>
          ),
          ({ style }) => (
            <PageWrapper>
              <CreateProjectPage2
                onClickNext={onClickNext}
                onClickPrev={onClickPrev}
              />
            </PageWrapper>
          ),
          ({ style }) => (
            <PageWrapper
            /* style={{
                ...style,
              }} */
            >
              <CreateProjectPage3
                onClickNext={onClickNext}
                onClickPrev={onClickPrev}
              />
            </PageWrapper>
          ),
          ({ style }) => (
            <PageWrapper>
              <CreateProjectPage4
                onClickNext={onClickNext}
                onClickPrev={onClickPrev}
              />
            </PageWrapper>
          ),
          ({ style }) => (
            <PageWrapper>
              <CreateProjectPagePreview
                onClickPrev={onClickPrev}
                setClose={setClose}
                set={set}
              />
            </PageWrapper>
          ),
        ]
      : [
          ({ style }) => (
            <PageWrapper>
              <CreateOrganizationPage0 onClickNext={onClickNext} />
            </PageWrapper>
          ),
          ({ style }) => (
            <PageWrapper>
              <CreateOrganizationPage0a
                onClickNext={onClickNext}
                onClickPrev={onClickPrev}
              />
            </PageWrapper>
          ),
          ({ style }) => (
            <PageWrapper>
              <CreateOrganizationPage0b
                onClickNext={onClickNext}
                onClickPrev={onClickPrev}
              />
            </PageWrapper>
          ),
          ({ style }) => (
            <PageWrapper>
              <CreateOrganizationPage1
                onClickNext={onClickNext}
                onClickPrev={onClickPrev}
              />
            </PageWrapper>
          ),
          ({ style }) => (
            <PageWrapper>
              <CreateOrganizationPage2
                onClickNext={onClickNext}
                onClickPrev={onClickPrev}
              />
            </PageWrapper>
          ),
          ({ style }) => (
            <PageWrapper>
              <CreateOrganizationPage3
                onClickNext={onClickNext}
                onClickPrev={onClickPrev}
              />
            </PageWrapper>
          ),
          ({ style }) => (
            <PageWrapper>
              <CreateOrganizationPage4
                onClickNext={onClickNext}
                onClickPrev={onClickPrev}
              />
            </PageWrapper>
          ),
          ({ style }) => (
            <PageWrapper>
              <CreateOrganizationPagePreview
                onClickNext={onClickNext}
                onClickPrev={onClickPrev}
                setClose={setClose}
              />
            </PageWrapper>
          ),
          // ({ style }) => (
          //   <PageWrapper>
          //     <FinishedCreatingOrganization
          //       onClickPrev={onClickPrev}
          //       setCreateOrganizationIsOpen={setClose}
          //       set={set}
          //     />
          //   </PageWrapper>
          // ),
        ];

  const currentStep = (100 / (pages.length - 1)) * index;

  return (
    <MainDialog isOpen={true}>
      <TopNavigation
        index={currentStep}
        title={index !== 0 && index !== 1 && index !== 2 && title}
      />

      <CustomIconButton
        name="Close"
        position="fixed"
        margin={document.body.clientWidth > 768 ? "10px" : "10px"}
        left="0"
        top="0"
        zIndex={2}
        backgroundColor="transparent"
        shadow={false}
        handleButtonClick={setClose}
      />

      {transitions((style, i) => {
        const Page = pages[i];
        return <Page style={style} />;
      })}
    </MainDialog>
  );
};

export default CreateProjectDialog;
