import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles.css";
import "../aftermath.css";

const Aftermath = ({ goToNextPage }) => {
  return (
    <>
      <header className={`header2`}>
        <div className="header-content">
          <h1 className="title">Aftermath</h1>
          <h2 className="subtitle">Short and long lasting impacts</h2>
        </div>
      </header>

      <main className="bio-section">
        <h3>Impact on Kuwait</h3>
        <div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75 }}
          className="bio-content"
        >
          <p>
            The invasion was fast but damaging to Kuwait, 1,000 Kuwaitis died,
            400,000 foreign residents left Kuwait <a href="https://www.worldatlas.com/articles/invasion-of-kuwait-why-did-iraq-invade-kuwait.html">(according to worldatlas.com)</a>. Infrastructure damage was big
            too, roads, houses, buildings but especially oil fields (shown in
            the picture above) Iraq set oil fields on fire when they were
            retreating which caused oil spills and burned for months which in
            turn damaged Kuwait economy. Because the foreign workers left,
            rebuilding was costly and also affected the economy as said by the
            Britannica, "the invasion and subsequent occupation resulted in
            severe destruction and loss of life". Not to mention the countless
            of people who suffered physically from being detained, tortured and
            killed, and emotionally for th epoeple who lost their loved ones.
          </p>
          <h3>Impact on Iraq</h3>
          <p>
            The effects from the invasion didn't just affect Kuwaiti but also
            Iraq who faced strong economic sanction from the UN that lasted for
            10 years. This hurt Iraq's economy, causing many people to live in
            poverty and everyday necessity became hard to come by in Iraq. The
            U.S. military aso stayed in the Gulf region for a long time. This
            presence increased tensions and contributed to anti-American
            feelings.
          </p>
          <p>
            Because Iraq was sanctioned for a long time and U.S. presence felt
            like imperialism, terrorist groups became bigger in numbers. For
            example Al-Qaeda grew from using people being angry and providing
            revenge. In turn, this contributed to the 9/11 Attack. In addition,
            the unresolved issues from the Gulf War and Iraq refusual to follow
            international rules led to the invasion of Iraq in 2003 this created
            a cycle of suffering, conflict and problems that not only affecting
            Iraq but also Middle East today.
          </p>
          <h3>Bilbography</h3>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <a href="https://www.history.com/this-day-in-history/iraq-invades-kuwait#:~:text=On%20August%202,%201990,%20at%20about%202%20a.m.%20local%20time,">
              Iraq invades Kuwait - History.com
            </a>
            <a href="https://www.britannica.com/summary/Persian-Gulf-War#:~:text=Persian%20Gulf%20War,%20or%20Gulf%20War,%20(1990%E2%80%9391)%20International%20conflict%20triggered">
              Persian Gulf War summary - Britannica
            </a>
            <a href="https://www.history.com/topics/middle-east/persian-gulf-war#:~:text=The%20Persian%20Gulf%20War,%20also%20known%20as%20Operation%20Desert%20Storm">
              Persian Gulf War - History.com
            </a>
            <a href="https://peacekeeping.un.org/mission/past/unikom/background.html#:~:text=On%202%20August%201990,%20Iraq%20invaded%20and%20occupied%20Kuwait.On%20the">
              Iraq/Kuwait - UNIKOM
            </a>
            <a href="https://www.worldatlas.com/articles/invasion-of-kuwait-why-did-iraq-invade-kuwait.html">
               Why Did Iraq Invade Kuwait In 1990? - World Atlas 
            </a>
            <a href="https://www.aljazeera.com/news/2020/8/1/thirty-years-on-iraqs-invasion-of-kuwait-still-haunts-region#:~:text=In%20the%20early%20hours%20of%20August%202,%201990,%20Iraq%E2%80%99s%20army">
              Thirty years on, Iraq’s invasion of Kuwait still haunts region -
              Al-Jazeera
            </a>
            <a href="https://en.wikipedia.org/wiki/Iraqi_invasion_of_Kuwait#:~:text=The%20Iraqi%20invasion%20of%20Kuwait%20began%20on%202%20August%201990#:~:text=The%20Iraqi%20invasion%20of%20Kuwait%20began%20on%202%20August%201990">
              All images were provided from Wikipedia
            </a>
          </div>
        </div>
      </main>
    </>
  );
};
export default Aftermath;
