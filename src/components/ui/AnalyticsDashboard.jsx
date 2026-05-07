import React, {
  useState,
  useEffect,
  memo,
  createContext,
  useContext,
} from "react";
import {
  Eye,
  MousePointer,
  Clock,
  Users,
  TrendingUp,
  BarChart3,
  PieChart,
  Activity,
} from "lucide-react";

// Analytics Context
const AnalyticsContext = createContext();

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error("useAnalytics must be used within an AnalyticsProvider");
  }
  return context;
};

// Analytics Provider Component
export const AnalyticsProvider = ({ children }) => {
  const [analytics, setAnalytics] = useState({
    pageViews: 0,
    uniqueVisitors: 0,
    sessionDuration: 0,
    bounceRate: 0,
    topPages: [],
    userFlow: [],
    events: [],
    realTime: {
      activeUsers: 0,
      pageViewsPerMinute: 0,
    },
  });

  // Simulate analytics data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAnalytics((prev) => ({
        ...prev,
        pageViews: prev.pageViews + Math.floor(Math.random() * 5),
        uniqueVisitors: prev.uniqueVisitors + Math.floor(Math.random() * 2),
        sessionDuration: Math.max(
          0,
          prev.sessionDuration + (Math.random() - 0.5) * 10,
        ),
        realTime: {
          activeUsers: Math.floor(Math.random() * 50) + 10,
          pageViewsPerMinute: Math.floor(Math.random() * 20) + 5,
        },
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const trackEvent = (eventName, properties = {}) => {
    const event = {
      id: Date.now(),
      name: eventName,
      properties,
      timestamp: new Date(),
    };

    setAnalytics((prev) => ({
      ...prev,
      events: [event, ...prev.events.slice(0, 99)], // Keep last 100 events
    }));
  };

  const trackPageView = (pageName) => {
    trackEvent("page_view", { page: pageName });
    setAnalytics((prev) => ({
      ...prev,
      pageViews: prev.pageViews + 1,
      topPages: prev.topPages.map((page) =>
        page.name === pageName ? { ...page, views: page.views + 1 } : page,
      ),
    }));
  };

  const value = {
    analytics,
    trackEvent,
    trackPageView,
  };

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  );
};

// Analytics Card Component
const AnalyticsCard = memo(
  ({ title, value, change, icon: Icon, color = "blue" }) => {
    const colorClasses = {
      blue: "border-blue-500/20 bg-blue-500/10 text-blue-400",
      green: "border-green-500/20 bg-green-500/10 text-green-400",
      orange: "border-orange-500/20 bg-orange-500/10 text-orange-400",
      red: "border-red-500/20 bg-red-500/10 text-red-400",
      purple: "border-purple-500/20 bg-purple-500/10 text-purple-400",
    };

    const getChangeIcon = () => {
      if (change > 0) return <TrendingUp className="w-4 h-4" />;
      if (change < 0) return <TrendingUp className="w-4 h-4 rotate-180" />;
      return <div className="w-4 h-4" />;
    };

    return (
      <div
        className={`bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border ${colorClasses[color]} transition-all duration-300 hover:scale-105`}
      >
        <div className="flex items-center justify-between mb-4">
          <Icon className="w-6 h-6" />
          <div
            className={`flex items-center gap-1 text-sm ${change >= 0 ? "text-green-400" : "text-red-400"}`}
          >
            {getChangeIcon()}
            {Math.abs(change)}%
          </div>
        </div>

        <div>
          <div className="text-2xl font-bold text-white mb-1">{value}</div>
          <div className="text-gray-400 text-sm">{title}</div>
        </div>
      </div>
    );
  },
);

