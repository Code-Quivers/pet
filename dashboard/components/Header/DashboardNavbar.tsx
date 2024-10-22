"use client";

import { Dropdown, IconButton, Input } from "rsuite";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";

const DashboardNavbar = () => {
  return (
    <nav className="flex justify-between items-center py-5">
      <div>
        <Breadcrumb />
      </div>
      <div className="flex items-center gap-5">
        <div>
          <Input placeholder="Search Menu" />
        </div>

        <div className="flex items-center gap-3">
          <div>
            <Dropdown renderToggle={renderIconButton} placement="bottomEnd">
              <Dropdown.Item>New File with Current Profile</Dropdown.Item>
              <Dropdown.Item>Download As...</Dropdown.Item>
              <Dropdown.Item>Export PDF</Dropdown.Item>
            </Dropdown>
          </div>
          <div>
            <Dropdown renderToggle={renderIconButton} placement="bottomEnd">
              <Dropdown.Item>New File with Current Profile</Dropdown.Item>
              <Dropdown.Item>Download As...</Dropdown.Item>
              <Dropdown.Item>Export PDF</Dropdown.Item>
            </Dropdown>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
const renderIconButton = (props: any, ref: any) => {
  return (
    <IconButton {...props} ref={ref} circle color="blue" appearance="primary" />
  );
};
