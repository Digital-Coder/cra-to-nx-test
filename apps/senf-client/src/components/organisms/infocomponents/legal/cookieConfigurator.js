/** @format */

import React, { useState, useEffect } from "react";

import Cookies from "universal-cookie";
import { CustomIconButton } from "../../../atoms/CustomButtons/CustomButton";
import styled from "styled-components";
import LogoWhite from "../../../../images/logo_white.png";

import Switch from "../../../atoms/CustomButtons/Switch";

// "shared styles" component in legal folder
// TO DO: take care of the function handleLocation

const cookies = new Cookies();

const ListItem = styled.p`
  padding-bottom: 0;
  margin-top: 0;
`;

const ListTitle = styled.h3`
  padding-bottom: 0;
  margin-bottom: 0;
`;

const Line = styled.div`
  height: 1px;
  width: 100%;
  background-color: #414345;
`;

const Header = styled.h2`
  width: auto;
  top: 0;
`;

const Wrapper = styled.div`
  position: relative;
  z-index: 0;
  width: 90vw;
  height: 100%;
  margin: auto;
  max-width: 600px;
  margin-top: 30vh;
`;

const Logo = styled.h1`
  position: relative;
  top: 0em;
  left: 0vw;
`;
const HeaderSwitchWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CookieConfigurator = ({ classes }) => {
  const [necessary, setNecessary] = useState(true);
  const [location, setLocation] = useState(false);

  useEffect(() => {
    if (cookies.get("Cookie_settings") !== "all") {
      setLocation(false);
    }
    if (cookies.get("Cookie_settings") === "all") {
      setLocation(true);
    }
  }, []);

  const handleLocation = () => {
    setLocation(!location);

    if (location === false) {
      cookies.set("Cookie_settings", "all", {
        path: "/",
        maxAge: 60 * 60 * 24 * 90,
        sameSite: "none",
        secure: true,
      });
    }
    if (location === true) {
      cookies.set("Cookie_settings", "minimum", {
        path: "/",
        maxAge: 60 * 60 * 24 * 90,
        sameSite: "none",
        secure: true,
      });
    }
  };

  const linkToHome = () => {
    window.location.href = "/";
  };

  return (
    <div>
      {/* <div className="MainBackground"></div> */}

      <CustomIconButton
        name="Close"
        position="fixed"
        margin={document.body.clientWidth > 768 ? "40px" : "10px"}
        left="0"
        handleButtonClick={() => linkToHome()}
        top="0"
      />

      <Wrapper>
        <Logo onClick={() => linkToHome()}>
          <img src={LogoWhite} width="100px" alt="logo" />
        </Logo>
        <br />
        <br /> <br />
        <h1>Cookie Richtlinie</h1>
        <h2>Cookie-Konfigurator</h2>
        <p>
          Dieses Tool ermöglicht es dir, verschiedene Cookie-Kategorien zu
          aktivieren. Du kannst die Einstellungen jederzeit ändern.
        </p>
        <HeaderSwitchWrapper style={{ pointerEvents: "none" }}>
          <Header>Notwendige Cookies</Header>
          <Switch
            id="test-switch"
            toggled={necessary}
            onChange={(e) => setNecessary(e.target.checked)}
          />
        </HeaderSwitchWrapper>
        <p>
          Notwendige Cookies helfen dabei, eine Website nutzbar zu machen, indem
          sie Grundfunktionen wie Seitennavigation und Zugriff auf sichere
          Bereiche der Website ermöglichen. Die Website kann ohne diese Cookies
          nicht richtig funktionieren. Sie können nicht blockiert werden.
        </p>
        <Line />
        <ListTitle>Anbieter</ListTitle> <ListItem>Senf</ListItem>
        <ListTitle>Name</ListTitle> <ListItem>Cookie_settings</ListItem>
        <ListTitle>Zweck</ListTitle>{" "}
        <ListItem>Speichert sämtliche Cookie Präferenzen des Nutzers</ListItem>
        <ListTitle>Speicherdauer</ListTitle> <ListItem>3 Monate</ListItem>
        <Line />
        <ListTitle>Anbieter</ListTitle> <ListItem>Senf</ListItem>
        <ListTitle>Name</ListTitle> <ListItem>Cookie_Rules</ListItem>
        <ListTitle>Zweck</ListTitle>{" "}
        <ListItem>
          Speichert, dass Nutzer den Regeln des Ideen-teilens zugestimmt haben.
        </ListItem>
        <ListTitle>Speicherdauer</ListTitle> <ListItem>3 Monate</ListItem>
        <HeaderSwitchWrapper>
          <Header>Service-verbessernde-Cookies</Header>
          <Switch
            id="test-switch2"
            toggled={location}
            onChange={handleLocation}
          />
        </HeaderSwitchWrapper>
        <p>
          Die Service verbessernden Cookies erlauben es, dass sowohl Funktionen
          wie der Kartendienst oder auch die Analyse der Ergebnisse geschehen
          kann.
        </p>
        <Line />
        <ListTitle>Anbieter</ListTitle> <ListItem>Senf</ListItem>
        <ListTitle>Name</ListTitle> <ListItem>_ga</ListItem>
        <ListTitle>Zweck</ListTitle>{" "}
        <ListItem>Google Analytics-Cookie zur Benutzeridentifizierung</ListItem>
        <ListTitle>Speicherdauer</ListTitle> <ListItem>2 Jahre</ListItem>
        <Line />
        <ListTitle>Anbieter</ListTitle> <ListItem>Senf</ListItem>
        <ListTitle>Name</ListTitle> <ListItem>_gid</ListItem>
        <ListTitle>Zweck</ListTitle>{" "}
        <ListItem>Google Analytics-Cookie zur Benutzeridentifizierung</ListItem>
        <ListTitle>Speicherdauer</ListTitle> <ListItem>24 Stunden</ListItem>
        <Line />
        <ListTitle>Anbieter</ListTitle> <ListItem>Senf</ListItem>
        <ListTitle>Name</ListTitle> <ListItem>_gat</ListItem>
        <ListTitle>Zweck</ListTitle>{" "}
        <ListItem>Drosselung der Anforderungsrate</ListItem>
        <ListTitle>Speicherdauer</ListTitle> <ListItem>1 Minute</ListItem>
        <Line />
        <ListTitle>Anbieter</ListTitle> <ListItem>Google</ListItem>
        <ListTitle>Name</ListTitle> <ListItem>1P_JAR</ListItem>
        <ListTitle>Zweck</ListTitle>{" "}
        <ListItem>
          Wird zur Optimierung von Werbung von Google DoubleClick eingesetzt, um
          für Nutzer relevante Anzeigen bereitzustellen, Berichte zur
          Kampagnenleistung zu verbessern oder um zu vermeiden, dass ein Nutzer
          dieselben Anzeigen mehrmals sieht.
        </ListItem>
        <ListTitle>Speicherdauer</ListTitle> <ListItem>1 Monat</ListItem>
        <Line />
        <ListTitle>Anbieter</ListTitle> <ListItem>Google</ListItem>
        <ListTitle>Name</ListTitle> <ListItem>NID</ListItem>
        <ListTitle>Zweck</ListTitle>{" "}
        <ListItem>
          Das NID-Cookie enthält eine eindeutige ID, über die Google Ihre
          bevorzugten Einstellungen und andere Informationen speichert,
          insbesondere Ihre bevorzugte Sprache (z. B. Deutsch), wie viele
          Suchergebnisse pro Seite angezeigt werden sollen (z. B. 10 oder 20)
          und ob der Google SafeSearch-Filter
        </ListItem>
        <ListTitle>Speicherdauer</ListTitle> <ListItem>6 Monate</ListItem>
        <Line />
        <ListTitle>Anbieter</ListTitle> <ListItem>Google</ListItem>
        <ListTitle>Name</ListTitle> <ListItem>CONSENT</ListItem>
        <ListTitle>Zweck</ListTitle>{" "}
        <ListItem>
          Speichert deine Bestätigung zur Verwendung der Cookies für die
          Standort-Ermittlung
        </ListItem>
        <ListTitle>Speicherdauer</ListTitle> <ListItem>18 Jahre</ListItem>
      </Wrapper>
    </div>
  );
};

export default CookieConfigurator;
