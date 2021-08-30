import {
  IoNotificationsSharp,
  IoPerson,
  IoSettingsSharp,
} from "react-icons/io5";
import { IoMdHelpCircle } from "react-icons/io";
import {
  FaArrowDown,
  FaArrowUp,
  FaBalanceScaleRight,
  FaMoneyCheckAlt,
} from "react-icons/fa";

export const listMenu = [
  {
    name: "BALANCE",
    icon: FaBalanceScaleRight,
    href: "/balance",
  },
  {
    name: "EXPENSES",
    icon: FaArrowDown,
    href: "/expenses",
  },
  {
    name: "CHECKS",
    icon: FaMoneyCheckAlt,
    href: "/checks",
  },
];

export const listMenuAdmin = [
  {
    name: "Checks Control",
    icon: FaMoneyCheckAlt,
    href: "/check-control",
  },
];

export const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const appRoutes = [
  {
    path: "/signup",
  },
  {
    path: "/signin",
  },
  {
    path: "/balance",
    onlyLogged: true,
    onlyCustomer: true,

  },
  {
    path: "/check-deposit",
    onlyLogged: true,
    onlyCustomer: true,

  },
  {
    path: "/checks",
    onlyLogged: true,
    onlyCustomer: true,

  },
  {
    path: "/expenses",
    onlyLogged: true,
    onlyCustomer: true,

  },
  {
    path: "/purchase",
    onlyLogged: true,
    onlyCustomer: true,
  },
  {
    path: "/check-control",
    onlyAdmin: true,
    onlyLogged: true,
  },
];
