import { RxDashboard } from "react-icons/rx";
import { LuUserRoundSearch } from "react-icons/lu";
import { LuSquareActivity } from "react-icons/lu";
import { TbMoneybag } from "react-icons/tb";
import { PiGearSix } from "react-icons/pi";

export const marketingRoutes = [
  {
    value: "/marketing/dashboard",
    title: "Dashboard",
    expandAble: false,

    icon: RxDashboard,
  },

  {
    value: "",
    title: "Leads",
    expandAble: true,
    subRoutes: [
      { value: "/marketing/leads/add", label: "Add New Lead" },
      { value: "/marketing/leads/fresh", label: "Fresh Leads" },
      { value: "/marketing/leads/returned", label: "Returned Leads" },
      { value: "/marketing/leads/shuffled", label: "Shuffled Leads" },
     
    ],
    icon: LuUserRoundSearch,
  },

  {
    value: "/marketing/logs",
    title: "Activity Logs",
    expandAble: false,

    icon: LuSquareActivity,
  },

  {
    value: "/marketing/salary-record",
    title: "Salary Record",
    expandAble: false,

    icon: TbMoneybag,
  },

  {
    value: "/marketing/settings",
    title: "Settings",
    expandAble: false,

    icon: PiGearSix,
  },
];

export const sSalesRoutes = [
  {
    value: "/sales/dashboard",
    title: "Dashboard",
    expandAble: false,

    icon: RxDashboard,
  },

  {
    value: "",
    title: "Leads",
    expandAble: true,
    subRoutes: [
      { value: "/sales/leads/assigned", label: "Assigned Leads" },
      { value: "/sales/leads/shuffled", label: "Shuffled Leads" },
    
     
    ],
    icon: LuUserRoundSearch,
  },

  {
    value: "/sales/logs",
    title: "Sales Logs",
    expandAble: false,

    icon: LuSquareActivity,
  },

  {
    value: "/sales/salary-record",
    title: "Salary Record",
    expandAble: false,

    icon: TbMoneybag,
  },

  {
    value: "/sales/settings",
    title: "Settings",
    expandAble: false,

    icon: PiGearSix,
  },
];


