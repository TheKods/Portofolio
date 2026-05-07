import React, { useState, useEffect, memo } from "react";
import {
  Activity,
  Cpu,
  HardDrive,
  Wifi,
  Zap,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react";

// Metric Card Component
const MetricCard = memo(
  ({ title, value, unit, icon: Icon, trend, color = "blue", description }) => {
    const getTrendIcon = () => {
      if (trend > 0) return <TrendingUp className="w-4 h-4 text-green-400" />;
      if (trend < 0) return <TrendingDown className="w-4 h-4 text-red-400" />;
      return <Minus className="w-4 h-4 text-gray-400" />;
    };

    const getTrendColor = () => {
      if (trend > 0) return "text-green-400";
      if (trend < 0) return "text-red-400";
      return "text-gray-400";
    };

    const colorClasses = {
      blue: "border-blue-500/20 bg-blue-500/10",
      green: "border-green-500/20 bg-green-500/10",
      orange: "border-orange-500/20 bg-orange-500/10",
      red: "border-red-500/20 bg-red-500/10",
      purple: "border-purple-500/20 bg-purple-500/10",
    };

    return (
      <div
        className={`bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border ${colorClasses[color]} transition-all duration-300 hover:scale-105`}
      >
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-xl ${colorClasses[color]}`}>
            <Icon className={`w-6 h-6 text-${color}-400`} />
          </div>
          {trend !== undefined && (
            <div className={`flex items-center gap-1 ${getTrendColor()}`}>
              {getTrendIcon()}
              <span className="text-sm font-medium">{Math.abs(trend)}%</span>
            </div>
          )}
        </div>

        <div className="space-y-1">
          <h3 className="text-gray-400 text-sm font-medium">{title}</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">{value}</span>
            {unit && <span className="text-gray-400 text-sm">{unit}</span>}
          </div>
          {description && (
            <p className="text-gray-500 text-xs mt-2">{description}</p>
          )}
        </div>
      </div>
    );
  },
);

// Performance Chart Component (Simplified)
const PerformanceChart = memo(({ data, title, color = "blue" }) => {
  const [animatedData, setAnimatedData] = useState(data.map(() => 0));

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedData(data);
    }, 100);
    return () => clearTimeout(timer);
  }, [data]);

  const maxValue = Math.max(...data);
  const height = 100;

  const colorClasses = {
    blue: "stroke-blue-500 fill-blue-500/20",
    green: "stroke-green-500 fill-green-500/20",
    orange: "stroke-orange-500 fill-orange-500/20",
    red: "stroke-red-500 fill-red-500/20",
  };

  // Create path for the chart
  const pathData = animatedData
    .map((value, index) => {
      const x = (index / (animatedData.length - 1)) * 100;
      const y = height - (value / maxValue) * height;
      return `${index === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");

  return (
    <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
      <h3 className="text-white font-semibold mb-4">{title}</h3>
      <div className="relative">
        <svg width="100%" height={height} className="overflow-visible">
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map((y) => (
            <line
              key={y}
              x1="0"
              y1={height - y}
              x2="100%"
              y2={height - y}
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1"
            />
          ))}

          {/* Chart area */}
          <path
            d={`${pathData} L 100 ${height} L 0 ${height} Z`}
            className={colorClasses[color]}
            strokeWidth="2"
          />

          {/* Chart line */}
          <path
            d={pathData}
            fill="none"
            className={`stroke-2 ${colorClasses[color].replace("fill-", "stroke-")}`}
          />
        </svg>

        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-gray-500 -ml-8">
          <span>{maxValue}</span>
          <span>{Math.round(maxValue * 0.5)}</span>
          <span>0</span>
        </div>
      </div>
    </div>
  );
});

// System Status Component
const SystemStatus = memo(() => {
  const [status, setStatus] = useState({
    cpu: 45,
    memory: 67,
    disk: 34,
    network: 89,
    uptime: "7d 14h 32m",
    lastUpdate: new Date(),
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStatus((prev) => ({
        ...prev,
        cpu: Math.max(10, Math.min(95, prev.cpu + (Math.random() - 0.5) * 10)),
        memory: Math.max(
          20,
          Math.min(90, prev.memory + (Math.random() - 0.5) * 5),
        ),
        disk: Math.max(10, Math.min(80, prev.disk + (Math.random() - 0.5) * 2)),
        network: Math.max(
          30,
          Math.min(100, prev.network + (Math.random() - 0.5) * 15),
        ),
        lastUpdate: new Date(),
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (value, thresholds = [70, 85]) => {
    if (value >= thresholds[1]) return "red";
    if (value >= thresholds[0]) return "orange";
    return "green";
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard
          title="CPU Usage"
          value={Math.round(status.cpu)}
          unit="%"
          icon={Cpu}
          trend={Math.random() > 0.5 ? 2.1 : -1.5}
          color={getStatusColor(status.cpu)}
          description="Current processor utilization"
        />

        <MetricCard
          title="Memory"
          value={Math.round(status.memory)}
          unit="%"
          icon={Activity}
          trend={Math.random() > 0.5 ? 1.8 : -0.9}
          color={getStatusColor(status.memory)}
          description="RAM usage across all processes"
        />

        <MetricCard
          title="Disk I/O"
          value={Math.round(status.disk)}
          unit="%"
          icon={HardDrive}
          trend={Math.random() > 0.5 ? 3.2 : -2.1}
          color={getStatusColor(status.disk)}
          description="Storage read/write activity"
        />

        <MetricCard
          title="Network"
          value={Math.round(status.network)}
          unit="%"
          icon={Wifi}
          trend={Math.random() > 0.5 ? 4.5 : -1.2}
          color={getStatusColor(status.network)}
          description="Network bandwidth utilization"
        />
      </div>

      <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold">System Uptime</h3>
          <div className="flex items-center gap-2 text-green-400">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm">Online</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-white">
              {status.uptime.split(" ")[0]}
            </div>
            <div className="text-gray-400 text-sm">Days</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">
              {status.uptime.split(" ")[1]}
            </div>
            <div className="text-gray-400 text-sm">Hours</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">
              {status.uptime.split(" ")[2]}
            </div>
            <div className="text-gray-400 text-sm">Minutes</div>
          </div>
          <div>
            <div className="text-lg text-gray-400 mt-2">
              Last updated: {status.lastUpdate.toLocaleTimeString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

// Performance Dashboard Component
export const PerformanceDashboard = memo(() => {
  // Sample performance data
  const cpuData = [45, 52, 48, 61, 55, 49, 53, 47, 51, 46, 54, 50];
  const memoryData = [67, 71, 69, 73, 68, 72, 66, 70, 65, 69, 67, 71];
  const responseTimeData = [
    120, 115, 118, 125, 112, 119, 116, 121, 114, 117, 113, 122,
  ];

  return (
    <div className="space-y-8">
      <SystemStatus />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PerformanceChart
          data={cpuData}
          title="CPU Usage Over Time"
          color="blue"
        />

        <PerformanceChart
          data={memoryData}
          title="Memory Usage Trend"
          color="green"
        />
      </div>

      <PerformanceChart
        data={responseTimeData}
        title="API Response Time (ms)"
        color="orange"
      />
    </div>
  );
});

export default {
  MetricCard,
  PerformanceChart,
  SystemStatus,
  PerformanceDashboard,
};
