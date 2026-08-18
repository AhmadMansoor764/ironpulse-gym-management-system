import { motion } from "framer-motion";
import { MdDashboard } from "react-icons/md";
import { FaUsers, FaRegMoneyBillAlt, FaRegFileAlt } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";

function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-1/2 z-50 h-[100px] w-full max-w-[600px] -translate-x-1/2 border-t border-[#34342f] bg-[#191919]/95 px-3 backdrop-blur-md">
      <div className="grid h-full grid-cols-5 items-center">
        <NavItem icon={<MdDashboard />} label="Dashboard" />

        <NavItem icon={<FaUsers />} label="Members" active />

        <NavItem icon={<FaRegMoneyBillAlt />} label="Payments" />

        <NavItem icon={<FaRegFileAlt />} label="Expenses" />

        <NavItem icon={<FiMenu />} label="Menu" />
      </div>
    </nav>
  );
}

function NavItem({ icon, label, active = false }) {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      className="flex h-full flex-col items-center justify-center gap-1"
    >
      <div
        className={`flex h-[48px] w-[78px] items-center justify-center rounded-full transition-all ${
          active ? "bg-[#d7ff00] text-[#4d5a00]" : "text-[#c9c9b8]"
        }`}
      >
        <span className="text-[25px]">{icon}</span>
      </div>

      <span
        className={`text-[12px] font-bold ${
          active ? "text-[#c8e900]" : "text-[#c0c0b0]"
        }`}
      >
        {label}
      </span>
    </motion.button>
  );
}

export default BottomNav;
