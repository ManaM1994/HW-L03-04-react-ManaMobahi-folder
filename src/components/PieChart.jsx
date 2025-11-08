import {
  Cell,
  Pie,
  PieChart,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useSelector } from "react-redux";

// #endregion
const RADIAN = Math.PI / 180;
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  if (cx == null || cy == null || innerRadius == null || outerRadius == null) {
    return null;
  }
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const ncx = Number(cx);
  const x = ncx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const ncy = Number(cy);
  const y = ncy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > ncx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${((percent ?? 1) * 100).toFixed(0)}%`}
    </text>
  );
};

export default function PieChartWithCustomizedLabel({
  isAnimationActive = true,
}) {
  const expenses = useSelector((state) => state.expenses);
  const data = [];
  const categoryMap = {};

  expenses.forEach((expense) => {
    if (categoryMap[expense.category]) {
      categoryMap[expense.category] += expense.amount;
    } else {
      categoryMap[expense.category] = expense.amount;
    }
  });
  console.log("categories", categoryMap);

  for (const category in categoryMap) {
    data.push({ name: category, value: categoryMap[category] });
  }
  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={500}>
        <PieChart>
          <Pie
            data={data}
            labelLine={false}
            label={renderCustomizedLabel}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={150}
            isAnimationActive={isAnimationActive}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${entry.name}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [`$${value}`, "Amount"]} />
          <Legend
            layout={window.innerWidth <= 768 ? "horizontal" : "vertical"}
            align={window.innerWidth <= 768 ? "center" : "right"}
            verticalAlign={window.innerWidth <= 768 ? "bottom" : "middle"}
            iconType="circle"
            wrapperStyle={
              window.innerWidth <= 768 ? { paddingTop: "20px" } : {}
            }
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
