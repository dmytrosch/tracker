import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import TrackerItem from "../TrackerItem/TrackerItem";
import { useSelector } from "react-redux";
import { getAllTrackersSelector } from "../../../redux/tracker/tracker.selectors";
import styles from "./TrackerList.module.css";
import { TrackerListType } from "../../../types/types";
import "./animation.css";

const TrackerList: React.FC = () => {
  const trackersList: TrackerListType = useSelector(getAllTrackersSelector);
  return (
    <>
      {trackersList.length ? (
        <TransitionGroup component="ul" className={styles.container}>
          {trackersList.map((item, index) => (
            <CSSTransition key={item.id} timeout={250} classNames="tracker">
              <TrackerItem id={item.id} order={index + 1} />
            </CSSTransition>
          ))}
        </TransitionGroup>
      ) : (
        <p>There is not added trackers</p>
      )}
    </>
  );
};

export default TrackerList;
