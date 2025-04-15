import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const MoodPieChart = ({ data }) => {

    const COLORS = ["#FFD700", "#FF69B4", "#1E90FF", "#FF4500", "#32CD32", "#9370DB"];

    const chartData = data.map((stat) => ({
      name: stat._id.mood,
      value: stat.count,
    }));

    return (
        <div className="mood-chart">
          <h3>Your Mood Overview</h3>
          <PieChart width={300} height={300}>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      );
    };
    
    export default MoodPieChart;