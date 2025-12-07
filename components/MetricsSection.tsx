import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';

const usageData = [
  { month: 'Sep', visitors: 120, events: 4 },
  { month: 'Oct', visitors: 250, events: 8 },
  { month: 'Nov', visitors: 400, events: 12 },
  { month: 'Dec', visitors: 380, events: 10 },
  { month: 'Jan', visitors: 550, events: 15 },
  { month: 'Feb', visitors: 800, events: 20 },
];

const satisfactionData = [
  { group: 'Students', score: 88 },
  { group: 'Teachers', score: 92 },
  { group: 'Parents', score: 85 },
  { group: 'Community', score: 80 },
];

const MetricsSection: React.FC = () => {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-bcc-purple sm:text-4xl">Measuring Success</h2>
           <div className="w-20 h-1 bg-bcc-gold mt-4 rounded-full"></div>
          <p className="mt-4 text-xl text-slate-600 max-w-3xl">
            We use data-driven insights to ensure The Learning Commons effectively engages our community and enhances academic outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Usage Growth Chart */}
          <div className="bg-slate-50 p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-6">Projected Visitor Growth (First Semester)</h3>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={usageData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="visitors" stroke="#522e91" strokeWidth={3} activeDot={{ r: 8, fill: '#fcc906' }} name="Monthly Visitors" />
                  <Line type="monotone" dataKey="events" stroke="#fcc906" strokeWidth={3} name="Hosted Events" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Satisfaction Chart */}
          <div className="bg-slate-50 p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-6">Stakeholder Satisfaction Goals</h3>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={satisfactionData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="group" stroke="#64748b" />
                  <YAxis domain={[0, 100]} stroke="#64748b" />
                  <Tooltip 
                     cursor={{ fill: '#f1f5f9' }}
                     contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                  />
                  <Bar dataKey="score" fill="#522e91" radius={[4, 4, 0, 0]} name="Satisfaction Score (%)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 border-l-4 border-bcc-purple bg-white shadow-sm rounded-r-xl text-center">
                <div className="text-4xl font-bold text-bcc-purple mb-2">90%</div>
                <div className="text-slate-600 font-bold uppercase text-sm tracking-wide">Student Engagement</div>
                <p className="text-sm text-slate-400 mt-1">Target for positive feedback</p>
            </div>
            <div className="p-6 border-l-4 border-bcc-gold bg-white shadow-sm rounded-r-xl text-center">
                <div className="text-4xl font-bold text-bcc-gold mb-2">50+</div>
                <div className="text-slate-600 font-bold uppercase text-sm tracking-wide">Monthly Workshops</div>
                <p className="text-sm text-slate-400 mt-1">Across all grade levels</p>
            </div>
            <div className="p-6 border-l-4 border-bcc-purple bg-white shadow-sm rounded-r-xl text-center">
                <div className="text-4xl font-bold text-bcc-purple mb-2">24/7</div>
                <div className="text-slate-600 font-bold uppercase text-sm tracking-wide">Virtual Access</div>
                <p className="text-sm text-slate-400 mt-1">Resources always available</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default MetricsSection;