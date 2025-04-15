import { data } from "react-router-dom"
import { 
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  ResponsiveContainer
} from "recharts"

const MoodCharts = ({ data }) => {
    const COLORS = ["#FFD700", "#FF69B4", "#1E90FF", "#FF4500", "#32CD32", "#9370DB"];
    
    const chartData = data.map((stat) => ({
        mood: stat._id.mood,
        count: stat.count,
        color: COLORS[stat._id.mood]
    }));

    return (
      <div className="mood-charts-wrapper">
      <h3>Mood Stats - Bar Chart</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mood" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8">
            {chartData.map((entry, index) => (
              <cell
                key={`cell-${index}`}
                fill={entry.color || "#8884d8"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <h3>Mood Stats - Line Chart</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mood" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="count" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

    
    export default MoodCharts;
