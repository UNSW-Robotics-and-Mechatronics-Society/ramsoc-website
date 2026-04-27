"use client";

import ProfileCard from "./ProfileCard";

const LINKEDIN_URL = "https://www.linkedin.com/in/victor-lim-0bab86277";

export default function VictorProfileCard() {
  return (
    <ProfileCard
      name="Victor Lim"
      title="IT Subcommittee"
      handle="victor-lim"
      status="RAMSoc"
      contactText="LinkedIn"
      avatarUrl="/team/victor/Profile_pic.jpg"
      showUserInfo
      showMiniAvatar={false}
      enableTilt
      enableMobileTilt
      behindGlowColor="rgba(41, 171, 226, 0.67)"
      behindGlowEnabled
      innerGradient="linear-gradient(145deg, rgba(13, 38, 49, 0.9) 0%, rgba(41, 171, 226, 0.35) 100%)"
      onContactClick={() => {
        window.open(LINKEDIN_URL, "_blank", "noopener,noreferrer");
      }}
    />
  );
}
