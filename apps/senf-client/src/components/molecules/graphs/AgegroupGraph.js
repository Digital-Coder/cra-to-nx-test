/** @format */

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
//Icons
import CircularProgress from "@material-ui/core/CircularProgress";

//Graphs
import createPlotlyComponent from "react-plotlyjs";
//See the list of possible plotly bundles at https://github.com/plotly/plotly.js/blob/master/dist/README.md#partial-bundles or roll your own
import Plotly from "plotly.js/dist/plotly-cartesian.min";
import { Agegroupdata } from "./Agegroup/Agegroupdata";
import TagsFilter from "../Filters/TagsFilter";
import styled from "styled-components";
import GraphsWrapper from "./GraphsWrapper";
const PlotlyComponent = createPlotlyComponent(Plotly);

const FilterWrapper = styled.div`
  width: 100%;
  max-width: 500px;
  margin-bottom: 50px;
  position: relative;
  top: -40px;
  margin-left: 50%;
  transform: translateX(-50%);
`;

//  let PlotlyComponent
// import(/* webpackChunkName: "Agegroup-Graph plotly" */'plotly.js/dist/plotly-cartesian.min').then(plotly=>{
//   PlotlyComponent = createPlotlyComponent(plotly);

// })

const AgegroupGraph = ({ classes, screams, likes }) => {
  const { t } = useTranslation();

  const selectedTopics = useSelector((state) => state.data.topics);

  const screamsFiltered = screams
    ? screams.filter(({ Thema }) => selectedTopics.includes(Thema))
    : [];
  //console.log(likes);

  const likesFiltered = likes
    ? likes.filter(({ Thema }) => selectedTopics.includes(Thema))
    : [];

  const ageRange = [
    "< 18",
    "< 18",
    "18 - 24",
    "18 - 24",
    "25-34",
    "25-34",
    "35-44",
    "35-44",
    "45-54",
    "45-54",
    "55-64",
    "55-64",
    "65+",
    "65+",
  ];
  let data = [
    {
      alignmentgroup: true,

      legendgroup: "Rad",
      marker: { color: "#929df6" },
      name: "Rad",
      offsetgroup: "Rad",
      orientation: "h",
      showlegend: false,
      textposition: "auto",
      type: "bar",
      x: Agegroupdata(screamsFiltered, likesFiltered, "Rad"),
      xaxis: "x",
      y: ageRange,

      yaxis: "y",
    },
    {
      alignmentgroup: true,
      legendgroup: "Inklusion / Soziales",
      marker: { color: "#e8907e" },
      name: "Inklusion / Soziales",
      offsetgroup: "Inklusion / Soziales",
      orientation: "h",
      showlegend: false,
      textposition: "auto",
      type: "bar",
      x: Agegroupdata(screamsFiltered, likesFiltered, "Inklusion / Soziales"),
      xaxis: "x",
      y: ageRange,
      yaxis: "y",
    },
    {
      alignmentgroup: true,
      legendgroup: "Verkehr",
      marker: { color: "#91dff4" },
      name: "Verkehr",
      offsetgroup: "Verkehr",
      orientation: "h",
      showlegend: false,
      textposition: "auto",
      type: "bar",
      x: Agegroupdata(screamsFiltered, likesFiltered, "Verkehr"),
      xaxis: "x",
      y: ageRange,
      yaxis: "y",
    },
    {
      alignmentgroup: true,
      legendgroup: "Umwelt und Grün",
      marker: { color: "#8dd9b8" },
      name: "Umwelt und Grün",
      offsetgroup: "Umwelt und Grün",
      orientation: "h",
      showlegend: false,
      textposition: "auto",
      type: "bar",
      x: Agegroupdata(screamsFiltered, likesFiltered, "Umwelt und Grün"),
      xaxis: "x",
      y: ageRange,
      yaxis: "y",
    },
    {
      alignmentgroup: true,
      legendgroup: "Versorgung",
      marker: { color: "#bd98f6" },
      name: "Versorgung",
      offsetgroup: "Versorgung",
      orientation: "h",
      showlegend: false,
      textposition: "auto",
      type: "bar",
      x: Agegroupdata(screamsFiltered, likesFiltered, "Versorgung"),
      xaxis: "x",
      y: ageRange,
      yaxis: "y",
    },
    {
      alignmentgroup: true,
      legendgroup: "Sport / Freizeit",
      marker: { color: "#f6c095" },
      name: "Sport / Freizeit",
      offsetgroup: "Sport / Freizeit",
      orientation: "h",
      showlegend: false,
      textposition: "auto",
      type: "bar",
      x: Agegroupdata(screamsFiltered, likesFiltered, "Sport / Freizeit"),
      xaxis: "x",
      y: ageRange,
      yaxis: "y",
    },
    {
      alignmentgroup: true,
      legendgroup: "Sonstige",
      marker: { color: "#f9db95" },
      name: "Sonstige",
      offsetgroup: "Sonstige",
      orientation: "h",
      showlegend: false,
      textposition: "auto",
      type: "bar",
      x: Agegroupdata(screamsFiltered, likesFiltered, "Sonstige"),
      xaxis: "x",
      y: ageRange,
      yaxis: "y",
    },
  ];
  let layout = {
    annotations: [
      {
        x: 0,
        y: 7,
        xref: "x",
        yref: "y",
        text: t("ideas") + " | Votes",
        ay: 0,
        ax: -1,
        arrowcolor: "rgba(255, 0, 255, 0.53)",
        arrowhead: 5,
        arrowsize: 1,
        showarrow: true,
      },
    ],
    barmode: "relative",
    autosize: true,
    height: 300,
    hovermode: false,
    margin: { b: 40, l: 45, r: 0, t: 20 },
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(0,0,0,0)",
    shapes: [
      {
        line: { color: "white", width: 2 },
        type: "line",
        x0: 0,
        x1: 0,
        y0: -0.5,
        y1: 6.5,
      },
    ],
    template: "...",
    xaxis: {
      anchor: "x",
      fixedrange: true,
      domain: [0.0, 1.0],
      showgrid: false,
      zeroline: false,
      showline: false,
      linewidth: 2,
      tickmode: "array", // If "array", the placement of the ticks is set via `tickvals` and the tick text is `ticktext`.
      tickvals: [
        -1000, -500, -200, -100, -50, -25, -10, 0, 10, 25, 50, 100, 200,
      ],
      ticktext: [
        "1000",
        "500",
        "200",
        "100",
        "50",
        "25",
        "10",
        "|",
        "10",
        "25",
        "50",
        "100",
        "200",
        "500",
        "1000",
      ],
      linecolor: "white",
    },

    xaxis2: {
      title: "trend2",
      anchor: "x",
      fixedrange: true,
      domain: [1.0, 0],
      showgrid: false,
      zeroline: false,
      showline: false,
      linewidth: 2,

      tickmode: "array", // If "array", the placement of the ticks is set via `tickvals` and the tick text is `ticktext`.
      tickvals: [-500, -250, -100, -50, 0, 50, 100, 250, 500],
      ticktext: ["500", "250", "100", "50", "|", "50", "100", "250", "500"],
      linecolor: "white",
      mirror: true,
    },
    yaxis: {
      anchor: "x",
      fixedrange: true,
      categoryarray: [
        "65+",
        "55-64",
        "45-54",
        "35-44",
        "25-34",
        "18 - 24",
        "< 18",
      ],

      categoryorder: "array",
      tickcolor: "white",
      ticklen: 0,
      ticks: "outside",
      title: { text: "" },
      showgrid: false,
    },

    domain: [0.0, 1.0],
    //   title: {
    //     text: "Wünsche | Stimmen",
    //     textposition: "middle center",
    //     xanchor: "center",
    //     x: 0.5,
    //     y: 1.1,
    //     font: {
    //       size: 15
    //     }
    //   }
  };

  let config = {
    showLink: false,
    displayModeBar: false,
  };

  // const plot =
  //   agegroups_new_wishes !== undefined &&
  //   agegroups_new_likes !== undefined &&
  //   agegroups_new_wishes.length > 0 &&
  //   agegroups_new_likes.length > 0 ? (
  //     <PlotlyComponent
  //       className={classes.plot}
  //       data={data}
  //       layout={layout}
  //       config={config}
  //     />
  //   ) : (
  //     <CircularProgress size={50} thickness={2} />
  //   );

  const plot =
    screams && PlotlyComponent !== undefined ? (
      <PlotlyComponent data={data} layout={layout} config={config} />
    ) : (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress size={50} thickness={2} />
      </div>
    );

  return (
    <GraphsWrapper
      title={t("agegroups")}
      subTitle={t("agegroups_explained")}
      plot={plot}
    />
  );
};

export default AgegroupGraph;
