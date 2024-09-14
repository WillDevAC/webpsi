"use client";
import WebsiteBuilder from "@/components/website-builder";
import { useParams } from "next/navigation";
const BuilderPge = () => {
  const params = useParams();
  return <WebsiteBuilder projectId={params?.subdomain as string ?? ""} />;
};

export default BuilderPge;
