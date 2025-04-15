import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const MoodPieChart = ({ data }) => {

    const COLORS = ["#FFD700", "#FF69B4", "#1E90FF", "#FF4500", "#32CD32", "#9370DB"];

    const chartData = Object.entries(data).map(([mood,count]) => ({
      name: mood,
      value:count,
    }));

    return (
        <div className="mood-chart">
          <h3>Your Mood Overview</h3>
          <PieChart width={300} height={300}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {data.map((entry, index) => (
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