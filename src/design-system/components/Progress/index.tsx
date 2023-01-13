import React from 'react'

const Progress: React.FC<{
    progress?: number;
}> = ({progress = 0}) => {
  return (
    <div className="w-full max-w-[480px] h-[10px] bg-[#E8F2FF] rounded-[10px] ">
        <div className=" bg-primary h-full rounded-[10px]"  style={{
            width: Math.min(progress * 100, 100) + '%',
        }}/>
    </div>
  )
}

export default Progress