import React from 'react';

import ShipmentContent from "../components/ShipmentContent"
import { ShipmentProvider } from "../context/ShipmentContext"
import { UIProvider } from "../context/UIContext"

export default function ShipmentDashboard() {
  return (
    <ShipmentProvider>
      <UIProvider>
          <ShipmentContent />
      </UIProvider>
    </ShipmentProvider>
  )
}

