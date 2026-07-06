import { isMobile } from "react-device-detect";
import classes from "./Skeleton.module.css";

const SkeletonCard = () => {
  if (isMobile) {
    return (
      <div className={classes.skeleton_card_mobile}>
        <div className={`${classes.shimmer} ${classes.line_title}`} />
        <div className={classes.skeleton_row}>
          <div className={`${classes.shimmer} ${classes.box}`} />
          <div className={`${classes.shimmer} ${classes.box}`} />
        </div>
        <div className={classes.skeleton_row}>
          <div className={`${classes.shimmer} ${classes.box}`} />
          <div className={`${classes.shimmer} ${classes.box}`} />
        </div>
        <div className={classes.skeleton_row}>
          <div className={`${classes.shimmer} ${classes.circle}`} />
          <div className={`${classes.shimmer} ${classes.circle}`} />
        </div>
      </div>
    );
  }

  return (
    <div className={classes.skeleton_card}>
      <div className={`${classes.shimmer} ${classes.line_date}`} />
      <div className={`${classes.shimmer} ${classes.line_small}`} />
      <div className={`${classes.shimmer} ${classes.circle}`} />
      <div className={classes.temp_row}>
        <div className={`${classes.shimmer} ${classes.temp_box}`} />
        <div className={`${classes.shimmer} ${classes.temp_box}`} />
      </div>
      <div className={`${classes.shimmer} ${classes.circle_small}`} />
      <div className={`${classes.shimmer} ${classes.line_small}`} />
    </div>
  );
};

const SkeletonList = ({ count = 7 }) => {
  const cards = Array.from({ length: count });

  if (isMobile) {
    return (
      <div className={classes.skeleton_list_mobile}>
        {cards.map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className={classes.skeleton_list}>
      {cards.map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
};

export default SkeletonList;
