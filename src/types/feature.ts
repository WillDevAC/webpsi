import { SvgIconProps } from "@mui/material/SvgIcon";

import React from "react";

export interface FeatureItemProps {
  icon: React.ComponentType<SvgIconProps>;
  title: string;
  description: string;
  iconColor: string;
}