// Real-time Activity Feed
const ActivityFeed = memo(() => {
  const { analytics } = useAnalytics();
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    // Generate sample activities based on events
    const sampleActivities = [
      {
        type: "page_view",
        message: "Someone viewed your portfolio",
        time: "2 min ago",
      },
      {
        type: "click",
        message: "User clicked on Projects section",
        time: "5 min ago",
      },
      {
        type: "contact",
        message: "New contact form submission",
        time: "8 min ago",
      },
      {
        type: "scroll",
        message: "Visitor scrolled to Skills section",
        time: "12 min ago",
      },
      { type: "download", message: "Resume downloaded", time: "15 min ago" },
    ];

    setActivities(sampleActivities);
  }, [analytics.events]);

  return (
    <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
      <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
        <Activity className="w-5 h-5" />
        Real-time Activity
      </h3>

      <div className="space-y-3 max-h-64 overflow-y-auto">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-3 bg-gray-800/50 rounded-lg"
          >
            <div
              className={`w-2 h-2 rounded-full mt-2 ${
                activity.type === "page_view"
                  ? "bg-blue-400"
                  : activity.type === "click"
                    ? "bg-green-400"
                    : activity.type === "contact"
                      ? "bg-purple-400"
                      : activity.type === "scroll"
                        ? "bg-orange-400"
                        : "bg-red-400"
              }`}
            ></div>

            <div className="flex-1">
              <div className="text-white text-sm">{activity.message}</div>
              <div className="text-gray-400 text-xs">{activity.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

// Traffic Sources Chart (Simplified Pie Chart)
const TrafficSources = memo(() => {
  const sources = [
    { name: "Direct", value: 45, color: "#3b82f6" },
    { name: "Search", value: 30, color: "#10b981" },
    { name: "Social", value: 15, color: "#f59e0b" },
    { name: "Referral", value: 10, color: "#ef4444" },
  ];

  const total = sources.reduce((sum, source) => sum + source.value, 0);
  let currentAngle = -90; // Start from top

  return (
    <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
      <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
        <PieChart className="w-5 h-5" />
        Traffic Sources
      </h3>

      <div className="flex items-center gap-6">
        <div className="relative">
          <svg width="120" height="120" className="transform -rotate-90">
            {sources.map((source, index) => {
              const angle = (source.value / total) * 360;
              const startAngle = currentAngle;
              const endAngle = currentAngle + angle;

              const startAngleRad = (startAngle * Math.PI) / 180;
              const endAngleRad = (endAngle * Math.PI) / 180;

              const x1 = 60 + 50 * Math.cos(startAngleRad);
              const y1 = 60 + 50 * Math.sin(startAngleRad);
              const x2 = 60 + 50 * Math.cos(endAngleRad);
              const y2 = 60 + 50 * Math.sin(endAngleRad);

              const largeArcFlag = angle > 180 ? 1 : 0;

              const pathData = [
                `M 60 60`,
                `L ${x1} ${y1}`,
                `A 50 50 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                `Z`,
              ].join(" ");

              currentAngle = endAngle;

              return (
                <path
                  key={index}
                  d={pathData}
                  fill={source.color}
                  className="transition-all duration-300 hover:opacity-80"
                />
              );
            })}
          </svg>
        </div>

        <div className="flex-1 space-y-2">
          {sources.map((source) => (
            <div
              key={source.name}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: source.color }}
                ></div>
                <span className="text-white text-sm">{source.name}</span>
              </div>
              <span className="text-gray-400 text-sm">{source.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

// Top Pages Component
const TopPages = memo(() => {
  const { analytics } = useAnalytics();

  const pages = [
    { name: "Home", views: 1250, change: 12 },
    { name: "Portfolio", views: 890, change: 8 },
    { name: "About", views: 654, change: -3 },
    { name: "Contact", views: 432, change: 15 },
    { name: "Blog", views: 321, change: 22 },
  ];

  return (
    <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
      <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
        <BarChart3 className="w-5 h-5" />
        Top Pages
      </h3>

      <div className="space-y-3">
        {pages.map((page, index) => (
          <div
            key={page.name}
            className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center text-sm font-medium text-gray-300">
                {index + 1}
              </div>
              <div>
                <div className="text-white text-sm font-medium">
                  {page.name}
                </div>
                <div className="text-gray-400 text-xs">{page.views} views</div>
              </div>
            </div>

            <div
              className={`flex items-center gap-1 text-sm ${
                page.change >= 0 ? "text-green-400" : "text-red-400"
              }`}
            >
              <TrendingUp
                className={`w-3 h-3 ${page.change < 0 ? "rotate-180" : ""}`}
              />
              {Math.abs(page.change)}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

// Main Analytics Dashboard
export const AnalyticsDashboard = memo(() => {
  const { analytics } = useAnalytics();

  return (
    <div className="space-y-8">
      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <AnalyticsCard
          title="Page Views"
          value={analytics.pageViews.toLocaleString()}
          change={12.5}
          icon={Eye}
          color="blue"
        />

        <AnalyticsCard
          title="Unique Visitors"
          value={analytics.uniqueVisitors.toLocaleString()}
          change={8.2}
          icon={Users}
          color="green"
        />

        <AnalyticsCard
          title="Avg. Session"
          value={`${Math.round(analytics.sessionDuration)}s`}
          change={-2.1}
          icon={Clock}
          color="orange"
        />

        <AnalyticsCard
          title="Active Users"
          value={analytics.realTime.activeUsers}
          change={15.3}
          icon={MousePointer}
          color="purple"
        />
      </div>

      {/* Charts and Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TrafficSources />
        <TopPages />
      </div>

      {/* Activity Feed */}
      <ActivityFeed />
    </div>
  );
});

export default {
  AnalyticsProvider,
  AnalyticsDashboard,
  useAnalytics,
};
