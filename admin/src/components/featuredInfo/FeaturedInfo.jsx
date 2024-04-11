import "./featuredInfo.css";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useState, useEffect } from "react";
import { userRequest } from "../../requestMethod";

export default function FeaturedInfo() {
  const [income, setIncome] = useState([]);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const getIncome = async () => {
      try {
        const res = await userRequest.get("orders/monthly-income");
        setIncome(res.data);
        setPercentage((res.data[1].total * 100) / res.data[0].total - 100);
      } catch (error) {}
    };
    getIncome();
  }, []);

  console.log(percentage);

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Revanue</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">₹{income[1]?.total}</span>
          <span className="featuredMoneyRate">
            %{Math.floor(percentage)}{" "}
        {percentage < 0 ? (
          <ArrowDownwardIcon className="featuredIcon negative" />
        ) : (
          <ArrowUpwardIcon className="featuredIcon" />
        )}
        </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Sales</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">₹</span>
          <span className="featuredMoneyRate">
            -1.4 <ArrowDownwardIcon className="featuredIcon negative" />
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Cost</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney"></span>
          <span className="featuredMoneyRate">
            +2.4 <ArrowUpwardIcon className="featuredIcon" />
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
    </div>
  );
}
