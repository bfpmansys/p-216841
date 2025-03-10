import React, { useState, useEffect } from "react";
import { FilterTabs } from "./FilterTabs";
import { TableRow } from "./TableRow";
import { toast } from "@/hooks/use-toast";
import { SearchBar } from "./Searchbar";

// Mock data for different user types
const allUsers = [
  {
    id: "25-0001",
    name: "Dizon, Sandarah Sia",
    email: "sandarah.dizon@gmail.com",
    business: "Edge Ent - 012345678",
    status: "Pending",
    userType: "EST. OWNERS",
  },
  {
    id: "25-0002",
    name: "Santos, Maria Cruz",
    email: "maria.santos@gmail.com",
    business: "Fire Safety Bureau - District 1",
    status: "Active",
    userType: "FIRE INSPECTOR",
  },
  {
    id: "25-0003",
    name: "Reyes, Juan Carlos",
    email: "juan.reyes@gmail.com",
    business: "System Administration",
    status: "Active",
    userType: "ADMIN",
  },
  {
    id: "25-0004",
    name: "Lee, Jennifer Kim",
    email: "jennifer.lee@gmail.com",
    business: "Sunshine Cafe - 23456789, Bright Bakery - 34567890, Star Restaurant - 45678901",
    status: "Pending",
    userType: "EST. OWNERS",
  },
  {
    id: "25-0005",
    name: "Garcia, Roberto Jr.",
    email: "roberto.garcia@gmail.com",
    business: "Fire Safety Bureau - District 2",
    status: "Pending",
    userType: "FIRE INSPECTOR",
  },
  {
    id: "25-0006",
    name: "Torres, Amanda Mae",
    email: "amanda.torres@gmail.com",
    business: "User Management",
    status: "Active",
    userType: "ADMIN",
  },
];

export const UserAccountsTable = () => {
  const [activeTab, setActiveTab] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState(allUsers);
  const [filteredUsers, setFilteredUsers] = useState(allUsers);

  // Filter users based on active tab and search term
  useEffect(() => {
    let result = [...users];
    
    // Filter by tab
    if (activeTab !== "ALL") {
      result = result.filter(user => user.userType === activeTab);
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        user =>
          user.name.toLowerCase().includes(term) ||
          user.email.toLowerCase().includes(term) ||
          user.business.toLowerCase().includes(term) ||
          user.id.toLowerCase().includes(term)
      );
    }
    
    setFilteredUsers(result);
  }, [activeTab, searchTerm, users]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleDelete = (id: string) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const handleStatusChange = (id: string, newStatus: string) => {
    setUsers(
      users.map(user => 
        user.id === id ? { ...user, status: newStatus } : user
      )
    );
  };

  return (
    <div className="flex-1 overflow-hidden bg-[#FFECDB] m-[30px] rounded-2xl shadow-lg">
      <div className="text-white text-2xl font-bold h-[83px] bg-[#FE623F] rounded-[16px_16px_0_0] flex items-center px-6">
        USER ACCOUNTS
      </div>

      <div className="flex justify-between items-center p-5 max-sm:flex-col max-sm:gap-5">
        <FilterTabs activeTab={activeTab} onTabChange={handleTabChange} />
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="shadow-[5px_4px_4px_rgba(0,0,0,0.25)] bg-white m-5 p-5 rounded-[10px] overflow-auto">
        <div className="grid grid-cols-[40px_100px_200px_200px_300px_100px_1fr] items-center font-semibold text-base px-0 py-2.5 border-b-2 border-gray-200 max-md:grid-cols-[40px_80px_150px_150px_200px_100px_1fr] max-md:text-sm max-sm:grid-cols-[40px_80px_120px_120px_150px_80px_1fr] max-sm:text-xs">
          <div className="flex justify-center">
            <input type="checkbox" aria-label="Select all rows" />
          </div>
          <div>ID NO</div>
          <div>
            <span>FULL NAME</span>
            <br />
            <span className="text-xs text-gray-500">( LN, FN, MN )</span>
          </div>
          <div>EMAIL ADDRESS</div>
          <div>
            {activeTab === "EST. OWNERS" 
              ? "BUSINESS NAME(S) - DTI CERT NO." 
              : activeTab === "FIRE INSPECTOR" 
                ? "STATION ASSIGNMENT" 
                : activeTab === "ADMIN" 
                  ? "ROLE" 
                  : "BUSINESS NAME - DTI CERT NO."}
          </div>
          <div className="text-center">STATUS</div>
          <div className="text-center">ACTIONS</div>
        </div>

        <div>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user, index) => (
              <TableRow 
                key={index} 
                {...user} 
                onDelete={handleDelete}
                onStatusChange={handleStatusChange}
              />
            ))
          ) : (
            <div className="py-8 text-center text-gray-500">
              No users found matching your criteria
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
