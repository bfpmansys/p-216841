import React, { useState, useEffect } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { toast } from "@/components/ui/use-toast";
import { Application, ApplicationStatus, ApplicationType, FilterOption, InspectionSchedule } from "@/types/applications";
import { ApplicationTypeSelector } from "@/components/applications/ApplicationTypeSelection";
import { InspectionModal } from "@/components/applications/InspectionModal";
import { FilterGroup } from "@/components/applications/FilterGroup";
import { ApplicationsTable } from "@/components/applications/ApplicationsTable";
import { SearchBar } from "@/components/applications/SearchBar";
import { AdminSidebar } from "@/components/dashboard/AdminSidebar";
import { AdminHeader } from "@/components/dashboard/AdminHeader";

const AdminApplications = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAppType, setSelectedAppType] = useState<ApplicationType>("FSIC_OCCUPANCY");
  const [filters, setFilters] = useState<FilterOption[]>([
    { id: "1", label: "UNSCHEDULED", value: "UNSCHEDULED", isActive: true },
    { id: "2", label: "FOR INSPECTION", value: "FOR_INSPECTION" },
    { id: "3", label: "INSPECTED", value: "INSPECTED" },
    { id: "4", label: "REJECTED", value: "REJECTED" },
    { id: "5", label: "FOR ISSUANCE", value: "FOR_ISSUANCE" },
  ]);

  const [applications, setApplications] = useState<Application[]>([
    {
      id: "1",
      applicationNo: "25-0001",
      date: "March 1, 2025",
      time: "11:57:05 AM",
      establishmentName: "Sandarah Dizon Enterprises Corporation",
      establishmentOwner: "Sandarah S. Dizon",
      establishmentType: "Industrial",
      contactNo: "09123456789",
      status: "UNSCHEDULED",
      emailAddress: "dddd@gmail.com",
      typeOfOccupancy: "Educational",
      totalFloorArea: "50",
      noOfStory: "3",
      noOfOccupants: "100",
      telephoneNo: "01234567899"
    },
    {
      id: "2",
      applicationNo: "25-0002",
      date: "March 2, 2025",
      time: "10:30:15 AM",
      establishmentName: "Edge Ent. Corp. Build.",
      establishmentOwner: "Sandarah Sia Dizon",
      establishmentType: "Commercial",
      contactNo: "09123456789",
      status: "UNSCHEDULED",
    },
    {
      id: "3",
      applicationNo: "25-0003",
      date: "March 3, 2025",
      time: "09:45:30 AM",
      establishmentName: "Metro Development Center",
      establishmentOwner: "Juan Dela Cruz",
      establishmentType: "Residential",
      contactNo: "09876543210",
      status: "UNSCHEDULED",
    },
    {
      id: "4",
      applicationNo: "25-0004",
      date: "March 4, 2025",
      time: "01:20:45 PM",
      establishmentName: "City Plaza Building",
      establishmentOwner: "Maria Santos",
      establishmentType: "Mixed-Use",
      contactNo: "09567891234",
      status: "UNSCHEDULED",
    },
    {
      id: "5",
      applicationNo: "25-0005",
      date: "March 5, 2025",
      time: "03:15:10 PM",
      establishmentName: "Golden Tower Enterprises",
      establishmentOwner: "Pedro Reyes",
      establishmentType: "Office",
      contactNo: "09456789123",
      status: "UNSCHEDULED",
    },
    {
      id: "6",
      applicationNo: "25-0006",
      date: "March 6, 2025",
      time: "02:10:00 PM",
      establishmentName: "Green Valley Corporation",
      establishmentOwner: "Ana Lim",
      establishmentType: "Industrial",
      contactNo: "09234567891",
      status: "UNSCHEDULED",
    },
  ]);

  const [filteredApplications, setFilteredApplications] = useState<Application[]>(applications);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);

  // Update filtered applications when filters change or search query changes
  useEffect(() => {
    const activeFilter = filters.find(filter => filter.isActive);
    let filtered = applications;
    
    // Filter by status
    if (activeFilter) {
      filtered = applications.filter(app => app.status === activeFilter.value);
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(app => 
        app.applicationNo.toLowerCase().includes(query) ||
        app.establishmentName.toLowerCase().includes(query) ||
        app.establishmentOwner.toLowerCase().includes(query) ||
        app.establishmentType.toLowerCase().includes(query) ||
        app.contactNo.includes(query)
      );
    }
    
    setFilteredApplications(filtered);
  }, [applications, filters, searchQuery]);

  const handleFilterChange = (selectedFilter: FilterOption) => {
    setFilters(
      filters.map((filter) => ({
        ...filter,
        isActive: filter.id === selectedFilter.id,
      })),
    );
  };

  const handleSort = (column: string) => {
    const sorted = [...filteredApplications].sort((a, b) => {
      // @ts-ignore - dynamic property access
      if (a[column] < b[column]) return -1;
      // @ts-ignore - dynamic property access
      if (a[column] > b[column]) return 1;
      return 0;
    });
    
    setFilteredApplications(sorted);
    toast({
      title: "Sorted applications",
      description: `Applications sorted by ${column}`,
    });
  };

  const handleSchedule = (application: Application) => {
    setSelectedApplication(application);
    setModalOpen(true);
  };

  const handleViewDetails = (application: Application) => {
    toast({
      title: "View Details",
      description: `Viewing details for ${application.establishmentName}`,
    });
    // In a real application, this would open a details view
  };

  const handleConfirmSchedule = (schedule: InspectionSchedule) => {
    if (!selectedApplication) return;
    
    // Update the status of the application to FOR_INSPECTION
    const updatedApplications = applications.map((app) => {
      if (app.id === selectedApplication.id) {
        return {
          ...app,
          status: "FOR_INSPECTION" as ApplicationStatus,
        };
      }
      return app;
    });
    
    setApplications(updatedApplications);
    setModalOpen(false);
    
    toast({
      title: "Inspection Scheduled",
      description: `Inspection scheduled for ${selectedApplication.establishmentName} on ${schedule.date} at ${schedule.time}`,
    });
  };

  const handleTypeChange = (type: ApplicationType) => {
    setSelectedAppType(type);
    toast({
      title: "Application Type Changed",
      description: `Switched to ${type.replace(/_/g, " ")}`,
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <AdminHeader />
      <AdminSidebar />
      <main className="ml-[106px] p-10 max-md:p-5">
          <div className="bg-[#fe623f] p-5 rounded-[16px_16px_0_0]">
            <h1 className="text-white text-2xl font-bold max-sm:text-xl">APPLICATIONS</h1>
          </div>
          <div className="shadow-[0_4px_4px_rgba(0,0,0,0.25)] bg-white mt-5 p-10 rounded-2xl">
            <ApplicationTypeSelector 
              selectedType={selectedAppType} 
              onTypeChange={handleTypeChange} 
            />

            <FilterGroup filters={filters} onFilterChange={handleFilterChange} />

            <SearchBar value={searchQuery} onChange={setSearchQuery} />

            <ApplicationsTable 
              applications={filteredApplications} 
              onSort={handleSort} 
              onSchedule={handleSchedule}
              onViewDetails={handleViewDetails}
            />
            
            {modalOpen && selectedApplication && (
              <InspectionModal 
                application={selectedApplication}
                onClose={() => setModalOpen(false)}
                onConfirm={handleConfirmSchedule}
              />
            )}
          </div>
        </main>
    </div>
  );
};

export default AdminApplications;