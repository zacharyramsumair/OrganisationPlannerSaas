import TimePicker from '@/components/Timepicker/TimePicker'
import React from 'react'

type Props = {}

const page = (props: Props) => {
    let occupied = [ {startTime : "01:45", endTime: "04:00"}, {startTime : "11:45", endTime: "14:00"}]
  return (
    <div>
        <TimePicker occupiedTimes={occupied}/>
    </div>
  )
}

export default page