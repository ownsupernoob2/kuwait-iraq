import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../invasion.css";

const Invasion = ({ goToNextPage }) => {
  return (
    <div className="conflict-overview">
      <h2 style={{ fontSize: 50, fontWeight: "600" }}>The Invasion</h2>
      <div className="info-container">
        <div className="info-img">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Kuwait_burn_oilfield.png/1280px-Kuwait_burn_oilfield.png" />
       <p style={{color:'grey'}}>Iraq's fleeding soldiers burned oil fields that lasted for months</p>
        </div>
        <div className="bio-content">
          <p>
            Kuwait and UAE decreased their oil production to 1.5 million barrels
            per day by request of the OPEC after Iraq complained. But even
            though the oil production was lowered for Iraq's sake, they decided
            to invade Kuwait 2 in the morning, August 2, 1990. In a few hours,
            Kuwait government leaders ran to Saudi Arabia to seek refuge.
            Civilians fought back but most got killed. In 2 days Iraq gained
            control of the capital, Kuwait City, which in turn made iraq control
            20% of the global oil supply. Iraq now also controls a good chunk of
            the Persian Gulf for trades and sent out people to loot Kuwait which
            stole a lot of it's wealth. This became a huge win for Iraq and
            Hussein. Kuwait now became Iraq's 19th province. Around 1,000
            Kuwaiti residents and civilians were killed. Half of the population
            fled the country which included thousands of international
            residents. Arab countries have alot of cheap labour coming from
            asian countries especially India. India evacuated 170,000 indians
            via 488 flights in only 2 months.
          </p>
        </div>
      </div>
        <h2 style={{ fontSize: 50, fontWeight: "600" }}>World in shock</h2>
        <p>
          in August 6th, 1990, the United Nations Security Council acted fast,
          stopping any other countries from trading with Iraq, froze Iraq's
          assets abroad and restricted thir access to military and financial
          support. They demanded that Iraq retreat from Kuwait but Iraq denied.
          Because Iraq denied, USA launched Operation Desert Shield which was
          sent to the Gulf region to protect and prepare for any military
          action.
          <br />
          And on January 17, 1991, Operation Desert Storm, a massive military
          capaign was launched to liberate Kuwait, This war lasted for a month
          until the coalition forces sucessfully removed Iraqi troops from
          Kuwait. Because the coalition was so powerful, Iraqi forces got
          overwhelemed on the ground and in the air but Saddam Hussein is stil
          in Power.
        </p>
        <p style={{paddingTop: 20,cursor: 'pointer', fontSize: 20, fontWeight: 'bold'}} onClick={goToNextPage}>The Aftermath</p>
    </div>
  );
};

export default Invasion;
