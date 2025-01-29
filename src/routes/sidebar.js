import { RxDashboard } from "react-icons/rx";
import { LuUserRoundSearch } from "react-icons/lu";
import { LuSquareActivity } from "react-icons/lu";
import { TbMoneybag } from "react-icons/tb";
import { PiGearSix } from "react-icons/pi";
import { LuUserRoundCheck } from "react-icons/lu";
import { RiUserStarLine } from "react-icons/ri";
import { PiAirplaneTilt } from "react-icons/pi";
import { ImInsertTemplate } from "react-icons/im";
import { MdHistory } from "react-icons/md";
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

export const sOperationsRoutes = [
  {
    value: "/operations/dashboard",
    title: "Dashboard",
    expandAble: false,

    icon: RxDashboard,
  },

  {
    value: "/operations/closed-leads",
    title: "Closed Leads",
    expandAble: false,
    icon: LuUserRoundCheck,
  },

  {
    value: "/operations/clients",
    title: "Clients",
    expandAble: false,

    icon: RiUserStarLine,
  },

  {
    value: "",
    title: "Programs",
    expandAble: true,
    subRoutes: [
      { value: "/operations/programs", label: "All Programs" },
      { value: "/operations/programs/add", label: "Add New Program" },
    ],
    icon: PiAirplaneTilt,
  },

  {
    value: "",
    title: "Contract Templates",
    expandAble: true,
    subRoutes: [
      { value: "/operations/templates", label: "All Templates" },
      { value: "/operations/templates/add", label: "Add New Template" },
    ],
    icon: ImInsertTemplate,
  },
  {
    value: "/operations/salary-record",
    title: "Salary Record",
    expandAble: false,
    icon: TbMoneybag,
  },

  {
    value: "/operations/logs",
    title: "Activity Logs",
    expandAble: false,

    icon: MdHistory,
  },

  {
    value: "/operations/settings",
    title: "Settings",
    expandAble: false,

    icon: PiGearSix,
  },
];
