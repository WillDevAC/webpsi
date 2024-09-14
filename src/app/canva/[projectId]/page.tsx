"use client";

import { CanvaBuilderCreator } from "@/components/logo-builder";
import { useParams } from "next/navigation";

export default function CanvaBuilderPage() {
  const params = useParams();
  return (
    <CanvaBuilderCreator idProject={(params?.projectId as string) ?? ""} type="user" />
  );
}
