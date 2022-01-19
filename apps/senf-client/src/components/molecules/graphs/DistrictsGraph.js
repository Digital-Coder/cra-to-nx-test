/** @format */

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
//Icons
import CircularProgress from "@material-ui/core/CircularProgress";
//Graphs
import createPlotlyComponent from "react-plotlyjs";
//See the list of possible plotly bundles at https://github.com/plotly/plotly.js/blob/master/dist/README.md#partial-bundles or roll your own
import Plotly from "plotly.js/dist/plotly-cartesian.min";
import TagsFilter from "../Filters/TagsFilter";
import styled from "styled-components";
import GraphsWrapper from "./GraphsWrapper";

const PlotlyComponent = createPlotlyComponent(Plotly);

//  let PlotlyComponent
// import(/* webpackChunkName: "Districts-Graph plotly" */'plotly.js/dist/plotly-cartesian.min').then(plotly=>{
//   PlotlyComponent = createPlotlyComponent(plotly);

// })

const DistrictsGraph = ({ classes, screams }) => {
  const selectedTopics = useSelector((state) => state.data.topics);
  const { t } = useTranslation();

  let Rad = [];
  let Rad_one = [];
  let Rad_likes = [];

  let Inklusion_Soziales = [];
  let Inklusion_Soziales_one = [];
  let Inklusion_Soziales_likes = [];

  let Verkehr = [];
  let Verkehr_one = [];
  let Verkehr_likes = [];

  let Umwelt = [];
  let Umwelt_one = [];
  let Umwelt_likes = [];

  let Versorgung = [];
  let Versorgung_one = [];
  let Versorgung_likes = [];

  let Sport_Freizeit = [];
  let Sport_Freizeit_one = [];
  let Sport_Freizeit_likes = [];

  let Sonstige = [];
  let Sonstige_one = [];
  let Sonstige_likes = [];

  if (screams !== undefined && screams.length > 0) {
    screams.forEach((element) => {
      if (element.Thema === "Rad" && selectedTopics.includes(element.Thema)) {
        Rad.push(element.Stadtteil);
        Rad_one.push(1);
        Rad_likes.push(element.likeCount);
      }
      if (
        element.Thema === "Inklusion / Soziales" &&
        selectedTopics.includes(element.Thema)
      ) {
        Inklusion_Soziales.push(element.Stadtteil);
        Inklusion_Soziales_one.push(1);
        Inklusion_Soziales_likes.push(element.likeCount);
      }
      if (
        element.Thema === "Verkehr" &&
        selectedTopics.includes(element.Thema)
      ) {
        Verkehr.push(element.Stadtteil);
        Verkehr_one.push(1);
        Verkehr_likes.push(element.likeCount);
      }

      if (
        element.Thema === "Umwelt und Grün" &&
        selectedTopics.includes(element.Thema)
      ) {
        Umwelt.push(element.Stadtteil);
        Umwelt_one.push(1);
        Umwelt_likes.push(element.likeCount);
      }
      if (
        element.Thema === "Versorgung" &&
        selectedTopics.includes(element.Thema)
      ) {
        Versorgung.push(element.Stadtteil);
        Versorgung_one.push(1);
        Versorgung_likes.push(element.likeCount);
      }
      if (
        element.Thema === "Sport / Freizeit" &&
        selectedTopics.includes(element.Thema)
      ) {
        Sport_Freizeit.push(element.Stadtteil);
        Sport_Freizeit_one.push(1);
        Sport_Freizeit_likes.push(element.likeCount);
      }
      if (
        element.Thema === "Sonstige" &&
        selectedTopics.includes(element.Thema)
      ) {
        Sonstige.push(element.Stadtteil);
        Sonstige_one.push(1);
        Sonstige_likes.push(element.likeCount);
      }
    });
  }

  let Rad_one_negative = Rad_one.map(
    (v) => -(Math.floor(Math.abs(v) * 100) / 100)
  );
  let Inklusion_Soziales_one_negative = Inklusion_Soziales_one.map(
    (v) => -(Math.floor(Math.abs(v) * 100) / 100)
  );
  let Verkehr_one_negative = Verkehr_one.map(
    (v) => -(Math.floor(Math.abs(v) * 100) / 100)
  );
  let Umwelt_one_negative = Umwelt_one.map(
    (v) => -(Math.floor(Math.abs(v) * 100) / 100)
  );
  let Versorgung_one_negative = Versorgung_one.map(
    (v) => -(Math.floor(Math.abs(v) * 100) / 100)
  );
  let Sport_Freizeit_one_negative = Sport_Freizeit_one.map(
    (v) => -(Math.floor(Math.abs(v) * 100) / 100)
  );
  let Sonstige_one_negative = Sonstige_one.map(
    (v) => -(Math.floor(Math.abs(v) * 100) / 100)
  );

  let stadtteile_merge = [
    ...Rad,
    ...Inklusion_Soziales,
    ...Verkehr,
    ...Umwelt,
    ...Versorgung,
    ...Sport_Freizeit,
    ...Sonstige,
  ];
  let stadtteile_unique = [...new Set(stadtteile_merge)];
  let linelength = stadtteile_unique.length - 0.5;

  let plotheight = 100 + linelength * 30;

  let data = [
    {
      alignmentgroup: true,

      legendgroup: "Rad",
      marker: {
        color: "#929df6",
      },
      name: "Rad",
      offsetgroup: "Rad",
      orientation: "h",
      showlegend: false,
      textposition: "auto",
      type: "bar",
      x: [...Rad_one_negative, ...Rad_likes],
      xaxis: "x",
      y: [...Rad, ...Rad],
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
      x: [...Inklusion_Soziales_one_negative, ...Inklusion_Soziales_likes],
      xaxis: "x",
      y: [...Inklusion_Soziales, ...Inklusion_Soziales],
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
      x: [...Verkehr_one_negative, ...Verkehr_likes],
      xaxis: "x",
      y: [...Verkehr, ...Verkehr],
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
      x: [...Umwelt_one_negative, ...Umwelt_likes],
      xaxis: "x",
      y: [...Umwelt, ...Umwelt],
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
      x: [...Versorgung_one_negative, ...Versorgung_likes],
      xaxis: "x",
      y: [...Versorgung, ...Versorgung],
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
      x: [...Sport_Freizeit_one_negative, ...Sport_Freizeit_likes],
      xaxis: "x",
      y: [...Sport_Freizeit, ...Sport_Freizeit],
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
      x: [...Sonstige_one_negative, ...Sonstige_likes],
      xaxis: "x",
      y: [...Sonstige, ...Sonstige],
      yaxis: "y",
    },
  ];
  let layout = {
    annotations: [
      {
        x: 0,
        y: linelength + 1,
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
    barmode: "relative", //   autosize: true,
    height: plotheight,
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(0,0,0,0)",

    hovermode: false,
    margin: { b: 40, l: 110, r: 0, t: 30 },
    shapes: [
      {
        line: { color: "white", width: 2 },
        type: "line",
        x0: 0,
        x1: 0,
        y0: -0.5,
        y1: linelength,
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
      tickvals: [-500, -250, -100, -50, 0, 50, 100, 250, 500],
      ticktext: ["500", "250", "100", "50", "|", "50", "100", "250", "500"],
      linecolor: "white",
    },
    yaxis: {
      anchor: "x",
      fixedrange: true,
      categoryorder: "total ascending",
      tickcolor: "white",
      ticklen: 0,
      ticks: "outside",
      title: { text: "" },
      showgrid: false,
    },
    domain: [0.0, 1.0],
    //   title: {
    //     text: "Wünsche | Stimmen",
    //     xanchor: "center",
    //     x: 0.56,
    //     y: 0.97,
    //     font: {
    //       size: 15
    //     }
    //   }
  };

  let config = {
    showLink: false,
    displayModeBar: false,
  };
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
      title={t("districts")}
      subTitle={t("districts_explained")}
      plot={plot}
    />
  );
};

export default DistrictsGraph;
