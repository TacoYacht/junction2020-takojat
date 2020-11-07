import React from "react";

function AaltoLogo() {
  return (
    <div className="aalto-logo"></div>
  )
}

function Navigation() {
  return (
    <div className="navigation">
    </div>
  )
}

export function Header() {
  return (
    <div className="header">
      <AaltoLogo />
      <Navigation />
    </div>
  );
}