import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

export const AdminEstablishmentCard: React.FC = () => {
  // Sample data for District 1
  const district1Data = [
    { name: "Residential", value: 35, color: "#9b87f5" },
    { name: "Commercial", value: 45, color: "#F97316" },
    { name: "Industrial", value: 20, color: "#0EA5E9" },
  ];
  
  // Sample data for District 2
  const district2Data = [
    { name: "Residential", value: 40, color: "#9b87f5" },
    { name: "Commercial", value: 30, color: "#F97316" },
    { name: "Industrial", value: 30, color: "#0EA5E9" },
  ];
  
  // Custom Legend component to match the design
  const CustomLegend = () => (
    <div className="flex justify-center gap-8 mt-5">
      {district1Data.map((entry, index) => (
        <div key={`legend-${index}`} className="flex items-center">
          <div 
            className="w-3 h-3 rounded-sm mr-2" 
            style={{ backgroundColor: entry.color }} 
          />
          <span className="text-sm">{entry.name}</span>
        </div>
      ))}
    </div>
  );

  return (
    <section className="shadow-[0_4px_4px_rgba(0,0,0,0.25)] bg-white mt-5 p-10 rounded-2xl max-sm:p-5">
      <h2 className="text-black text-xl font-bold text-center mb-10 max-sm:text-lg">
        BFP NCR - VALENZUELA CITY ESTABLISHMENTS
      </h2>
      
      <div className="flex justify-around mx-0 my-10 max-md:flex-col max-md:items-center">
        <div className="text-center">
          <div className="text-black text-xl font-semibold mb-4">DISTRICT 1</div>
          <div className="h-[220px] w-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={district1Data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  fill="#8884d8"
                  paddingAngle={2}
                  dataKey="value"
                  label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
                    return (
                      <text 
                        x={x} 
                        y={y} 
                        fill="white" 
                        textAnchor="middle" 
                        dominantBaseline="central"
                        fontSize={12}
                        fontWeight="bold"
                      >
                        {`${(percent * 100).toFixed(0)}%`}
                      </text>
                    );
                  }}
                >
                  {district1Data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-black text-xl font-semibold mb-4">DISTRICT 2</div>
          <div className="h-[220px] w-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={district2Data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  fill="#8884d8"
                  paddingAngle={2}
                  dataKey="value"
                  label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
                    return (
                      <text 
                        x={x} 
                        y={y} 
                        fill="white" 
                        textAnchor="middle" 
                        dominantBaseline="central"
                        fontSize={12}
                        fontWeight="bold"
                      >
                        {`${(percent * 100).toFixed(0)}%`}
                      </text>
                    );
                  }}
                >
                  {district2Data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <CustomLegend />
    </section>
  );
};