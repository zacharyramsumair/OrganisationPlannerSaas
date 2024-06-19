"use client"
import React from 'react'
import {Calendar} from '@/components/ui/calendar';

type Props = {}

const page = (props: Props) => {

    // const scheduledEvents = [
    //     { title: "General Meeting", date: "2024-06-15" },
    //     { title: "Team Lunch", date: "2024-06-18" },
    //     { title: "Project Presentation", date: "2024-06-23" },
    //     { title: "Training Session", date: "2024-06-28" },
    //   ];

    //   const onDateClick = (date) =>{
    //     console.log(`we have X event on ${date}`)
    //   }
  return (
    <div><Calendar/></div>
  )
}

export default page