import React from "react";
import { Card, Typography } from "@mui/material";
import { AccessAlarmOutlined } from "@mui/icons-material";

const ExposedComponent = () => {
  return (
    <Card>
      <Typography>Exposed Component 1</Typography>
      <AccessAlarmOutlined></AccessAlarmOutlined>
      <AccessAlarmOutlined></AccessAlarmOutlined>
      <AccessAlarmOutlined></AccessAlarmOutlined>
      <AccessAlarmOutlined></AccessAlarmOutlined>
      <AccessAlarmOutlined></AccessAlarmOutlined>
    </Card>
  );
};

export default ExposedComponent;
