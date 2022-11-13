import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethod";

const FeaturedInfo = () => {
  const [income, setIncome] = useState([]);
  const [perc, setPerc] = useState([]);

  useEffect(() => {
    const getIncome = async () => {
      try {
        const res = await userRequest.get("order/income");
        setIncome(res.data.income);
        setPerc(
          (res.data.income["current_month"] * 100) /
            res.data.income["last_month"] -
            100
        );
      } catch (error) {}
    };
    getIncome();
  }, []);

  // console.log(perc)

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Revanue</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">${income["current_month"]}</span>
          <span className="featuredMoneyRate">
            %{Math.floor(perc)}{" "}
            {perc < 0 ? (
              <ArrowDownward className="featuredIcon negative" />
            ) : (
              <ArrowUpward className="featuredIcon" />
            )}
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
