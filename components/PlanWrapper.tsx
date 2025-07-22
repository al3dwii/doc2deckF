// components/PlanWrapper.tsx
'use client';

import React from 'react';
import { useUserPlan } from '@/context/UserContext';
import { WatermarkRibbon } from '@/components/WatermarkRibbon';

interface PlanWrapperProps {
  children: React.ReactNode;
}

export default function PlanWrapper({ children }: PlanWrapperProps) {
  const plan = useUserPlan();
  return (
    <>
      {plan === 'Free' && <WatermarkRibbon />}
      {children}
    </>
  );
}
