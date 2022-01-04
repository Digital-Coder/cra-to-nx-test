/** @format */

import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import styled from "styled-components";
import Cookies from "universal-cookie";
import deLocale from "@fullcalendar/core/locales/de";
import enLocale from "@fullcalendar/core/locales/en-gb";
import { formatDate } from "@fullcalendar/react";

import listMonth from "@fullcalendar/list";
import { openScreamFunc } from "../../../redux/actions/screamActions";
// Redux stuff
import { useDispatch } from "react-redux";

import "./Fullcalendar.css";

let str = formatDate(new Date(), {
  month: "long",
  year: "numeric",
  day: "numeric",
});

const CalendarWrapper = styled.div`
  z-index: 999;
  padding-right: 2.5%;
  padding-left: 2.5%;
  min-height: 80vh;
  min-width: 95%;
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  padding-bottom: 50vh;
  pointer-events: all;
`;
const CalendarComponent = ({ projectScreams, ...props }) => {
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const [initState, setInitState] = useState({
    calendarWeekends: true,
    calendarEvents: [
      // initial event data
      {
        title: "Aktion X",
        date: new Date(1623397202 * 1000),
        id: "cIOhFG1vJoI9lDQ0QOPk",
      },
    ],
  });

  useEffect(() => {
    const data = [];
    let i;
    let u;
    for (i = 0; i < projectScreams.length; i++) {
      if (
        projectScreams[i].selectedUnix === undefined ||
        projectScreams[i].selectedUnix === null
      ) {
        continue;
      }
      for (u = 0; u < projectScreams[i].selectedUnix.length; u++) {
        const eventObject = {
          title: projectScreams[i].title,
          date: new Date(projectScreams[i].selectedUnix[u] * 1000),
          id: projectScreams[i].screamId,
        };
        data.push(eventObject);
      }
    }

    setInitState({ ...initState, calendarEvents: data });
  }, []);

  const handleEventClick = ({ event, el }) => {
    const screamId = event.id;
    dispatch(openScreamFunc(screamId));
    props.handleClick(1);
  };
  const lang = cookies.get("language");
  return (
    <CalendarWrapper>
      <FullCalendar
        plugins={[listMonth]}
        initialView="listMonth"
        events={initState.calendarEvents}
        locale={lang === "de" ? deLocale : enLocale}
        eventClick={handleEventClick}
      />
    </CalendarWrapper>
  );
};

export default CalendarComponent;
