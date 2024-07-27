"use client"

import React from 'react'
import { LinkedInEmbed } from "react-social-media-embed";


export default function PostLinkdin() {
  return (
    <div className='flex justify-center items-center gap-3 p-5'>
    <LinkedInEmbed 
    url="https://www.linkedin.com/embed/feed/update/urn:li:activity:7210159903858933760/"
    postUrl="https://www.linkedin.com/posts/nick-kengne-b7752924b_techstack-activity-7210159903858933760-LaR-?utm_source=share&utm_medium=member_desktop"
    width={600}
    height={590} 
    
  />
    <LinkedInEmbed
      url="https://www.linkedin.com/embed/feed/update/urn:li:activity:7209478201549406209/"
      postUrl="https://www.linkedin.com/posts/nick-kengne-b7752924b_250daystobecomecraft-proud-boosting-activity-7209478201549406209-j_A8?utm_source=share&utm_medium=member_desktop"
      width={550}
      height={570}
    />
  </div>
  )
}
