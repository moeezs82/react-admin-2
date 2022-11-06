import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";

const FeaturedInfo = () => {
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Revanue</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$2,234</span>
          <span className="featuredMoneyRate">
            -11.3 <ArrowDownward className="featuredIcon negative" />
          </span>
        </div>
        <span className="featuredSub">Compare to Last Month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Sales</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$5,287</span>
          <span className="featuredMoneyRate">
            -1.3 <ArrowDownward className="featuredIcon negative" />
          </span>
        </div>
        <span className="featuredSub">Compare to Last Month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Costs</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$2,234</span>
          <span className="featuredMoneyRate">
            +2.3 <ArrowUpward className="featuredIcon" />
          </span>
        </div>
        <span className="featuredSub">Compare to Last Month</span>
      </div>
    </div>
  );
};

export default FeaturedInfo;
